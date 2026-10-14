import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';
import { TRANSLATIONS } from '../../translations/translations';
import { RevealDirective } from '../../directives/reveal.directive';

/**
 * "Apoyá el proyecto", casi al final de la home. Es la única puerta a /apoyo
 * desde el sitio: la página no está en el nav (decisión Ori 2026-10-14).
 * Mismo formato que `MarcasTeaserComponent`: 1 frase + 1 CTA.
 */
@Component({
  selector: 'app-apoyo-teaser',
  templateUrl: './apoyo-teaser.component.html',
  styleUrl: './apoyo-teaser.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RevealDirective],
})
export class ApoyoTeaserComponent {
  private readonly lang = inject(LanguageService);
  private readonly analytics = inject(AnalyticsService);

  readonly t = computed(() => TRANSLATIONS[this.lang.current()].apoyo.teaser);

  onCtaClick(): void {
    this.analytics.track('apoyo_teaser_click');
  }
}
