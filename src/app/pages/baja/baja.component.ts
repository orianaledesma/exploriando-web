import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { LanguageService } from '../../services/language.service';
import { Lang, SUPPORTED_LANGS } from '../../models/language.model';

type BajaStatus = 'idle' | 'loading' | 'success' | 'error' | 'no-email';

/** Copy bilingüe (pt usa es). Página chica y privada → copy inline. */
const COPY = {
  es: {
    title:   'Darte de baja',
    intro:   'Vas a dejar de recibir los emails de Exploriando. ¿Confirmás?',
    confirm: 'Confirmar baja',
    keep:    'Mejor me quedo',
    loading: 'Procesando…',
    success: '¡Listo! Te diste de baja. No vas a recibir más correos. 👋',
    error:   'No pudimos procesar la baja. Probá de nuevo o escribinos a exploriando.info@gmail.com.',
    noEmail: 'Falta el email en el link. Escribinos a exploriando.info@gmail.com y te damos de baja.',
    back:    '← Volver al inicio',
  },
  en: {
    title:   'Unsubscribe',
    intro:   "You'll stop receiving Exploriando emails. Confirm?",
    confirm: 'Confirm unsubscribe',
    keep:    "I'll stay",
    loading: 'Processing…',
    success: "Done — you've been unsubscribed. You won't get more emails. 👋",
    error:   "We couldn't process it. Try again or email us at exploriando.info@gmail.com.",
    noEmail: "The email is missing from the link. Email us at exploriando.info@gmail.com and we'll remove you.",
    back:    '← Back to home',
  },
};

@Component({
  selector: 'app-baja',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <main class="container baja">
      <a routerLink="/" class="baja__back">{{ t().back }}</a>
      <h1>{{ t().title }}</h1>

      @switch (status()) {
        @case ('no-email') {
          <p class="baja__msg">{{ t().noEmail }}</p>
        }
        @case ('success') {
          <p class="baja__msg baja__msg--ok">{{ t().success }}</p>
        }
        @default {
          <p class="baja__msg">{{ t().intro }}</p>
          @if (status() === 'error') {
            <p class="baja__msg baja__msg--err" role="alert">{{ t().error }}</p>
          }
          <div class="baja__actions">
            <button type="button" class="btn btn--primary btn--lg"
                    [disabled]="status() === 'loading'"
                    (click)="confirm()">
              {{ status() === 'loading' ? t().loading : t().confirm }}
            </button>
            <a routerLink="/" class="baja__keep">{{ t().keep }}</a>
          </div>
        }
      }
    </main>
  `,
  styles: [`
    .baja {
      padding: var(--space-2xl) var(--space-md);
      max-width: 560px;
      min-height: 60vh;
    }
    .baja__back {
      font-size: var(--text-sm);
      display: inline-block;
      margin-bottom: var(--space-md);
    }
    .baja__msg {
      font-size: var(--text-lg);
      color: var(--color-text-muted);
      margin-top: var(--space-md);
      line-height: 1.6;
    }
    .baja__msg--ok  { color: var(--color-accent-fresh); }
    .baja__msg--err { color: var(--color-error, var(--color-accent)); }
    .baja__actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-md);
      margin-top: var(--space-xl);
    }
    .baja__keep { font-size: var(--text-sm); }
  `],
})
export class BajaComponent {
  private readonly lang  = inject(LanguageService);
  private readonly http  = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);

  readonly t = computed(() => (this.lang.current() === 'en' ? COPY.en : COPY.es));

  /** Email del suscriptor, tomado del query param del link del email. */
  private readonly email = this.route.snapshot.queryParamMap.get('email')?.trim().toLowerCase() ?? '';

  readonly status = signal<BajaStatus>(this.email ? 'idle' : 'no-email');

  constructor() {
    // El link puede traer `?lang=es|en` para mostrar la página en su idioma.
    const langParam = this.route.snapshot.queryParamMap.get('lang') as Lang | null;
    if (langParam && SUPPORTED_LANGS.includes(langParam)) {
      this.lang.set(langParam);
    }
    // Privada: nunca indexar.
    inject(Meta).updateTag({ name: 'robots', content: 'noindex, nofollow' });
  }

  /** Confirma la baja (acción explícita → no se dispara con prefetch del email). */
  confirm(): void {
    if (this.status() === 'loading' || !this.email) return;
    this.status.set('loading');
    this.http.post('/api/unsubscribe', { email: this.email }).subscribe({
      next:  () => this.status.set('success'),
      error: () => this.status.set('error'),
    });
  }
}
