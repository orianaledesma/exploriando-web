// ─────────────────────────────────────────────────────────────────────────────
// scripts/fetch-youtube-descriptions.mjs
//
// Lee src/app/data/places.ts, extrae los youtubeId de cada ciudad, llama a
// la YouTube Data API para traer la descripción de cada video, la limpia,
// y genera src/app/content/places/[country-slug]/[city-slug].md.
//
// Cómo correrlo:
//   npm run fetch:descriptions             # genera todos los .md (sólo los que no existen)
//   npm run fetch:descriptions -- --force  # regenera TODOS, sobrescribiendo
//   npm run fetch:descriptions -- --city=mendoza   # sólo una ciudad puntual
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot  = resolve(__dirname, '..');

// ─── Cargar .env.local ───────────────────────────────────────────────────────

(function loadEnvLocal() {
  try {
    const content = readFileSync(resolve(repoRoot, '.env.local'), 'utf8');
    for (const raw of content.split('\n')) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const eq = line.indexOf('=');
      if (eq === -1) continue;
      const key = line.slice(0, eq).trim();
      const val = line.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = val;
    }
  } catch { /* silencioso */ }
})();

const API_KEY = process.env.YOUTUBE_API_KEY;
if (!API_KEY) {
  console.error('❌ Falta YOUTUBE_API_KEY en .env.local');
  process.exit(1);
}

// ─── CLI args ───────────────────────────────────────────────────────────────

const args      = process.argv.slice(2);
const FORCE     = args.includes('--force');
const CITY_ARG  = args.find(a => a.startsWith('--city='))?.split('=')[1];

// ─── Parsear places.ts (extraemos los datos sin compilar TypeScript) ────────
//
// Como `places.ts` es estático y bien estructurado, lo parseamos con regex.
// Si en el futuro la estructura cambia, hay que actualizar las regex.

