import './proxy-setup.mjs';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { pipeline } from '@xenova/transformers';
import { fetchExternalSources } from './sources.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const postsDir = path.join(root, 'src/content/posts');
const outFile = path.join(root, 'public/search-index.json');

const MODEL = 'Xenova/all-MiniLM-L6-v2';

function stripMarkdown(md) {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function loadLocalPosts() {
  const files = (await readdir(postsDir)).filter((f) => f.endsWith('.md'));
  const items = [];
  for (const file of files) {
    const raw = await readFile(path.join(postsDir, file), 'utf-8');
    const { data, content } = matter(raw);
    const slug = file.replace(/\.md$/, '');
    const text = stripMarkdown(content);
    items.push({
      id: `d-clz.github.io/${slug}`,
      title: data.title,
      url: `/posts/${slug}/`,
      date: new Date(data.date).toISOString(),
      content: text,
      tags: data.tags ?? [],
      source: 'd-clz.github.io',
    });
  }
  return items;
}

function excerpt(text, len = 180) {
  return text.length > len ? text.slice(0, len).trim() + '…' : text;
}

async function writeEmptyIndex(reason) {
  console.warn(`[search-index] ${reason} — writing an empty index so the site build still succeeds`);
  await writeFile(
    outFile,
    JSON.stringify({ model: MODEL, dim: 0, generatedAt: new Date().toISOString(), items: [] })
  );
}

async function main() {
  const local = await loadLocalPosts();
  const external = await fetchExternalSources();
  const docs = [...local, ...external];

  console.log(`[search-index] embedding ${docs.length} document(s) with ${MODEL}`);

  let embed;
  try {
    embed = await pipeline('feature-extraction', MODEL);
  } catch (err) {
    // The search widget already degrades gracefully when this file is
    // missing or empty, so a model-fetch failure (e.g. a network policy
    // blocking Hugging Face) should not take the whole site build down.
    await writeEmptyIndex(`failed to load embedding model: ${err.message}`);
    return;
  }

  const items = [];
  for (const doc of docs) {
    const text = doc.content ?? '';
    const input = `${doc.title}\n\n${stripMarkdown(text)}`;
    const output = await embed(input, { pooling: 'mean', normalize: true });
    items.push({
      id: doc.id,
      title: doc.title,
      url: doc.url,
      date: doc.date,
      source: doc.source,
      tags: doc.tags ?? [],
      excerpt: excerpt(stripMarkdown(text)),
      embedding: Array.from(output.data),
    });
  }

  const index = {
    model: MODEL,
    dim: items[0]?.embedding.length ?? 0,
    generatedAt: new Date().toISOString(),
    items,
  };

  await writeFile(outFile, JSON.stringify(index));
  console.log(`[search-index] wrote ${items.length} item(s) to public/search-index.json`);
}

main();
