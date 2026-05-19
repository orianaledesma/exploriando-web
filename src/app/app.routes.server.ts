import { RenderMode, ServerRoute } from '@angular/ssr';
import { COUNTRIES, PLACES } from './data/places';
import { BLOG_POSTS } from './data/blog';

/** ISO country code → URL slug, from the single source of truth. */
const slugByCode = new Map(
  Object.values(COUNTRIES).map((c) => [c.code, c.slug]),
);

/** Country slugs that actually have visited places. */
const visitedCountrySlugs = [
  ...new Set(
    PLACES.map((p) => slugByCode.get(p.countryCode)).filter(
      (s): s is string => !!s,
    ),
  ),
];

export const serverRoutes: ServerRoute[] = [
  {
    path: 'mapa/:country',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      visitedCountrySlugs.map((country) => ({ country })),
  },
  {
    path: 'mapa/:country/:city',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      PLACES.map((p) => ({
        country: slugByCode.get(p.countryCode) ?? '',
        city: p.slug,
      })).filter((r) => r.country !== ''),
  },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      BLOG_POSTS.map((p) => ({ slug: p.slug })),
  },
  // Everything else (/, /marcas, /guia, /mapa, /blog) is static-prerendered.
  { path: '**', renderMode: RenderMode.Prerender },
];
