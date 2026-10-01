import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';
import { YOUTUBE_LIVE_URL } from '../../data/links';
import { TRANSLATIONS } from '../../translations/translations';

/**
 * Hero de la home.
 *
 * Dejó de capturar email (2026-10-01): el formulario, con su honeypot, rate
 * limit, estados de error y pantalla de éxito con la guía de regalo, se
 * removió a pedido de Ori para que la portada mande al vivo, que es donde más
 * se encuentra con su audiencia. La captura sigue viva en el footer
 * (#comunidad-form) y en /guia.
 *
 * El titular viene partido en dos campos: la segunda mitad se rinde en
 * itálica y con el color de acento.
 */
@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class HeroComponent {
  private readonly lang = inject(LanguageService);
  private readonly analytics = inject(AnalyticsService);

  readonly t = computed(() => TRANSLATIONS[this.lang.current()].hero);

  readonly liveUrl = YOUTUBE_LIVE_URL;

  /** Tracking: salida al vivo desde el hero. */
  onLiveClick(): void {
    this.analytics.track('en_vivo_click', { location: 'hero' });
  }
}
