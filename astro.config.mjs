import { defineConfig } from 'astro/config';

// SITE_BASE is the path the site is published under: /IMA while it lives at
// luc-nijs.github.io/IMA (set in .github/workflows/deploy.yml). Remove it there
// once the site has its own domain, and add `site: 'https://www.<domain>'` here.
export default defineConfig({
  base: process.env.SITE_BASE || '/',
  redirects: {
    '/projects': (process.env.SITE_BASE || '') + '/research#projects',
  },
});
