// src/data/projects.ts
export interface Project {
  title: string;
  tagline: string;
  tech: string[];
  github: string;
  url?: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'dterm',
    tagline: 'SSH session manager — bookmarks, split panes, SFTP, tunnels',
    tech: ['Go', 'Bubble Tea', 'x/crypto/ssh', 'pkg/sftp'],
    github: 'https://github.com/d-clz/dterm',
  },
  {
    title: 'portfolio',
    tagline: 'Interactive terminal/zsh-styled personal site',
    tech: ['Astro'],
    github: 'https://github.com/d-clz/portfolio',
    url: 'https://d-clz.github.io/portfolio/',
  },
  {
    title: 'd-clz.github.io',
    tagline: 'This blog — static semantic search over posts, Nord palette',
    tech: ['Astro', 'transformers.js'],
    github: 'https://github.com/d-clz/d-clz.github.io',
    url: 'https://d-clz.github.io/',
  },
];
