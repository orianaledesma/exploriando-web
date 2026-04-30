// Lista de ciudades visitadas — fuente única para los scripts de YouTube.
// Cada ciudad tiene `aliases`: variantes de nombre para que el matcher reconozca
// títulos en distintos idiomas/formatos (ej: "Köln" también matchea "Cologne").
//
// `slug` se usa para nombrar archivos: src/app/content/places/[country-slug]/[slug].md

export const COUNTRIES = {
  ARG: { name: 'Argentina',          slug: 'argentina',         flag: '🇦🇷' },
  COL: { name: 'Colombia',           slug: 'colombia',          flag: '🇨🇴' },
  PAN: { name: 'Panamá',             slug: 'panama',            flag: '🇵🇦' },
  DOM: { name: 'República Dominicana', slug: 'republica-dominicana', flag: '🇩🇴' },
  MEX: { name: 'México',             slug: 'mexico',            flag: '🇲🇽' },
  GTM: { name: 'Guatemala',          slug: 'guatemala',         flag: '🇬🇹' },
  EGY: { name: 'Egipto',             slug: 'egipto',            flag: '🇪🇬' },
  NLD: { name: 'Holanda',            slug: 'holanda',           flag: '🇳🇱' },
  DEU: { name: 'Alemania',           slug: 'alemania',          flag: '🇩🇪' },
  ESP: { name: 'España',             slug: 'espana',            flag: '🇪🇸' },
  FRA: { name: 'Francia',            slug: 'francia',           flag: '🇫🇷' },
  ITA: { name: 'Italia',             slug: 'italia',            flag: '🇮🇹' },
};

