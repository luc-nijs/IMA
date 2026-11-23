import { defineConfig } from 'astro/config';

// Add `site: 'https://www.<domain>'` once the domain is known.
export default defineConfig({
  redirects: {
    '/projects': '/research#projects',
  },
});
