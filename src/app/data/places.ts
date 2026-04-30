// Fuente única de los lugares visitados.
// El contenido extenso de cada ciudad vive en src/app/content/places/[country-slug]/[city-slug].md
// y se carga vía PlaceContentService cuando se navega a /mapa/[país]/[ciudad].

export interface CountryMeta {
  /** Código ISO 3166-1 alpha-3. */
  code:    string;
  /** Nombre en español para UI. */
  name:    string;
  /** Slug URL-safe usado en rutas. */
  slug:    string;
  /** Emoji bandera. */
  flag:    string;
}

export interface Place {
  /** Código ISO del país. */
  countryCode: string;
  /** Nombre de la ciudad/lugar para UI. */
  city:        string;
  /** Slug URL-safe — usado en /mapa/[country-slug]/[slug] y nombre del .md. */
  slug:        string;
  /** ID del video de YouTube principal. */
  youtubeId:   string;
  /** Meses recomendados (1=Ene, 12=Dic). Vacío hasta que Oriana lo complete. */
  bestMonths:  number[];
  /** Coordenadas [lat, lng] de la ciudad — opcional, sólo si se quieren mostrar markers de ciudad. */
  coords?:     [number, number];
}

// ─── Países visitados ────────────────────────────────────────────────────────

export const COUNTRIES: Record<string, CountryMeta> = {
  ARG: { code: 'ARG', name: 'Argentina',            slug: 'argentina',            flag: '🇦🇷' },
  COL: { code: 'COL', name: 'Colombia',             slug: 'colombia',             flag: '🇨🇴' },
  PAN: { code: 'PAN', name: 'Panamá',               slug: 'panama',               flag: '🇵🇦' },
  DOM: { code: 'DOM', name: 'República Dominicana', slug: 'republica-dominicana', flag: '🇩🇴' },
  MEX: { code: 'MEX', name: 'México',               slug: 'mexico',               flag: '🇲🇽' },
  GTM: { code: 'GTM', name: 'Guatemala',            slug: 'guatemala',            flag: '🇬🇹' },
  EGY: { code: 'EGY', name: 'Egipto',               slug: 'egipto',               flag: '🇪🇬' },
  NLD: { code: 'NLD', name: 'Holanda',              slug: 'holanda',              flag: '🇳🇱' },
  DEU: { code: 'DEU', name: 'Alemania',             slug: 'alemania',             flag: '🇩🇪' },
  ESP: { code: 'ESP', name: 'España',               slug: 'espana',               flag: '🇪🇸' },
  FRA: { code: 'FRA', name: 'Francia',              slug: 'francia',              flag: '🇫🇷' },
  ITA: { code: 'ITA', name: 'Italia',               slug: 'italia',               flag: '🇮🇹' },
};

// ─── Lugares visitados ───────────────────────────────────────────────────────
// 42 ciudades · 12 países · todos con video oficial de YouTube.
// Los videoId se extrajeron del canal @Exploriando vía YouTube Data API
// (ver scripts/discover-youtube-videos.mjs y scripts/pick-best-videos.mjs).