export const CITIES = [
  // ── Argentina ──────────────────────────────────────────────────────────────
  { country: 'ARG', city: 'Mendoza',       slug: 'mendoza',       aliases: ['mendoza'] },
  { country: 'ARG', city: 'Bariloche',     slug: 'bariloche',     aliases: ['bariloche', 'san carlos de bariloche'] },
  { country: 'ARG', city: 'Misiones',      slug: 'misiones',      aliases: ['misiones', 'iguazu', 'cataratas del iguazu', 'posadas'] },
  { country: 'ARG', city: 'Chaco',         slug: 'chaco',         aliases: ['chaco', 'resistencia'] },
  { country: 'ARG', city: 'Buenos Aires',  slug: 'buenos-aires',  aliases: ['buenos aires', 'baires', 'capital federal'] },
  { country: 'ARG', city: 'Córdoba',       slug: 'cordoba',       aliases: ['cordoba'] },
  { country: 'ARG', city: 'Jujuy',         slug: 'jujuy',         aliases: ['jujuy', 'purmamarca', 'tilcara', 'humahuaca'] },

  // ── Colombia ───────────────────────────────────────────────────────────────
  { country: 'COL', city: 'Medellín',      slug: 'medellin',      aliases: ['medellin'] },
  { country: 'COL', city: 'Bogotá',        slug: 'bogota',        aliases: ['bogota'] },
  { country: 'COL', city: 'Santa Marta',   slug: 'santa-marta',   aliases: ['santa marta', 'tayrona'] },

  // ── Panamá ─────────────────────────────────────────────────────────────────
  { country: 'PAN', city: 'Bocas del Toro',  slug: 'bocas-del-toro',   aliases: ['bocas del toro', 'bocas'] },
  { country: 'PAN', city: 'San Blas',        slug: 'san-blas',         aliases: ['san blas', 'islas san blas', 'guna yala'] },
  { country: 'PAN', city: 'Valle de Antón',  slug: 'valle-de-anton',   aliases: ['valle de anton', 'el valle de anton'] },
  { country: 'PAN', city: 'Ciudad de Panamá', slug: 'ciudad-de-panama', aliases: ['ciudad de panama', 'panama city', 'casco viejo'] },

  // ── República Dominicana ───────────────────────────────────────────────────
  { country: 'DOM', city: 'Samaná',         slug: 'samana',         aliases: ['samana', 'las terrenas'] },
  { country: 'DOM', city: 'Santo Domingo',  slug: 'santo-domingo',  aliases: ['santo domingo', 'zona colonial'] },
  { country: 'DOM', city: 'Puerto Plata',   slug: 'puerto-plata',   aliases: ['puerto plata'] },
  { country: 'DOM', city: 'Cabarete',       slug: 'cabarete',       aliases: ['cabarete'] },
  { country: 'DOM', city: 'Isla Saona',     slug: 'isla-saona',     aliases: ['isla saona', 'saona', 'bayahibe', 'altagracia'] },

  // ── México ─────────────────────────────────────────────────────────────────
  { country: 'MEX', city: 'Ciudad de México', slug: 'ciudad-de-mexico', aliases: ['ciudad de mexico', 'cdmx', 'mexico city', 'mexico df', 'd.f.'] },
  { country: 'MEX', city: 'Puebla',           slug: 'puebla',           aliases: ['puebla'] },
  { country: 'MEX', city: 'Playa del Carmen', slug: 'playa-del-carmen', aliases: ['playa del carmen'] },
  { country: 'MEX', city: 'Chichén Itzá',     slug: 'chichen-itza',     aliases: ['chichen itza', 'chichen-itza', 'chichen'] },
  { country: 'MEX', city: 'Cozumel',          slug: 'cozumel',          aliases: ['cozumel'] },
  { country: 'MEX', city: 'Isla Mujeres',     slug: 'isla-mujeres',     aliases: ['isla mujeres'] },
  { country: 'MEX', city: 'Río Lagartos',     slug: 'rio-lagartos',     aliases: ['rio lagartos'] },

  // ── Guatemala ──────────────────────────────────────────────────────────────
  { country: 'GTM', city: 'Panajachel',       slug: 'panajachel',       aliases: ['panajachel', 'lago atitlan', 'atitlan'] },
  { country: 'GTM', city: 'Petén',            slug: 'peten',            aliases: ['peten', 'tikal', 'flores'] },
  { country: 'GTM', city: 'Antigua Guatemala', slug: 'antigua-guatemala', aliases: ['antigua guatemala', 'antigua'] },
  { country: 'GTM', city: 'Semuc Champey',    slug: 'semuc-champey',    aliases: ['semuc champey', 'semuc'] },
  { country: 'GTM', city: 'Puerto San José',  slug: 'puerto-san-jose',  aliases: ['puerto san jose'] },

  // ── Egipto ─────────────────────────────────────────────────────────────────
  { country: 'EGY', city: 'El Cairo',          slug: 'el-cairo',          aliases: ['el cairo', 'cairo', 'piramides de giza', 'giza'] },
  { country: 'EGY', city: 'Luxor',             slug: 'luxor',             aliases: ['luxor', 'valle de los reyes'] },
  { country: 'EGY', city: 'Sharm El-Sheikh',   slug: 'sharm-el-sheikh',   aliases: ['sharm el sheikh', 'sharm el-sheikh', 'sharm'] },

  // ── Holanda ────────────────────────────────────────────────────────────────
  { country: 'NLD', city: 'Ámsterdam',         slug: 'amsterdam',         aliases: ['amsterdam'] },

  // ── Alemania ───────────────────────────────────────────────────────────────
  { country: 'DEU', city: 'Koblenz',           slug: 'koblenz',           aliases: ['koblenz', 'coblenza'] },
  { country: 'DEU', city: 'Köln',              slug: 'koln',              aliases: ['koln', 'cologne', 'colonia'] },
  { country: 'DEU', city: 'Múnich',            slug: 'munich',            aliases: ['munich', 'muenchen', 'munchen'] },

  // ── España ─────────────────────────────────────────────────────────────────
  { country: 'ESP', city: 'Barcelona',         slug: 'barcelona',         aliases: ['barcelona'] },
  { country: 'ESP', city: 'Tenerife',          slug: 'tenerife',          aliases: ['tenerife', 'carnaval de tenerife', 'carnaval de santa cruz'] },

  // ── Francia ────────────────────────────────────────────────────────────────
  { country: 'FRA', city: 'París',             slug: 'paris',             aliases: ['paris'] },

  // ── Italia ─────────────────────────────────────────────────────────────────
  { country: 'ITA', city: 'Roma',              slug: 'roma',              aliases: ['roma', 'rome', 'vaticano'] },
];

// Normaliza un texto para matching: lowercase, sin acentos, sin signos de puntuación raros.
export function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')   // saca acentos
    .replace(/[‘’`´']/g, '')        // saca apóstrofes y comillas tipográficas
    .replace(/[^a-z0-9\s-]/g, ' ')                      // saca otros símbolos
    .replace(/\s+/g, ' ')
    .trim();
}
