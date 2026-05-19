import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

export type ConsentStatus = 'unset' | 'granted' | 'denied';

const STORAGE_KEY = 'exploriando_cookie_consent';

/**
 * GDPR cookie consent. Analytics is denied by default (Consent Mode v2
 * default set in index.html); this service flips `analytics_storage` to
 * 'granted' only when the user accepts, and persists the choice.
 *
 * SSR-safe: no window/localStorage access on the server (status stays
 * 'unset' during prerender, the banner is decided client-side).
 */
@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly doc = inject(DOCUMENT);

  readonly status = signal<ConsentStatus>(this.read());

  /**
   * True while the user hasn't decided yet — the banner shows.
   * Always false on the server so the banner is never prerendered
   * (decided client-side → no hydration mismatch).
   */
  readonly needsDecision = signal(this.isBrowser && this.read() === 'unset');

  accept(): void {
    this.set('granted');
    this.updateGtagConsent('granted');
  }

  reject(): void {
    this.set('denied');
    this.updateGtagConsent('denied');
  }

  private set(value: ConsentStatus): void {
    this.status.set(value);
    this.needsDecision.set(false);
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* storage unavailable — consent applies for this session only */
    }
  }

  private read(): ConsentStatus {
    if (!this.isBrowser) return 'unset';
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return v === 'granted' || v === 'denied' ? v : 'unset';
    } catch {
      return 'unset';
    }
  }

  /** Re-applies a previously granted choice on app start (Consent Mode update). */
  applyStoredConsent(): void {
    const s = this.read();
    if (s === 'granted') this.updateGtagConsent('granted');
  }

  private updateGtagConsent(state: 'granted' | 'denied'): void {
    if (!this.isBrowser) return;
    const w = this.doc.defaultView as (Window & {
      gtag?: (...args: unknown[]) => void;
    }) | null;
    try {
      w?.gtag?.('consent', 'update', {
        analytics_storage: state,
        ad_storage: state,
        ad_user_data: state,
        ad_personalization: state,
      });
    } catch {
      /* gtag not loaded (adblock/SSR) — no-op */
    }
  }
}
