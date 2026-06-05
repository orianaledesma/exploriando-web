import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import emailjs from '@emailjs/browser';
import { forkJoin, from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { EmailCaptureData } from '../models/email-capture.model';
import { AnalyticsService } from './analytics.service';

const RATE_LIMIT_KEY    = 'email_submissions';
const RATE_LIMIT_MAX    = 3;
const RATE_LIMIT_WINDOW = 10 * 60 * 1000;
const SUBMITTED_KEY     = 'email_submitted';

export const GIFT_DRIVE_URL =
  'https://drive.google.com/file/d/1E0U4zTIWCXmZjXQdV8zAFAj95HQ6MsJ5/view';

const SOURCE_LABELS: Record<EmailCaptureData['source'], string> = {
  'hero':               'Hero — Comunidad',
  'recursos':           'Recursos — Guía gratuita',
  'footer':             'Footer — CTA final',
  'viajero-creador':    'Viajero Creador — Waitlist',
  'guia':               'Página /guia — Lectura completa',
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
    const { serviceId, notificationTemplateId, publicKey } =
      environment.emailjs;

    // Notificación interna — avisa a Oriana del nuevo suscriptor
    const notify$ = from(
      emailjs.send(
        serviceId,
        notificationTemplateId,
        {
          subscriber_email: data.email,
          source_label:     SOURCE_LABELS[data.source] ?? data.source,
        },
        publicKey,
      ),
    );

    // Alta en MailerLite (lista + doble opt-in/bienvenida los maneja
    // MailerLite). El token vive server-side en la Netlify Function.
    const subscribe$ = this.http.post('/api/subscribe', {
      email:  data.email,
      source: data.source,
    });

    return forkJoin([notify$, subscribe$]).pipe(
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
