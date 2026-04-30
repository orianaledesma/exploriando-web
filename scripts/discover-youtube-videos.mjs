// ─────────────────────────────────────────────────────────────────────────────
// scripts/discover-youtube-videos.mjs
//
// Descubre todos los videos del canal @Exploriando en YouTube y los matchea
// contra las ciudades definidas en scripts/_cities.mjs.
//
// Cómo correrlo:
//   npm run discover:youtube
//
// Qué genera:
//   scripts/youtube-matches.json — con 4 secciones:
//     - matched     → 1 video por ciudad, listo para usar
//     - ambiguous   → ciudades con 2+ candidatos (vos elegís cuál)
//     - missing     → ciudades sin video encontrado
//     - unmatched   → videos del canal que no matchearon ninguna ciudad
// ─────────────────────────────────────────────────────────────────────────────

import { writeFileSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CITIES, COUNTRIES, normalize } from './_cities.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Carga .env.local manualmente (compatible con Node 18+; no necesita --env-file).
function loadEnvLocal() {
  try {
    const envPath = resolve(__dirname, '..', '.env.local');
    const content = readFileSync(envPath, 'utf8');
    for (const raw of content.split('\n')) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const eq = line.indexOf('=');
      if (eq === -1) continue;
      const key = line.slice(0, eq).trim();
      const val = line.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    // Silencioso — si no existe .env.local, igual probamos con env del sistema.
  }
}
loadEnvLocal();

const API_KEY = process.env.YOUTUBE_API_KEY;
const HANDLE  = 'Exploriando';   // sin el @ — la API lo agrega
const API     = 'https://www.googleapis.com/youtube/v3';

if (!API_KEY) {
  console.error('❌ Falta YOUTUBE_API_KEY en .env.local');
  console.error('   Agregalo así: YOUTUBE_API_KEY=AIzaSy...');
  process.exit(1);
}

// ─── 1. Obtener el canal por handle ──────────────────────────────────────────
// Endpoint: channels.list?forHandle=Exploriando
// Devuelve, entre otras cosas, contentDetails.relatedPlaylists.uploads, que es
// el ID de la playlist que contiene TODOS los uploads del canal en orden
// cronológico inverso.

console.log(`📡  Buscando canal @${HANDLE}...`);

const channelUrl = `${API}/channels?part=contentDetails,snippet&forHandle=${HANDLE}&key=${API_KEY}`;
const channelRes = await fetch(channelUrl);

if (!channelRes.ok) {
  const error = await channelRes.text();
  console.error(`❌ Error al consultar el canal: ${channelRes.status}`);
  console.error(error);
  process.exit(1);
}

const channelData = await channelRes.json();

if (!channelData.items?.length) {
  console.error(`❌ No se encontró el canal @${HANDLE}.`);
  console.error('   Verificá que el handle sea correcto.');
  process.exit(1);
}

const channel       = channelData.items[0];
const channelTitle  = channel.snippet.title;
const uploadsListId = channel.contentDetails.relatedPlaylists.uploads;

console.log(`✅  Canal: ${channelTitle}`);
console.log(`📺  Uploads playlist: ${uploadsListId}`);

// ─── 2. Listar todos los videos de la uploads playlist ──────────────────────
// Endpoint: playlistItems.list?playlistId=...
// Devuelve max 50 por página. Si el canal tiene >50 videos, hay que paginar
// con `pageToken`.

const videos = [];
let pageToken = '';

do {
  const playlistUrl =
    `${API}/playlistItems?part=snippet,contentDetails` +
    `&playlistId=${uploadsListId}` +
    `&maxResults=50` +
    (pageToken ? `&pageToken=${pageToken}` : '') +
    `&key=${API_KEY}`;

  const res = await fetch(playlistUrl);
  if (!res.ok) {
    console.error(`❌ Error al listar videos: ${res.status}`);
    console.error(await res.text());
    process.exit(1);
  }

  const data = await res.json();
  for (const item of data.items) {
    videos.push({
      videoId:     item.contentDetails.videoId,
      title:       item.snippet.title,
      publishedAt: item.contentDetails.videoPublishedAt ?? item.snippet.publishedAt,
      url:         `https://youtube.com/watch?v=${item.contentDetails.videoId}`,
    });
  }
  pageToken = data.nextPageToken ?? '';
} while (pageToken);

console.log(`✅  ${videos.length} videos encontrados en el canal`);