function parsePlaces() {
  const tsPath = resolve(repoRoot, 'src/app/data/places.ts');
  const ts     = readFileSync(tsPath, 'utf8');

  // Extraer COUNTRIES
  const countries = {};
  const countriesBlock = ts.match(/export const COUNTRIES[^{]*\{([\s\S]*?)^\};/m);
  if (countriesBlock) {
    const re = /(\w+):\s*\{\s*code:\s*'([^']+)',\s*name:\s*'([^']+)',\s*slug:\s*'([^']+)',\s*flag:\s*'([^']+)'/g;
    let m;
    while ((m = re.exec(countriesBlock[1])) !== null) {
      countries[m[2]] = { code: m[2], name: m[3], slug: m[4], flag: m[5] };
    }
  }

  // Extraer PLACES
  const places = [];
  const placesBlock = ts.match(/export const PLACES[^=]*=\s*\[([\s\S]*?)^\];/m);
  if (placesBlock) {
    const re = /countryCode:\s*'([^']+)',\s*city:\s*'([^']+)',\s*slug:\s*'([^']+)',\s*youtubeId:\s*'([^']+)'/g;
    let m;
    while ((m = re.exec(placesBlock[1])) !== null) {
      places.push({ countryCode: m[1], city: m[2], slug: m[3], youtubeId: m[4] });
    }
  }

  return { countries, places };
}

// ─── Limpieza de descripciones ──────────────────────────────────────────────
//
// Las descripciones de YouTube suelen tener cosas que no queremos en el blog:
// - Timestamps tipo "00:00 Intro"
// - Líneas de "Suscribite a mi canal"
// - Listas de redes sociales
// - Hashtags al final
// - Links de afiliados
//
// Las eliminamos heurísticamente para dejar el cuerpo principal del texto.

function cleanDescription(desc) {
  if (!desc) return '';

  let lines = desc.split('\n');

  // Quitar timestamps al principio de línea (00:00, 1:23, 12:34:56)
  lines = lines.filter(l => !/^\s*\d{1,2}:\d{2}(:\d{2})?\s/.test(l));

  // Quitar líneas que son sólo URLs
  lines = lines.filter(l => !/^\s*https?:\/\/\S+\s*$/.test(l));

  // Quitar líneas que son sólo hashtags
  lines = lines.filter(l => !/^\s*(#\w+\s*)+$/.test(l));

  // Quitar líneas con palabras-trampa típicas de redes/afiliados
  const trapPatterns = [
    /suscr[ií]bete|suscribite|suscribirse/i,
    /s[íi]gueme|seguime|seguinos|seguila|seguilo|seguinos en/i,
    /^mis redes/i,
    /^redes:?$/i,
    /seguimos en contacto/i,
    /\binstagram\.com\//i,
    /\btiktok\.com\//i,
    /\bfacebook\.com\//i,
    /\btwitter\.com\//i,
    /\bx\.com\//i,
    /\bpaypal\.me\//i,
    /\bcafecito\b/i,
    /\bbuymeacoffee\b/i,
    /\bafiliad[oa]s?\b/i,
    /c[óo]digo de descuento/i,
    /\butiliza mi c[óo]digo/i,
    /^contacto:?\s*$/i,
    /\bemail\s*:/i,
    /^business:?/i,
    // Etiquetas de redes sociales solas (con o sin colon, posibles emojis)
    /^[\s🎵📱📲💻🎬🎥📺📷✨💕🩵🎭🎉🌟🌍🤝🏷️📌📍🛒🇦🇷🇨🇴🇵🇦🇩🇴🇲🇽🇬🇹🇪🇬🇳🇱🇩🇪🇪🇸🇫🇷🇮🇹]*\s*(tiktok|instagram|intragram|facebook|youtube|twitter|x)\s*:?\s*[🎵📱📲💻🎬🎥📺📷✨💕🩵🎭🎉🌟🌍🤝🏷️📌📍🛒🇦🇷🇨🇴🇵🇦🇩🇴🇲🇽🇬🇹🇪🇬🇳🇱🇩🇪🇪🇸🇫🇷🇮🇹]*\s*$/i,
    // Líneas decorativas (puro guión, igual, asterisco, punto, etc.)
    /^[\s\-=_*•·.~]{3,}$/,
    // Headers promocionales tipo "🌎 UBICACIÓN..." en MAYÚSCULAS
    /^[\s🌎🌍🌏📍📌💎✨]+\s+[A-ZÁÉÍÓÚÜÑ\s]{8,}\s*[🌎🌍🌏📍📌💎✨]*\s*$/u,
    // "DATASO:", "TIP:", "OJO:" sin contenido útil
    /^\s*(dataso|tip|ojo)\s*:?\s*$/i,
  ];
  lines = lines.filter(l => !trapPatterns.some(p => p.test(l)));

  // Limpiar líneas con sólo dashes envolviendo contenido vacío
  lines = lines.filter(l => !/^\s*-{2,}\s*-{2,}\s*$/.test(l));

  // Línea tipo "Instagram del emprendimiento :" o "Intragram de Jacki:" — texto + colon sin URL
  lines = lines.filter(l =>
    !/^[\s🎵📱📲💻🎬🎥📺📷✨💕🩵🎭🎉🌟🌍🤝🏷️📌📍🛒]*\s*(tiktok|instagram|intragram|facebook|youtube|twitter|whatsapp)\b[^:]*:\s*$/i.test(l)
  );

  // CTAs de fin de video ("Si te gustó", "compartilo", "gracias por ver", "dale like", "un abrazo")
  const ctaPatterns = [
    /si te gust[óo]/i,
    /compartilo|comparti el video|comparte el video/i,
    /gracias por ver/i,
    /dale (al )?like/i,
    /dale (al )?[❤️💖💕]/i,
    /\bun abrazo\b/i,
    /granito de arena/i,
    /no te olvides de/i,
    /activa la campanita/i,
    /\bcampanita\b/i,
    /comentanos|coment[áa] abajo|coment[áa]nos/i,
    /\bdejame tu coment/i,
  ];
  lines = lines.filter(l => !ctaPatterns.some(p => p.test(l)));

  // Headers promo en MAYÚSCULAS con cualquier mezcla (incluso con palabras en minúscula como "del", "de")
  // Si la línea es "🌎 UBICACIÓN DEL X" — la mayoría de palabras son MAYÚSCULA, queda como header.
  lines = lines.filter(l => {
    const stripped = l.replace(/[\s🌎🌍🌏📍📌💎✨🇦🇷🇨🇴🇵🇦🇩🇴🇲🇽🇬🇹🇪🇬🇳🇱🇩🇪🇪🇸🇫🇷🇮🇹\-_*]/gu, '');
    if (stripped.length < 10) return true;  // muy corto, no aplicar
    const upperCount = (stripped.match(/[A-ZÁÉÍÓÚÜÑ]/g) ?? []).length;
    const lowerCount = (stripped.match(/[a-záéíóúüñ]/g) ?? []).length;
    // Si más del 70% son mayúsculas y la línea contiene UBICACIÓN/MIRA/SUSCRIBETE etc → header promo
    if (upperCount > lowerCount * 2 && /UBICACI[ÓO]N|MIRA|SUSCR[IÍ]BETE|DESCUBRI|DATASO/.test(l)) {
      return false;
    }
    return true;
  });

  // Colapsar líneas en blanco múltiples
  const cleaned = lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();

  return cleaned;
}

// ─── Llamadas a la API ──────────────────────────────────────────────────────
//
// La YouTube Data API permite traer hasta 50 videos en una sola llamada
// pasando los IDs separados por coma. Lo aprovechamos.

async function fetchVideosBatch(videoIds) {
  const url =
    `https://www.googleapis.com/youtube/v3/videos?part=snippet` +
    `&id=${videoIds.join(',')}` +
    `&key=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API error ${res.status}: ${err}`);
  }
  const data = await res.json();
  return data.items;
}

// ─── Extractor de puntos imperdibles ─────────────────────────────────────────
//
// Muchas descripciones de Exploriando contienen listas explícitas de los
// lugares que se recorrieron. Las detectamos con dos estrategias:
//
//   1. Header "Recorrimos:" / "Visitamos:" / "Lugares:" + bullets debajo
//   2. Enumeración inline "incluyendo X, Y, Z y más"
//
// Si detectamos ≥2 ítems, los devolvemos como array de strings limpios.
// Si no encuentra nada, devuelve [] y el .md mantiene la sección comentada.

// La línea "header" puede tener cualquier prefijo/contexto antes del trigger.
// Lo crítico es que termine con ":" (anunciando la lista) y tenga un trigger word.
const HEADER_REGEX = /\b(recorrimos|visitamos|conocimos|fuimos a|lugares\s+(?:imperdibles?|que\s+ver|que\s+visitar)|imperdibles|destinos|paradas|spots|puntos?\s+(?:que|imperdibles)|aquí\s+(?:están|van|los)|estos\s+(?:son|fueron)|son\s+los)\b[^a-zA-Z\n]{0,40}:\s*$/i;

const STOP_REGEX = /^[\s]*(suscr|s[íi]gueme|mis redes|gracias por ver|si te gust|no te olvides|comment)/i;

function looksLikeListItem(line) {
  if (!line) return null;
  let stripped = line
    .replace(/^[\-•·*▪︎■●▶►→»]+\s*/, '')             // bullets
    .replace(/^\d+[\.\)]\s*/, '')                      // numbered
    .replace(/^[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]+\s*/u, '')  // emojis al inicio
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]+\s*$/u, '')  // emojis al final
    .replace(/^[#]+\s*/, '')                           // hashtags
    .trim();

  if (!stripped) return null;
  if (stripped.length < 3 || stripped.length > 90)  return null;
  if (/[?!]$/.test(stripped))                       return null;  // pregunta/exclamación
  if (stripped.endsWith('.') && stripped.length > 50) return null;  // oración larga
  // Heurística: si tiene varias frases con punto-y-seguido, no es item
  if ((stripped.match(/\.\s/g) ?? []).length >= 2)  return null;

  // Quita el punto final si lo tiene
  return stripped.replace(/\.$/, '');
}

function extractPlaces(description) {
  if (!description) return [];

  const lines = description.split('\n').map(l => l.trim());

  // ── Estrategia 1: header explícito + lista ──
  const headerResult = extractByHeader(lines);
  if (headerResult.length >= 2) return headerResult;

  // ── Estrategia 2: lista numerada (1. X / 2. Y / 3. Z) ──
  const numbered = extractNumberedList(lines);
  if (numbered.length >= 3) return numbered;

  // ── Estrategia 3: emoji-bullets con ":" (🌅 Nombre: descripción) ──
  const emojied = extractEmojiBullets(lines);
  if (emojied.length >= 3) return emojied;

  // ── Estrategia 4b: lista de bullets directa (sin header) ──
  // Descripciones que arrancan con "- A / - B / - C" sin trigger word.
  const bulletList = extractBulletList(lines);
  if (bulletList.length >= 3) return bulletList;

  // ── Estrategia 4: enumeración inline ──
  // SOLO triggers futuros / explícitos — los pasados ("recorrimos") los maneja
  // la Estrategia 1 (header) que es más estricta y evita falsos positivos.
  const inlineTriggers = [
    'incluyendo', 'incluyen', 'tales? como', 'por ejemplo',
    'aquí\\s+los\\s+\\d+\\s+lugares?',
    'recorreremos', 'conoceremos', 'visitaremos',
    'vamos a (?:ver|recorrer|conocer|visitar)',
    'te (?:llevaré|llevaremos|llevo) a',
  ];
  const inlineRegex = new RegExp(
    `(?:${inlineTriggers.join('|')})[:\\s]+([^.!?]{30,300})`,
    'im',
  );
  const m = description.match(inlineRegex);
  if (m) {
    const inner = m[1];
    const items = inner
      .split(/,(?!\s*\d)|\s+y\s+|\s+e\s+/i)
      .map(s => s.trim())
      .map(s => s.replace(/^[\-•·]+\s*/, ''))
      // Quita artículo inicial común para mejor presentación: "el Museo X" → "Museo X"
      .map(s => s.replace(/^(el|la|los|las)\s+/i, ''))
      .filter(s => s.length >= 4 && s.length <= 80)
      .filter(s => !/^(m[áa]s|etc|otros?\s+m[áa]s|y\s+m[áa]s|este|esta|todo)/i.test(s))
      .map(s => s.replace(/\p{Extended_Pictographic}+/gu, '').trim())
      .map(s => s.replace(/^[\-—–\s]+|[\-—–\s]+$/g, ''))
      // Capitaliza la primera letra para que se lea como nombre propio
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .filter(Boolean);

    if (items.length >= 3) return items.slice(0, 12);
  }

  return [];
}

function extractByHeader(lines) {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.length === 0 || line.length > 80) continue;
    if (!HEADER_REGEX.test(line)) continue;

    const items = [];
    let blanksAfterStart = 0;

    for (let j = i + 1; j < lines.length && j < i + 25; j++) {
      const next = lines[j];

      if (!next) {
        blanksAfterStart++;
        if (blanksAfterStart >= 2 && items.length >= 2) break;
        if (items.length === 0) continue;
        continue;
      }
      blanksAfterStart = 0;

      if (STOP_REGEX.test(next)) break;

      const cleaned = looksLikeListItem(next);
      if (!cleaned) {
        if (items.length >= 2) break;
        continue;
      }

      const lower = cleaned.toLowerCase();
      if (!items.some(it => it.toLowerCase() === lower)) items.push(cleaned);
      if (items.length >= 12) break;
    }

    if (items.length >= 2) return items;
  }
  return [];
}

