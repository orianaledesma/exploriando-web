/**
 * Post-build: scans the prerendered output for every index.html and writes
 * sitemap.xml + robots.txt at the site root.
 *
 * Decoupled from places.ts on purpose — whatever got prerendered is exactly
 * what we expose to crawlers (4 static + 12 countries + 42 cities = 58).
 *
 * Usage: node scripts/generate-sitemap.mjs   (runs after ng build)
 */
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const ORIGIN = 'https://exploriando.page';
const DIST = 'dist/exploriando/browser';

function findRoutes(dir, base = dir) {
  const routes = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      routes.push(...findRoutes(full, base));
    } else if (entry === 'index.html') {
      const rel = relative(base, dir).replace(/\\/g, '/');
      routes.push(rel === '' ? '/' : `/${rel}`);
    }
  }
  return routes;
}

const routes = [...new Set(findRoutes(DIST))].sort();

const urls = routes
  .map((r) => {
    const loc = `${ORIGIN}${r === '/' ? '/' : r}`;
    const priority = r === '/' ? '1.0' : r.split('/').length > 2 ? '0.7' : '0.8';
    return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${ORIGIN}/sitemap.xml
`;

writeFileSync(join(DIST, 'sitemap.xml'), sitemap);
writeFileSync(join(DIST, 'robots.txt'), robots);
console.log(`✓ sitemap.xml (${routes.length} URLs) + robots.txt written to ${DIST}`);