// ─── 3. Matchear cada video contra las ciudades ──────────────────────────────
// Para cada ciudad, recorremos sus aliases y chequeamos si alguno aparece en
// el título normalizado. Si una misma ciudad encuentra 1 video → matched. Si
// encuentra 2+ → ambiguous. Si encuentra 0 → missing.
//
// Un video puede matchear múltiples ciudades (raro pero pasa, ej: "Tour por
// Antigua y Panajachel"); en ese caso, queda asignado a la ciudad cuyo alias
// más largo aparece en el título (más específico gana).

const matchesByCity = new Map();   // city.slug → array de videos
const videoBestCity = new Map();   // video.videoId → { city, aliasLength }

for (const city of CITIES) {
  matchesByCity.set(city.slug, []);
}

for (const video of videos) {
  const titleNorm = normalize(video.title);

  for (const city of CITIES) {
    for (const alias of city.aliases) {
      const aliasNorm = normalize(alias);

      // Match si el alias aparece como palabra en el título
      // (no como substring de otra palabra). Ej: "rome" no matchea "romero".
      const re = new RegExp(`\\b${aliasNorm.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`);

      if (re.test(titleNorm)) {
        // Ver si este video ya tiene una ciudad asignada con un alias más específico
        const prev = videoBestCity.get(video.videoId);
        if (!prev || aliasNorm.length > prev.aliasLength) {
          videoBestCity.set(video.videoId, { citySlug: city.slug, aliasLength: aliasNorm.length });
        }
        break;
      }
    }
  }
}

// Ahora resolvemos: cada video pertenece a su mejor ciudad.
for (const video of videos) {
  const best = videoBestCity.get(video.videoId);
  if (best) {
    matchesByCity.get(best.citySlug).push(video);
  }
}

// ─── 4. Construir el output ─────────────────────────────────────────────────

const matched   = [];
const ambiguous = [];
const missing   = [];

for (const city of CITIES) {
  const found = matchesByCity.get(city.slug);
  const country = COUNTRIES[city.country];

  if (found.length === 0) {
    missing.push({
      city:    city.city,
      country: country.name,
      slug:    city.slug,
    });
  } else if (found.length === 1) {
    matched.push({
      city:        city.city,
      country:     country.name,
      countryCode: city.country,
      slug:        city.slug,
      videoId:     found[0].videoId,
      title:       found[0].title,
      publishedAt: found[0].publishedAt,
      url:         found[0].url,
    });
  } else {
    ambiguous.push({
      city:        city.city,
      country:     country.name,
      countryCode: city.country,
      slug:        city.slug,
      candidates:  found.map(v => ({
        videoId:     v.videoId,
        title:       v.title,
        publishedAt: v.publishedAt,
        url:         v.url,
      })),
    });
  }
}

// Videos que no matchearon ninguna ciudad
const matchedVideoIds = new Set(videoBestCity.keys());
const unmatched = videos
  .filter(v => !matchedVideoIds.has(v.videoId))
  .map(v => ({
    videoId:     v.videoId,
    title:       v.title,
    publishedAt: v.publishedAt,
    url:         v.url,
  }));

// ─── 5. Escribir el archivo ─────────────────────────────────────────────────

const output = {
  generatedAt: new Date().toISOString(),
  channel:     channelTitle,
  totalVideos: videos.length,
  summary: {
    matched:   matched.length,
    ambiguous: ambiguous.length,
    missing:   missing.length,
    unmatched: unmatched.length,
  },
  matched,
  ambiguous,
  missing,
  unmatched,
};

const outPath = resolve(__dirname, 'youtube-matches.json');
writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');

// ─── 6. Resumen en consola ──────────────────────────────────────────────────

console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`✅  ${matched.length} ciudades matcheadas (1 video cada una)`);
if (ambiguous.length) {
  console.log(`⚠️   ${ambiguous.length} ciudades con candidatos múltiples — revisalas:`);
  for (const a of ambiguous) {
    console.log(`     · ${a.city} (${a.country}) → ${a.candidates.length} candidatos`);
  }
}
if (missing.length) {
  console.log(`❌  ${missing.length} ciudades sin video encontrado:`);
  for (const m of missing) {
    console.log(`     · ${m.city} (${m.country})`);
  }
}
if (unmatched.length) {
  console.log(`📦  ${unmatched.length} videos del canal sin matchear ninguna ciudad`);
  console.log('     (probablemente intros, vlogs sin lugar específico, o ciudades nuevas)');
}
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`📄  Archivo generado: scripts/youtube-matches.json`);
console.log('');
