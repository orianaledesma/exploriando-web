/**
 * Affiliate link plumbing — consistent UTM tagging across all partners.
 *
 * Oriana defines WHICH links (in afiliados.copy.ts `ctaUrl`); this just
 * guarantees every outbound affiliate URL carries the same UTM scheme so
 * conversions are attributable in GA4 / partner dashboards.
 *
 * Pure + SSR-safe (string only). No-ops on empty / placeholder / anchor URLs.
 */

const UTM = {
  utm_source: 'exploriando',
  utm_medium: 'affiliate',
  utm_campaign: 'site',
} as const;

/**
 * Appends the standard UTM params to an affiliate URL.
 * @param url     The partner URL from copy (may already have a query string).
 * @param partner Partner id (card.id) — added as utm_content for granularity.
 * @returns The URL with UTM params, or the original url unchanged if it's
 *          empty, an anchor, or not http(s).
 */
export function withUtm(url: string, partner: string): string {
  if (!url || url.startsWith('#') || !/^https?:\/\//i.test(url)) return url;
  const sep = url.includes('?') ? '&' : '?';
  const params = new URLSearchParams({ ...UTM, utm_content: partner });
  return `${url}${sep}${params.toString()}`;
}
