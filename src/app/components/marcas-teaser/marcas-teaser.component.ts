import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';
import { TRANSLATIONS } from '../../translations/translations';
import { RevealDirective } from '../../directives/reveal.directive';

/**
 * Teaser B2B en el landing del viajero. NO vende acá: solo capta a la marca
 * que cayó en la home y la deriva a `/marcas` (la única casa del B2B).
 * Decisión auditoría 2026-05-18: sacar la sección UGC completa del funnel
 * viajero y dejar este puente de 1 frase + 1 CTA.
 */
@Component({
  selector: 'app-marcas-teaser',
  templateUrl: './marcas-teaser.component.html',
  styleUrl: './marcas-teaser.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RevealDirective],
})
export class MarcasTeaserComponent {
  private readonly lang = inject(LanguageService);
  private readonly analytics = inject(AnalyticsService);

  readonly t = computed(() => TRANSLATIONS[this.lang.current()].marcasTeaser);

  /** Tracking: el viajero/visita derivó al flujo B2B desde el landing. */
  onCtaClick(): void {
    this.analytics.track('marcas_teaser_click');
  }
}