// Coords [lat, lng] de cada ciudad — usadas para posicionar markers en el SVG.
// Para regiones (Misiones=Posadas, Chaco=Resistencia, Petén=Tikal) se usa
// la capital o centro geográfico. Tenerife está en Canarias (28.27,-16.62),
// fuera de Europa continental — por eso el campo está poblado y no es un detalle.
export const PLACES: Place[] = [
  // ── Argentina ──────────────────────────────────────────────────────────────
  { countryCode: 'ARG', city: 'Mendoza',           slug: 'mendoza',           youtubeId: 'vL4npsl8GtY', bestMonths: [], coords: [-32.89, -68.85] },
  { countryCode: 'ARG', city: 'Bariloche',         slug: 'bariloche',         youtubeId: 'PJ5k1xOUzy4', bestMonths: [], coords: [-41.13, -71.31] },
  { countryCode: 'ARG', city: 'Misiones',          slug: 'misiones',          youtubeId: '_4GMjCO6e9w', bestMonths: [], coords: [-27.37, -55.90] },
  { countryCode: 'ARG', city: 'Chaco',             slug: 'chaco',             youtubeId: 'Hpvy33Z-aRk', bestMonths: [], coords: [-27.45, -58.99] },
  { countryCode: 'ARG', city: 'Buenos Aires',      slug: 'buenos-aires',      youtubeId: 'yZWGwctXnos', bestMonths: [], coords: [-34.61, -58.39] },
  { countryCode: 'ARG', city: 'Córdoba',           slug: 'cordoba',           youtubeId: 'x9kLu9uSLDo', bestMonths: [], coords: [-31.42, -64.18] },
  { countryCode: 'ARG', city: 'Jujuy',             slug: 'jujuy',             youtubeId: '6UfwSMYAK3c', bestMonths: [], coords: [-24.18, -65.30] },

  // ── Colombia ───────────────────────────────────────────────────────────────
  { countryCode: 'COL', city: 'Medellín',          slug: 'medellin',          youtubeId: 'MniJpJ5ULLI', bestMonths: [], coords: [  6.25, -75.57] },
  { countryCode: 'COL', city: 'Bogotá',            slug: 'bogota',            youtubeId: 'h9AMh81NdcA', bestMonths: [], coords: [  4.71, -74.07] },
  { countryCode: 'COL', city: 'Santa Marta',       slug: 'santa-marta',       youtubeId: '-Q846cxXLgU', bestMonths: [], coords: [ 11.24, -74.20] },

  // ── Panamá ─────────────────────────────────────────────────────────────────
  { countryCode: 'PAN', city: 'Bocas del Toro',    slug: 'bocas-del-toro',    youtubeId: 'X0IHUrvtEsk', bestMonths: [], coords: [  9.34, -82.24] },
  { countryCode: 'PAN', city: 'San Blas',          slug: 'san-blas',          youtubeId: 'AzQdtKdC6Bo', bestMonths: [], coords: [  9.55, -78.92] },
  { countryCode: 'PAN', city: 'Valle de Antón',    slug: 'valle-de-anton',    youtubeId: 'HWC2Wv6z8hs', bestMonths: [], coords: [  8.60, -80.13] },
  { countryCode: 'PAN', city: 'Ciudad de Panamá',  slug: 'ciudad-de-panama',  youtubeId: 'XXFzqFa2lrY', bestMonths: [], coords: [  8.98, -79.52] },

  // ── República Dominicana ───────────────────────────────────────────────────
  { countryCode: 'DOM', city: 'Samaná',            slug: 'samana',            youtubeId: 'WklCrfAG9bY', bestMonths: [], coords: [ 19.20, -69.34] },
  { countryCode: 'DOM', city: 'Santo Domingo',     slug: 'santo-domingo',     youtubeId: 'z_vlOl6XGKc', bestMonths: [], coords: [ 18.47, -69.93] },
  { countryCode: 'DOM', city: 'Puerto Plata',      slug: 'puerto-plata',      youtubeId: 'S8bgYy2FGV0', bestMonths: [], coords: [ 19.79, -70.69] },
  { countryCode: 'DOM', city: 'Cabarete',          slug: 'cabarete',          youtubeId: 'DCUy-aBP7ao', bestMonths: [], coords: [ 19.76, -70.42] },
  { countryCode: 'DOM', city: 'Isla Saona',        slug: 'isla-saona',        youtubeId: 'LQiwMWM9KTE', bestMonths: [], coords: [ 18.13, -68.74] },

  // ── México ─────────────────────────────────────────────────────────────────
  { countryCode: 'MEX', city: 'Ciudad de México',  slug: 'ciudad-de-mexico',  youtubeId: '7HbvEvKPJ3U', bestMonths: [], coords: [ 19.43, -99.13] },
  { countryCode: 'MEX', city: 'Puebla',            slug: 'puebla',            youtubeId: '_J2sE9PdFS4', bestMonths: [], coords: [ 19.04, -98.20] },
  { countryCode: 'MEX', city: 'Playa del Carmen',  slug: 'playa-del-carmen',  youtubeId: 'Pt5188jZ18M', bestMonths: [], coords: [ 20.63, -87.07] },
  { countryCode: 'MEX', city: 'Chichén Itzá',      slug: 'chichen-itza',      youtubeId: 'BtcDTmy_ShE', bestMonths: [], coords: [ 20.68, -88.57] },
  { countryCode: 'MEX', city: 'Cozumel',           slug: 'cozumel',           youtubeId: 'yFD77EMO224', bestMonths: [], coords: [ 20.42, -86.92] },
  { countryCode: 'MEX', city: 'Isla Mujeres',      slug: 'isla-mujeres',      youtubeId: 'edowq1OXOUs', bestMonths: [], coords: [ 21.23, -86.73] },
  { countryCode: 'MEX', city: 'Río Lagartos',      slug: 'rio-lagartos',      youtubeId: '722ozoRVqtE', bestMonths: [], coords: [ 21.60, -88.16] },

  // ── Guatemala ──────────────────────────────────────────────────────────────
  { countryCode: 'GTM', city: 'Panajachel',        slug: 'panajachel',        youtubeId: 'vSWXcusPukU', bestMonths: [], coords: [ 14.74, -91.16] },
  { countryCode: 'GTM', city: 'Petén',             slug: 'peten',             youtubeId: 'Lz1S_ZyYQcA', bestMonths: [], coords: [ 16.99, -89.62] },
  { countryCode: 'GTM', city: 'Antigua Guatemala', slug: 'antigua-guatemala', youtubeId: '-o0I54tdQwg', bestMonths: [], coords: [ 14.56, -90.73] },
  { countryCode: 'GTM', city: 'Semuc Champey',     slug: 'semuc-champey',     youtubeId: 'MJbDuzaa3Fw', bestMonths: [], coords: [ 15.53, -89.95] },
  { countryCode: 'GTM', city: 'Puerto San José',   slug: 'puerto-san-jose',   youtubeId: '9YldUzMbSrM', bestMonths: [], coords: [ 13.92, -90.83] },

  // ── Egipto ─────────────────────────────────────────────────────────────────
  { countryCode: 'EGY', city: 'El Cairo',          slug: 'el-cairo',          youtubeId: 'ND9O8DKH0JU', bestMonths: [], coords: [ 30.04,  31.24] },
  { countryCode: 'EGY', city: 'Luxor',             slug: 'luxor',             youtubeId: 'uvuvDJdUGSE', bestMonths: [], coords: [ 25.69,  32.64] },
  { countryCode: 'EGY', city: 'Sharm El-Sheikh',   slug: 'sharm-el-sheikh',   youtubeId: 'MgKrXa87XIA', bestMonths: [], coords: [ 27.91,  34.33] },

  // ── Holanda ────────────────────────────────────────────────────────────────
  { countryCode: 'NLD', city: 'Ámsterdam',         slug: 'amsterdam',         youtubeId: 'z8ilLUICSEw', bestMonths: [], coords: [ 52.37,   4.90] },

  // ── Alemania ───────────────────────────────────────────────────────────────
  { countryCode: 'DEU', city: 'Koblenz',           slug: 'koblenz',           youtubeId: 'l5ULAJXg3IE', bestMonths: [], coords: [ 50.36,   7.59] },
  { countryCode: 'DEU', city: 'Köln',              slug: 'koln',              youtubeId: 'WjWiZFc36Q0', bestMonths: [], coords: [ 50.94,   6.96] },
  { countryCode: 'DEU', city: 'Múnich',            slug: 'munich',            youtubeId: 'Zl4mWyUnoCg', bestMonths: [], coords: [ 48.14,  11.58] },

  // ── España ─────────────────────────────────────────────────────────────────
  { countryCode: 'ESP', city: 'Barcelona',         slug: 'barcelona',         youtubeId: 'wrsEDr_QU4Q', bestMonths: [], coords: [ 41.39,   2.17] },
  { countryCode: 'ESP', city: 'Tenerife',          slug: 'tenerife',          youtubeId: 'lRc1Fdf6sXE', bestMonths: [], coords: [ 28.27, -16.62] },

  // ── Francia ────────────────────────────────────────────────────────────────
  { countryCode: 'FRA', city: 'París',             slug: 'paris',             youtubeId: '7D2a5LuqWEo', bestMonths: [], coords: [ 48.85,   2.35] },

  // ── Italia ─────────────────────────────────────────────────────────────────
  { countryCode: 'ITA', city: 'Roma',              slug: 'roma',              youtubeId: '0tCgXo86488', bestMonths: [], coords: [ 41.90,  12.50] },
];

/** Devuelve un map `{ARG: 7, COL: 3, ...}` con la cantidad de ciudades por país visitado. */
export function cityCountByCountry(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const p of PLACES) counts[p.countryCode] = (counts[p.countryCode] ?? 0) + 1;
  return counts;
}

/** Helper: encuentra un lugar por slug de país + slug de ciudad. */
export function findPlace(countrySlug: string, citySlug: string): Place | undefined {
  const country = Object.values(COUNTRIES).find(c => c.slug === countrySlug);
  if (!country) return undefined;
  return PLACES.find(p => p.countryCode === country.code && p.slug === citySlug);
}

/** Helper: devuelve los lugares de un país. */
export function placesOfCountry(countryCode: string): Place[] {
  return PLACES.filter(p => p.countryCode === countryCode);
}

/** Helper: devuelve la lista única de países visitados. */
export function visitedCountries(): CountryMeta[] {
  const codes = new Set(PLACES.map(p => p.countryCode));
  return [...codes].map(c => COUNTRIES[c]);
}
