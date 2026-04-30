import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal, Signal } from '@angular/core';
import { marked } from 'marked';
import { Observable, of, shareReplay } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * Frontmatter parseado de un archivo .md de ciudad.
 * Coincide con el shape que produce scripts/fetch-youtube-descriptions.mjs.
 */
export interface PlaceFrontmatter {
  city:         string;
  slug:         string;
  country:      string;
  countryCode:  string;
  flag:         string;
  youtubeId:    string;
  youtubeTitle: string;
  publishedAt:  string;
  bestMonths:   number[];
  summary:      string;
}

/** Contenido completo de una ciudad — frontmatter + body en HTML ya parseado. */
export interface PlaceContent {
  frontmatter: PlaceFrontmatter;
  /** HTML resultante de procesar el cuerpo del .md con marked. */
  bodyHtml:    string;
}

/**
 * Carga, cachea y parsea el contenido de las ciudades desde
 * /assets/content/places/[country-slug]/[city-slug].md
 *
 * El parser de frontmatter está hecho a medida (YAML simple key:value)
 * para evitar la dependencia con gray-matter.
 */
@Injectable({ providedIn: 'root' })
export class PlaceContentService {
  private readonly http = inject(HttpClient);

  private readonly cache = new Map<string, Observable<PlaceContent | null>>();

  /** Estado de la última carga (para mostrar spinners en UI). */
  private readonly _loading = signal(false);
  readonly loading: Signal<boolean> = this._loading.asReadonly();

  /**
   * Carga el contenido de una ciudad. Cachea el observable para evitar
   * múltiples requests. Devuelve `null` si el archivo no existe.
   */
  load(countrySlug: string, citySlug: string): Observable<PlaceContent | null> {
    const key = `${countrySlug}/${citySlug}`;
    const existing = this.cache.get(key);
    if (existing) return existing;

    this._loading.set(true);
    const url = `/assets/content/places/${countrySlug}/${citySlug}.md`;
    const req$ = this.http.get(url, { responseType: 'text' }).pipe(
      map(raw => this.parse(raw)),
      catchError(() => of(null as PlaceContent | null)),
      shareReplay(1),
    );

    // Sólo cacheamos el caso éxito (si fue null, dejamos reintentar)
    req$.subscribe(c => { if (c) this.cache.set(key, req$); this._loading.set(false); });
    return req$;
  }

  /**
   * Parsea un archivo .md crudo en frontmatter + bodyHtml.
   * Expone como público para facilitar testing.
   */
  parse(raw: string): PlaceContent {
    const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
    if (!match) {
      return {
        frontmatter: emptyFrontmatter(),
        bodyHtml:    String(marked.parse(raw)),
      };
    }

    const fm   = parseFrontmatter(match[1]);
    const body = match[2] ?? '';
    const bodyHtml = String(marked.parse(body));

    return { frontmatter: fm, bodyHtml };
  }
}

// ─── Frontmatter parser ──────────────────────────────────────────────────────
//
// El frontmatter es YAML muy simple — sólo soportamos:
//   key: valor                  (string sin comillas)
//   key: "valor con espacios"   (string con comillas)
//   key: []                     (array vacío)
//   key: [1, 2, 3]              (array de números o strings)
//   # comentario al final de línea (lo ignoramos)
//
// Cualquier YAML más complejo NO se soporta — pero nuestros .md tienen siempre
// este shape porque los genera el script.

function parseFrontmatter(yaml: string): PlaceFrontmatter {
  const out: Partial<PlaceFrontmatter> = {};

  for (const raw of yaml.split('\n')) {
    const line = stripComment(raw).trim();
    if (!line) continue;

    const colon = line.indexOf(':');
    if (colon === -1) continue;

    const key = line.slice(0, colon).trim() as keyof PlaceFrontmatter;
    const val = line.slice(colon + 1).trim();

    if (key === 'bestMonths') {
      out.bestMonths = parseArray(val).map(v => Number(v)).filter(n => !Number.isNaN(n));
    } else {
      (out as Record<string, string>)[key] = stripQuotes(val);
    }
  }

  return { ...emptyFrontmatter(), ...out };
}

function emptyFrontmatter(): PlaceFrontmatter {
  return {
    city: '', slug: '', country: '', countryCode: '', flag: '',
    youtubeId: '', youtubeTitle: '', publishedAt: '',
    bestMonths: [], summary: '',
  };
}

/** Elimina los comentarios `# foo` que vienen al final de la línea. */
function stripComment(line: string): string {
  // Cuidado: si está dentro de comillas, no es comentario. Acá asumimos
  // que nuestro YAML no tiene `#` dentro de strings (controlado por nosotros).
  const hash = line.indexOf('#');
  return hash === -1 ? line : line.slice(0, hash);
}

function stripQuotes(s: string): string {
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}

function parseArray(val: string): string[] {
  if (!val.startsWith('[') || !val.endsWith(']')) return [];
  const inner = val.slice(1, -1).trim();
  if (!inner) return [];
  return inner.split(',').map(s => s.trim()).filter(Boolean);
}
