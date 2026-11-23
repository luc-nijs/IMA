// Prefixes a site path with the base path the site is published under
// (e.g. /IMA on luc-nijs.github.io/IMA, nothing once it has its own domain).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path) => base + path;