function extractNumberedList(lines) {
  const items = [];
  // Opcionalmente acepta emojis antes del número (ej: "🌸 1 - Visita...")
  // Acepta separador después del número: punto, paréntesis cierra, o dash
  // Permite emojis (incluyendo VS-16 FE0F, ZWJ y skin tone modifiers) antes del número
  const PATTERN = /^[\p{Extended_Pictographic}\u{FE0F}\u{200D}\u{1F3FB}-\u{1F3FF}\s]*(\d+)\s*[\.\)\-]\s+(.+)$/u;
  let lastNum = 0;
  let started = false;

  for (const line of lines) {
    // Líneas blancas no rompen la lista — algunos videos usan items con
    // párrafos largos separados por blank lines.
    if (!line) continue;

    if (STOP_REGEX.test(line)) break;

    const m = line.match(PATTERN);
    if (m) {
      const num = parseInt(m[1], 10);
      if (started && num !== lastNum + 1 && num > lastNum + 2) break;

      const name = cleanItemName(m[2]);

      if (name.length >= 3 && name.length <= 80) {
        items.push(name);
        lastNum = num;
        started = true;
      }
    } else if (started) {
      // Línea no matchea — sólo cerramos si ya tenemos suficientes items
      // y la línea claramente no es continuación (por ejemplo MAPA / hashtags / etc).
      // En este caso seguimos en silencio hasta encontrar el próximo número o STOP.
      // (no break aquí — un párrafo descriptivo entre items no rompe la lista)
    }
  }

  return items;
}

