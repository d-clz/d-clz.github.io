// Pluggable external content sources for the search index build.
//
// Contract for an external source's published artifact (see README for the
// full write-up): a JSON array of items shaped like
//   { id: string, title: string, url: string, date: string (ISO), content: string (plain text or markdown), tags?: string[] }
//
// IMPORTANT: external sources must ship normalized *content*, not
// pre-computed embeddings. Embeddings are only comparable when produced by
// the same model/version, so this build generates all embeddings itself
// over the merged corpus (see build-search-index.mjs) to keep the vector
// space consistent across sources.
//
// To wire up a new source, add an entry below with a `fetch()` that returns
// that array, then list it in `sources`. Until a source's artifact exists,
// leave it commented out — `fetchExternalSources()` silently skips entries
// whose fetch throws, so a not-yet-ready source never breaks the build.

const sources = [
  // {
  //   name: 'cenergy-website',
  //   async fetch() {
  //     const res = await fetch(process.env.CENERGY_INDEX_URL, {
  //       headers: { Authorization: `Bearer ${process.env.CENERGY_INDEX_TOKEN}` },
  //     });
  //     if (!res.ok) throw new Error(`cenergy-website fetch failed: ${res.status}`);
  //     return res.json();
  //   },
  // },
];

export async function fetchExternalSources() {
  const items = [];
  for (const source of sources) {
    try {
      const data = await source.fetch();
      for (const item of data) items.push({ ...item, source: source.name });
    } catch (err) {
      console.warn(`[search-index] skipping source "${source.name}": ${err.message}`);
    }
  }
  return items;
}
