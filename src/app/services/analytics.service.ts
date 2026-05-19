import { Injectable, inject, provideAppInitializer } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

/**
 * Eventos GA4 trackeados desde el sitio. Mantener el set chico: cada evento
 * representa una intención del usuario, no un click cualquiera.
 */
export type AnalyticsEvent =
  | 'country_card_click'      // card de país en MapaTeaser
  | 'mapa_cta_click'          // CTA "Explorar las guías" del MapaTeaser
  | 'marker_click'            // marker SVG en /mapa (desktop)
  | 'country_list_click'      // item de CountryNavList en /mapa
  | 'email_capture_submit'    // submit exitoso de cualquier form (param `source` lo identifica: hero/footer/guia/viajero-creador/etc.)
  | 'email_capture_error'     // error en submit (EmailJS, network)
  | 'marcas_form_click'       // click outbound al Google Form de marcas (param `location` distingue hero/package/final_cta)
  | 'marcas_teaser_click'     // CTA del teaser B2B en el landing → deriva a /marcas
  | 'viajero_creador_youtube_click'  // CTA al canal de YouTube (watch hours)
  | 'viajero_creador_session_click'  // CTA a reservar sesión 1:1 (Calendly)
  | 'affiliate_click';        // click outbound a un link de afiliado (param `partner` = id de la card)

export type AnalyticsParams = Record<string, string | number | boolean>;

type Gtag = (
  command: 'event',
  name: string,
  params?: AnalyticsParams,
) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

/**
 * Wrapper tipado sobre `window.gtag` (GA4). El script de Google Tag se carga
 * en `index.html` con el ID `G-QS5SN1M3H3`. Si el script no está disponible
 * (SSR, dev sin GA, ad-blockers), `track()` y `trackPageView()` son no-op.
 *
 * El `gtag('config', ...)` está configurado con `send_page_view: false` —
 * los pageviews los dispara `provideAnalytics()` desde NavigationEnd para
 * cubrir las rutas SPA.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  /**
   * Dispara un evento custom GA4. Nunca lanza: analytics no debe romper la UI.
   * @param event Nombre del evento (union tipado para evitar typos).
   * @param params Parámetros opcionales — se envían tal cual a gtag.
   */
  track(event: AnalyticsEvent, params: AnalyticsParams = {}): void {
    try {
      if (typeof window === 'undefined') return;
      const gtag = window.gtag;
      if (typeof gtag !== 'function') return;
      gtag('event', event, params);
    } catch {
      /* no-op */
    }
  }

  /**
   * Dispara un `page_view` GA4. Lo invoca `provideAnalytics()` en cada
   * NavigationEnd; también puede invocarse a mano si una página cambia su
   * "estado lógico" sin cambiar la URL.
   */
  trackPageView(path: string, title?: string): void {
    try {
      if (typeof window === 'undefined') return;
      const gtag = window.gtag;
      if (typeof gtag !== 'function') return;
      gtag('event', 'page_view', {
        page_path:     path,
        page_title:    title ?? document.title,
        page_location: window.location.href,
      });
    } catch {
      /* no-op */
    }
  }
}

/**
 * Conecta `router.events` a `analytics.trackPageView()` para que cada
 * NavigationEnd dispare un pageview GA4. Función pura para que sea fácil
 * de testear sin DI.
 */
export function setupRouterPageviews(router: Router, analytics: AnalyticsService): void {
  router.events
    .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
    .subscribe(e => analytics.trackPageView(e.urlAfterRedirects));
}

/**
 * Provider para `app.config.ts` que enchufa el tracking de pageviews SPA
 * al startup de la app.
 */
export function provideAnalytics() {
  return provideAppInitializer(() => {
    setupRouterPageviews(inject(Router), inject(AnalyticsService));
  });
}
