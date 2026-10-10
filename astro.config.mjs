import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://d-clz.github.io',
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: 'nord',
    },
  },
});
