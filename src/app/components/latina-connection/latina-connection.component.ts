import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';
import { TRANSLATIONS } from '../../translations/translations';
import { RevealDirective } from '../../directives/reveal.directive';

/** Destino del CTA. Marca aparte, así que sale del sitio. */
export const LATINA_CONNECTION_URL = 'https://latinaconnection.info/';

/**
 * Banda de cross-promo a Latina Connection.
 *
 * No es un producto de Exploriando: es otra marca de Ori, y por eso la banda
 * es compacta y de una sola acción — no compite con asesorías ni con Viajero
 * Creador, que sí son el funnel propio. Se muestra en los tres idiomas; el
 * curso se dicta en inglés y el copy de ES/PT lo aclara antes del clic.
 */
@Component({
  selector: 'app-latina-connection',
  templateUrl: './latina-connection.component.html',
  styleUrl: './latina-connection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
})
export class LatinaConnectionComponent {
  private readonly lang = inject(LanguageService);
  private readonly analytics = inject(AnalyticsService);

  readonly t = computed(() => TRANSLATIONS[this.lang.current()].latinaConnection);

  readonly url = LATINA_CONNECTION_URL;

  /** Tracking: salida desde Exploriando hacia la otra marca. */
  onCtaClick(): void {
    this.analytics.track('latina_connection_click', { lang: this.lang.current() });
  }
}
