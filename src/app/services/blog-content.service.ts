import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { marked } from 'marked';

/**
 * Carga y parsea un artículo de blog desde
 * /assets/content/blog/<slug>.md → HTML del cuerpo.
 *
 * Mantenido aparte de PlaceContentService a propósito: distinto contenido,
 * distinto frontmatter; generalizar el de places sería un refactor con
 * riesgo en un sitio live y está fuera de scope. Devuelve null si no existe.
 */
@Injectable({ providedIn: 'root' })
export class BlogContentService {
  private readonly http = inject(HttpClient);
  private readonly cache = new Map<string, Observable<string | null>>();

  load(slug: string): Observable<string | null> {
    const cached = this.cache.get(slug);
    if (cached) return cached;

    const req$ = this.http
      .get(`/assets/content/blog/${slug}.md`, { responseType: 'text' })
      .pipe(
        map((raw) => this.toHtml(raw)),
        catchError(() => of(null as string | null)),
        shareReplay(1),
      );
    req$.subscribe((html) => {
      if (html) this.cache.set(slug, req$);
    });
    return req$;
  }

  /** Strips an optional `--- frontmatter ---` block and renders the body. */
  private toHtml(raw: string): string {
    const m = raw.match(/^---\s*\n[\s\S]*?\n---\s*\n?([\s\S]*)$/);
    const body = m ? m[1] : raw;
    return String(marked.parse(body));
  }
}
