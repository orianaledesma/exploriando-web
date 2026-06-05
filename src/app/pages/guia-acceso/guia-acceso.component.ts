import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DomSanitizer, Meta, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { Lang, SUPPORTED_LANGS } from '../../models/language.model';

/**
 * `/guia-acceso` — página privada de la guía. El link se entrega SOLO en el
 * email de bienvenida de MailerLite (no se linkea desde el sitio, no se
 * indexa, no entra al sitemap). Contenido a producir por Oriana.
 */
@Component({
  selector: 'app-guia-acceso',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <main class="container guia-acceso">
      <a routerLink="/" class="guia-acceso__back">← Volver al inicio</a>
      <h1>Tu guía de viaje</h1>
      <p class="text-muted">
        Acceso confirmado. Esta es tu copia privada — no la compartas, es para vos.
      </p>

      <div class="guia-acceso__actions">
        <a [href]="pdfUrl()" [attr.download]="pdfName()"
           class="btn btn--primary btn--lg">
          Descargar PDF ↓
        </a>
        <a [href]="pdfUrl()" target="_blank" rel="noopener"
           class="guia-acceso__open">
          Abrir en pestaña nueva ↗
        </a>
      </div>

      <iframe [src]="pdfSafeUrl()" class="guia-acceso__viewer"
              title="Vista previa de la guía de viaje"></iframe>
      <p class="text-muted guia-acceso__fallback">
        ¿No se ve el PDF acá? Es pesado —
        <a [href]="pdfUrl()" [attr.download]="pdfName()">descargalo</a>
        o <a [href]="pdfUrl()" target="_blank" rel="noopener">abrilo en otra pestaña</a>.
      </p>
    </main>
  `,
  styles: [`
    .guia-acceso {
      padding: var(--space-2xl) var(--space-md);
      max-width: 860px;
    }
    @media (min-width: 768px) {
      .guia-acceso { padding-left: 0; padding-right: 0; }
    }
    .guia-acceso__back {
      font-size: var(--text-sm);
      display: inline-block;
      margin-bottom: var(--space-md);
    }
    .guia-acceso__actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-md);
      margin: var(--space-lg) 0 var(--space-xl);
    }
    .guia-acceso__open {
      font-size: var(--text-sm);
    }
    .guia-acceso__viewer {
      width: 100%;
      height: 80vh;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      display: block;
    }
    .guia-acceso__fallback {
      font-size: var(--text-sm);
      margin-top: var(--space-sm);
    }
  `],
})
export class GuiaAccesoComponent {
  private readonly lang = inject(LanguageService);

  // PDF real por idioma. PT usa el ES (no hay versión PT todavía).
  readonly pdfUrl = computed(() =>
    this.lang.current() === 'en'
      ? '/assets/content/guias/guia-exploriando-en.pdf'
      : '/assets/content/guias/guia-exploriando-es.pdf',
  );
  readonly pdfName = computed(() =>
    this.lang.current() === 'en' ? 'guia-exploriando-en.pdf' : 'guia-exploriando-es.pdf',
  );

  // `<iframe [src]>` es contexto resource-URL → debe ir sanitizado o
  // Angular lanza NG0904 al prerenderizar.
  private readonly sanitizer = inject(DomSanitizer);
  readonly pdfSafeUrl = computed<SafeResourceUrl>(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl()),
  );

  constructor() {
    // El email de bienvenida linkea con `?lang=es|en` para forzar el idioma del
    // PDF, así un suscriptor EN que abre el mail en otro dispositivo igual ve la
    // guía en inglés (sin depender del idioma guardado en ese navegador).
    const langParam = inject(ActivatedRoute).snapshot.queryParamMap.get('lang') as Lang | null;
    if (langParam && SUPPORTED_LANGS.includes(langParam)) {
      this.lang.set(langParam);
    }

    // Página privada: nunca indexar ni seguir.
    inject(Meta).updateTag({ name: 'robots', content: 'noindex, nofollow' });
  }
}
