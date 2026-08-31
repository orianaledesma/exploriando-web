import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';
import { TRANSLATIONS } from '../../translations/translations';
import { RevealDirective } from '../../directives/reveal.directive';

/**
 * Teaser de Viajero Creador en la home. Decisión Ori 2026-08-31: la sección
 * pasó a ser pestaña propia (`/viajero-creador`), así que acá quedan sólo
 * título + 1 párrafo + CTA — mismo puente de una frase que `marcas-teaser`.
 * Todo el contenido (temas, playlist gratis, curso, sesiones 1:1) vive en la
 * página.
 */
@Component({
  selector: 'app-viajero-creador',
  templateUrl: './viajero-creador.component.html',
  styleUrl: './viajero-creador.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RevealDirective],
})
export class ViajeroCreadorComponent {
  private readonly lang      = inject(LanguageService);
  private readonly analytics = inject(AnalyticsService);

  readonly t = computed(() => TRANSLATIONS[this.lang.current()].viajeroCreador);

  /** Tracking: el visitante de la home entró al flujo de creador. */
  onCtaClick(): void {
    this.analytics.track('viajero_creador_teaser_click');
  }
}