/**
 * Limpia un texto que viene de un item de lista. Corta en el primer separador
 * (`–`, `—`, ` - `, `:`) si está más allá del char 5, saca emojis y puntuación
 * residual.
 */
function cleanItemName(raw) {
  let s = raw.trim();

  // Cortar en separador: "–", "—", " - " (con espacios), ":"
  const separatorMatch = s.match(/^(.{5,}?)\s*[–—](?:\s|$)|^(.{5,}?)\s+-\s+|^(.{5,}?):\s/);
  if (separatorMatch) {
    s = (separatorMatch[1] ?? separatorMatch[2] ?? separatorMatch[3]).trim();
  }

  // Sacar emojis (al inicio, medio y final)
  s = s.replace(/\p{Extended_Pictographic}/gu, '').trim();

  // Sacar puntuación residual al final
  s = s.replace(/[.,;\s]+$/, '').trim();
  // Sacar guiones residuales
  s = s.replace(/^[\-—–]+\s*/, '').replace(/\s*[\-—–]+$/, '').trim();

  return s;
}

function extractBulletList(lines) {
  const items = [];
  const PATTERN = /^[\-•·*▪︎■●▶►]\s+(.{3,80})$/;
  let started = false;

  for (const line of lines) {
    if (!line) {
      if (started && items.length >= 3) break;
      continue;
    }

    if (STOP_REGEX.test(line)) break;

    const m = line.match(PATTERN);
    if (m) {
      const name = cleanItemName(m[1]);
      if (name.length >= 3 && name.length <= 80) {
        const lower = name.toLowerCase();
        if (!items.some(it => it.toLowerCase() === lower)) {
          items.push(name);
          started = true;
        }
      }
    } else if (started && items.length >= 3) {
      break;
    }
  }

  return items;
}

