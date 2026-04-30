// ─────────────────────────────────────────────────────────────────────────────
// scripts/pick-best-videos.mjs
//
// Procesa scripts/youtube-matches.json y, para cada ciudad ambigua, elige
// automáticamente el "video principal" usando un sistema de scoring basado
// en los patrones de títulos del canal Exploriando.
//
// Cómo correrlo:
//   npm run pick:youtube
//
// Qué genera:
//   scripts/youtube-recommended.json — 1 video elegido por ciudad
//   + imprime una tabla en consola para que Oriana revise/confirme
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const matchesPath = resolve(__dirname, 'youtube-matches.json');
const data = JSON.parse(readFileSync(matchesPath, 'utf8'));

// ─── Falsos positivos por ciudad ─────────────────────────────────────────────
// Reglas que detectan títulos que matchearon una ciudad pero hablan de otra cosa.
// Ej: "Colonia, Uruguay" matchea "Köln" porque "colonia" es alias, pero NO es Köln.
const FALSE_POSITIVES = {
  'koln':            (t) => /uruguay|🇺🇾/.test(t),                   // Colonia, Uruguay
  'roma':            (t) => /\bmexico\b|\bmx\b|\bnorte\b/i.test(t),  // Roma Norte (CDMX)
  'cordoba':         (t) => /\bespana\b|\bandalucia\b/i.test(t),     // Córdoba, España
  'san-blas':        (t) => /\bnayarit\b/i.test(t),                  // San Blas, Nayarit (México)
};

// ─── Scoring de títulos ──────────────────────────────────────────────────────
function scoreTitle(title) {
  const t = title.toLowerCase();
  let score = 0;
  const reasons = [];

  // ── PATRONES DE "VIDEO PRINCIPAL / GUÍA" (positivos fuertes) ──
  if (/\b\d+\s+(imperdible|imperdibles)/i.test(t))         { score += 35; reasons.push('+35 "N IMPERDIBLES"'); }
  else if (/imperdibles?/i.test(t) && /\d/.test(t))        { score += 25; reasons.push('+25 imperdibles+nro'); }
  else if (/imperdibles?/i.test(t))                        { score += 12; reasons.push('+12 imperdible'); }

  if (/\b\d+\s+(lugares?|destinos?|joyas?|cosas?|actividades?|experiencias?|puntos?|paraisos?)/i.test(t)) {
    score += 28; reasons.push('+28 "N lugares/destinos/etc"');
  }
  if (/\b(qu[ée]?\s+(hacer|conocer|ver|visitar))\b/i.test(t)) { score += 18; reasons.push('+18 "qué hacer/ver"'); }
  if (/\b(tienes?\s+que|tenes\s+que|debes|tenés\s+que)\s+(ver|ir|visitar|conocer)/i.test(t)) {
    score += 15; reasons.push('+15 "tenés que ver/ir"');
  }
  if (/\bguia\b|\bguía\b/i.test(t))                        { score += 12; reasons.push('+12 "guía"'); }
  if (/\blo mejor\b|\bmejores\b/i.test(t))                 { score += 8;  reasons.push('+8 "lo mejor"'); }
  if (/\bdescubre\b|\bdescubri\b|\bdescubrí\b/i.test(t))   { score += 6;  reasons.push('+6 "descubrí"'); }

  // ── PATRONES DE "CLIP CORTO / TEASER" (negativos) ──
  if (/^preview\b|\bpreview de\b/i.test(t))                { score -= 25; reasons.push('-25 "preview"'); }
  if (/mira(lo)?\s+(en mi canal|en mi)/i.test(t))          { score -= 20; reasons.push('-20 "mira en mi canal"'); }
  if (/m[áa]s info en mi canal/i.test(t))                  { score -= 15; reasons.push('-15 "más info en"'); }
  if (/\bse viene\b/i.test(t))                             { score -= 10; reasons.push('-10 "se viene"'); }
  if (/\bparte\s+\d+/i.test(t))                            { score -= 8;  reasons.push('-8 "parte N"'); }

  // ── BONUS por longitud / claridad ──
  if (title.length >= 35 && title.length <= 90)            { score += 4;  reasons.push('+4 longitud'); }
  if (title.length < 25)                                   { score -= 5;  reasons.push('-5 muy corto'); }

  return { score, reasons };
}

// ─── Procesar y escribir recomendaciones ─────────────────────────────────────

const recommendations = [];

// Las ciudades que ya estaban matched (1 candidato) pasan tal cual.
for (const m of data.matched) {
  recommendations.push({
    ...m,
    autoSelected: true,
    score: null,
    note: 'único candidato',
  });
}

// Las ambiguas: aplicamos scoring + filtrado de falsos positivos.
for (const ambig of data.ambiguous) {
  const filtered = ambig.candidates.filter(c => {
    const fp = FALSE_POSITIVES[ambig.slug];
    if (!fp) return true;
    return !fp(c.title);
  });

  if (filtered.length === 0) {
    recommendations.push({
      city:        ambig.city,
      country:     ambig.country,
      countryCode: ambig.countryCode,
      slug:        ambig.slug,
      autoSelected: false,
      note:        'TODOS los candidatos eran falsos positivos — revisar manualmente',
      candidatesAll: ambig.candidates,
    });
    continue;
  }

  const scored = filtered.map(c => ({ ...c, ...scoreTitle(c.title) }));
  scored.sort((a, b) => b.score - a.score);
  const winner = scored[0];

  recommendations.push({
    city:        ambig.city,
    country:     ambig.country,
    countryCode: ambig.countryCode,
    slug:        ambig.slug,
    videoId:     winner.videoId,
    title:       winner.title,
    publishedAt: winner.publishedAt,
    url:         winner.url,
    autoSelected: true,
    score:       winner.score,
    scoreReasons: winner.reasons,
    runnersUp:   scored.slice(1, 3).map(c => ({
      videoId: c.videoId, title: c.title, score: c.score, url: c.url,
    })),
  });
}

// Las missing pasan tal cual.
for (const m of data.missing) {
  recommendations.push({
    city:    m.city,
    country: m.country,
    slug:    m.slug,
    autoSelected: false,
    note:    'no se encontró ningún video — revisar en unmatched',
  });
}

// ─── Output JSON ─────────────────────────────────────────────────────────────

const outPath = resolve(__dirname, 'youtube-recommended.json');
writeFileSync(outPath, JSON.stringify({
  generatedAt: new Date().toISOString(),
  totalCities: recommendations.length,
  recommendations,
}, null, 2), 'utf8');

// ─── Tabla en consola para que Oriana revise ────────────────────────────────

console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  RECOMENDACIONES POR CIUDAD');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');

for (const r of recommendations) {
  if (r.videoId) {
    const tag = r.score === null ? '✓' : `✓ score:${r.score}`;
    console.log(`📍 ${r.city.padEnd(22)} (${r.country})`);
    console.log(`   ${tag}  ${r.title}`);
    console.log(`   ${r.url}`);
    if (r.runnersUp?.length) {
      console.log(`   también podría ser:`);
      for (const ru of r.runnersUp) {
        console.log(`     · score:${ru.score}  ${ru.title}`);
      }
    }
  } else {
    console.log(`❌ ${r.city.padEnd(22)} (${r.country})`);
    console.log(`   ${r.note}`);
  }
  console.log('');
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`📄  Recomendación completa en: scripts/youtube-recommended.json`);
console.log('');
