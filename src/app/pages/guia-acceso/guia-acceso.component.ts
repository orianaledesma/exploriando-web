import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

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
    <main class="container" style="padding: var(--space-2xl) 0; max-width: 760px;">
      <a routerLink="/" style="font-size: var(--text-sm);">← Volver al inicio</a>
      <h1>Tu guía de viaje</h1>
      <p class="text-muted">
        Acceso confirmado. Esta es tu copia privada — no la compartas, es para vos.
      </p>

      <!-- TODO(contenido): Oriana produce la guía. Opciones:
           (a) pegar el cuerpo acá, o
           (b) cargarla desde /assets/content/guia.md y renderizar con marked
               (mismo patrón que BlogContentService). -->
      <section style="margin-top: var(--space-xl);">
        <p>La guía estará disponible acá. (Contenido en producción.)</p>
      </section>
    </main>
  `,
})
export class GuiaAccesoComponent {
  constructor() {
    // Página privada: nunca indexar ni seguir.
    inject(Meta).updateTag({ name: 'robots', content: 'noindex, nofollow' });
  }
}