function extractEmojiBullets(lines) {
  const items = [];
  // Patrón: línea que arranca con emoji(s), opcional dash/espacio, NOMBRE, separador, descripción
  // Acepta como separador `:`, `–`, `—`, ` - ` (espacios laterales requeridos)
  const PATTERN =
    /^[\p{Extended_Pictographic}\u{FE0F}\u{200D}\u{1F3FB}-\u{1F3FF}]+\s*[\-—–]?\s*([^:–—\n]{3,80}?)\s*(?::|–|—|\s-\s)\s*.{6,}/u;

  // Excluir líneas que claramente NO son items (URLs, mapas, hashtags)
  const EXCLUDE = /^\p{Extended_Pictographic}+\s*(mapa|map|enlace|link|http|www|spotify|instagram|tiktok|youtube)/iu;

  let started = false;

  for (const line of lines) {
    if (!line) {
      if (started && items.length >= 3) break;
      continue;
    }

    if (STOP_REGEX.test(line)) break;
    if (EXCLUDE.test(line))    continue;

    const m = line.match(PATTERN);
    if (m) {
      let name = m[1].trim()
        .replace(/^[\-—–\s]+/, '')
        .replace(/[\-—–\s]+$/, '')
        // Quitar emojis residuales
        .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]+/gu, '')
        .trim();

      if (name.length >= 3 && name.length <= 80) {
        const lower = name.toLowerCase();
        if (!items.some(it => it.toLowerCase() === lower)) {
          items.push(name);
          started = true;
        }
      }
    } else if (started && items.length >= 3) {
      break;
    }
  }

  return items;
}

// ─── Generar el .md ─────────────────────────────────────────────────────────

function generateMarkdown(place, country, video) {
  const snippet = video?.snippet ?? {};
  const title       = snippet.title       ?? '';
  const description = cleanDescription(snippet.description ?? '');
  const publishedAt = snippet.publishedAt ?? '';
  const date        = publishedAt ? publishedAt.slice(0, 10) : '';

  const places = extractPlaces(description);

  const fm = [
    '---',
    `city: ${place.city}`,
    `slug: ${place.slug}`,
    `country: ${country.name}`,
    `countryCode: ${country.code}`,
    `flag: ${country.flag}`,
    `youtubeId: ${place.youtubeId}`,
    `youtubeTitle: ${JSON.stringify(title)}`,
    `publishedAt: ${date}`,
    `bestMonths: []  # 1=Ene, 12=Dic — completar cuando esté listo`,
    `summary: ""     # 1-2 líneas para mostrar en el drawer del mapa`,
    '---',
    '',
  ].join('\n');

  // Sección "Puntos imperdibles" — auto-extraída si la descripción tiene una lista
  const imperdiblesBlock = places.length >= 2
    ? [
        '## Puntos imperdibles',
        '',
        ...places.map(p => `- ${p}`),
        '',
        '> _Auto-extraído del video. Editá esta lista para sumar contexto, fotos o subdivisiones._',
        '',
      ].join('\n')
    : '';

  // Si NO se extrajeron lugares, dejamos la sección "Puntos imperdibles" en el bloque comentado
  // como placeholder. Si SÍ se extrajeron, el bloque comentado abajo solo tiene las otras secciones.
  const commentedBlock = places.length >= 2
    ? [
        '<!--',
        '  Secciones opcionales — descomentá cuando las completes.',
        '',
        '## Mejor época para visitar',
        '',
        'Comentario sobre el clima, eventos, temporada alta/baja...',
        '',
        '## Dónde comer',
        '',
        '- **Lugar A** — qué pedir, precio aprox',
        '- **Lugar B** — qué pedir, precio aprox',
        '',
        '## Dónde dormir',
        '',
        '- Zona X (mejor para...)',
        '- Zona Y (más económica)',
        '',
        '## Tips de viajera',
        '',
        '- Moneda y pagos',
        '- Transporte',
        '- Idioma básico',
        '- Qué evitar',
        '-->',
      ].join('\n')
    : [
        '<!--',
        '  Secciones opcionales — descomentá cuando las completes.',
        '',
        '## Puntos imperdibles',
        '',
        '- Lugar A',
        '- Lugar B',
        '',
        '## Mejor época para visitar',
        '',
        'Comentario sobre el clima, eventos, temporada alta/baja...',
        '',
        '## Dónde comer',
        '',
        '- **Lugar A** — qué pedir, precio aprox',
        '',
        '## Dónde dormir',
        '',
        '- Zona X (mejor para...)',
        '',
        '## Tips de viajera',
        '',
        '- Moneda y pagos',
        '- Transporte',
        '-->',
      ].join('\n');

  const body = [
    `# ${place.city}`,
    '',
    '## Por qué te va a gustar',
    '',
    description || '_(descripción de YouTube vacía — completar manualmente)_',
    '',
    imperdiblesBlock,
    commentedBlock,
    '',
  ].join('\n');

  return fm + body;
}

