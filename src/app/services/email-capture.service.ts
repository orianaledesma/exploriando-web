import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import emailjs from '@emailjs/browser';
import { forkJoin, from, of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { EmailCaptureData } from '../models/email-capture.model';
import { AnalyticsService } from './analytics.service';

const RATE_LIMIT_KEY    = 'email_submissions';
const RATE_LIMIT_MAX    = 3;
const RATE_LIMIT_WINDOW = 10 * 60 * 1000;
const SUBMITTED_KEY     = 'email_submitted';

export const GIFT_DRIVE_URL =
  'https://drive.google.com/file/d/1E0U4zTIWCXmZjXQdV8zAFAj95HQ6MsJ5/view';

/** Página privada de la guía (visor + descarga, PDF por idioma). El email de
 *  bienvenida linkea acá con `?lang=` para forzar el idioma del suscriptor. */
const GUIDE_PAGE_URL = 'https://exploriando.page/guia-acceso';

/** Página de baja. El email de bienvenida la linkea con `?email=&lang=`; pide
 *  confirmación y llama a la función `/api/unsubscribe` (MailerLite). */
const UNSUBSCRIBE_PAGE_URL = 'https://exploriando.page/baja';

const SOURCE_LABELS: Record<EmailCaptureData['source'], string> = {
  'hero':               'Hero — Comunidad',
  'recursos':           'Recursos — Guía gratuita',
  'footer':             'Footer — CTA final',
  'viajero-creador':    'Viajero Creador — Waitlist',
  'guia':               'Página /guia — Lectura completa',
  'guias-premium':      'Guías premium — Lista de espera',
  'curso-creador':      'Curso Viajero Creador — Lista de espera',
};

@Injectable({ providedIn: 'root' })
export class EmailCaptureService {
  private readonly analytics = inject(AnalyticsService);
  private readonly http = inject(HttpClient);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  isRateLimited(): boolean {
    if (!this.isBrowser) return false;
    return this.getTimestamps().length >= RATE_LIMIT_MAX;
  }

  hasAlreadySubmitted(source = 'default'): boolean {
    if (!this.isBrowser) return false;
    const key = source === 'default' ? SUBMITTED_KEY : `${SUBMITTED_KEY}_${source}`;
    return localStorage.getItem(key) === 'true';
  }

  submit(data: EmailCaptureData): Observable<unknown> {
    const { serviceId, notificationTemplateId, confirmationTemplate, publicKey } =
      environment.emailjs;

    // Alta en MailerLite. El token vive server-side en la Netlify Function.
    // Es la FUENTE DE VERDAD del éxito de la suscripción. Guardamos también el
    // idioma para poder segmentar futuras campañas.
    const subscribe$ = this.http.post('/api/subscribe', {
      email:  data.email,
      source: data.source,
      lang:   data.lang,
    });

    // Notificación interna a Oriana — best-effort. Si EmailJS falla NO debe
    // abortar ni hacer fallar el alta: antes forkJoin([notify$, subscribe$])
    // cancelaba la request HTTP en vuelo al rechazar EmailJS, y esa cancelación
    // (HttpClient con withFetch) era el "AbortError: signal is aborted without
    // reason" — el usuario veía error aunque el alta hubiera entrado.
    const notify$ = from(
      emailjs.send(
        serviceId,
        notificationTemplateId,
        {
          subscriber_email: data.email,
          source_label:     SOURCE_LABELS[data.source] ?? data.source,
          lang:             data.lang,
        },
        publicKey,
      ),
    ).pipe(catchError(() => of(null)));

    // Bienvenida + guía gratis al suscriptor, en su idioma. Una sola acción para
    // "unirse a la comunidad" y "guía gratis". Best-effort: no debe romper el
    // alta. pt usa la plantilla ES (mismo público LATAM).
    const confirmTemplateId =
      data.lang === 'en' ? confirmationTemplate.en : confirmationTemplate.es;
    const confirm$ = from(
      emailjs.send(
        serviceId,
        confirmTemplateId,
        {
          to_email:        data.email,     // destinatario = el suscriptor ({{to_email}})
          gift_url:        `${GUIDE_PAGE_URL}?lang=${data.lang === 'en' ? 'en' : 'es'}`, // guía en su idioma
          unsubscribe_url: `${UNSUBSCRIBE_PAGE_URL}?email=${encodeURIComponent(data.email)}&lang=${data.lang === 'en' ? 'en' : 'es'}`,
          source_label:    SOURCE_LABELS[data.source] ?? data.source,
        },
        publicKey,
      ),
    ).pipe(catchError(() => of(null)));

    return forkJoin([subscribe$, notify$, confirm$]).pipe(
      map(([subscribeResult]) => subscribeResult),
      tap({
        next:  () => this.analytics.track('email_capture_submit', { source: data.source }),
        error: () => this.analytics.track('email_capture_error',  { source: data.source }),
      }),
    );
  }

  recordSubmission(source = 'default'): void {
    const key = source === 'default' ? SUBMITTED_KEY : `${SUBMITTED_KEY}_${source}`;
    const timestamps = this.getTimestamps();
    timestamps.push(Date.now());
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(timestamps));
    localStorage.setItem(key, 'true');
  }

  private getTimestamps(): number[] {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const all: number[] = stored ? (JSON.parse(stored) as number[]) : [];
    const now = Date.now();
    return all.filter(t => now - t < RATE_LIMIT_WINDOW);
  }
}
