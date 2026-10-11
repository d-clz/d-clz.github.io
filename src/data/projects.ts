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
];