// ─── Main ───────────────────────────────────────────────────────────────────

console.log('📖  Leyendo src/app/data/places.ts...');
const { countries, places } = parsePlaces();
console.log(`✅  ${places.length} ciudades · ${Object.keys(countries).length} países`);

// Filtrar por --city si se pasó
const targetPlaces = CITY_ARG
  ? places.filter(p => p.slug === CITY_ARG)
  : places;

if (CITY_ARG && targetPlaces.length === 0) {
  console.error(`❌ No se encontró la ciudad con slug "${CITY_ARG}"`);
  console.error('   Slugs disponibles:', places.map(p => p.slug).join(', '));
  process.exit(1);
}

// Filtrar las que ya tienen .md (a menos que --force)
const contentRoot = resolve(repoRoot, 'src/assets/content/places');
const toFetch = targetPlaces.filter(p => {
  const country = countries[p.countryCode];
  const mdPath  = resolve(contentRoot, country.slug, `${p.slug}.md`);
  if (FORCE) return true;
  if (!existsSync(mdPath)) return true;
  console.log(`⏭   ${p.city.padEnd(22)} — ya existe (saltando)`);
  return false;
});

if (toFetch.length === 0) {
  console.log('');
  console.log('✅ Todas las ciudades ya tienen su .md. Usá --force para regenerar.');
  process.exit(0);
}

console.log(`📡  Pidiendo ${toFetch.length} videos a la API...`);

// La API permite hasta 50 IDs por llamada, separados por coma.
const batches = [];
for (let i = 0; i < toFetch.length; i += 50) {
  batches.push(toFetch.slice(i, i + 50));
}

const videosByid = new Map();
for (const batch of batches) {
  const ids = batch.map(p => p.youtubeId);
  const items = await fetchVideosBatch(ids);
  for (const item of items) {
    videosByid.set(item.id, item);
  }
}

console.log(`✅  ${videosByid.size}/${toFetch.length} descripciones recibidas`);

// Generar .md por ciudad
let written = 0;
let missing = 0;
for (const place of toFetch) {
  const country = countries[place.countryCode];
  const video   = videosByid.get(place.youtubeId);

  if (!video) {
    console.warn(`⚠   ${place.city} — videoId ${place.youtubeId} NO devuelto por la API (¿privado?, ¿borrado?)`);
    missing++;
    continue;
  }

  const md      = generateMarkdown(place, country, video);
  const dirPath = resolve(contentRoot, country.slug);
  const mdPath  = resolve(dirPath, `${place.slug}.md`);

  mkdirSync(dirPath, { recursive: true });
  writeFileSync(mdPath, md, 'utf8');
  written++;

  console.log(`✏   ${place.city.padEnd(22)} → ${country.slug}/${place.slug}.md`);
}

console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`✅  ${written} archivos .md generados en src/app/content/places/`);
if (missing) console.log(`⚠   ${missing} ciudades con videos no disponibles`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
