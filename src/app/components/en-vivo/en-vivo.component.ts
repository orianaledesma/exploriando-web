import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';
import { TRANSLATIONS } from '../../translations/translations';
import { RevealDirective } from '../../directives/reveal.directive';

/** Canal donde ocurre el vivo diario de cocina. */
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@Exploriando/live';

/**
 * Frame de un vivo real, sin extensión: se sirve `.webp` con fallback `.jpg`.
 * Cambiar esta ruta es TODO lo necesario para reemplazarlo por otro frame.
 * Vacío = el bloque no rinde la figura y queda sólo el texto centrado.
 */
const LIVE_FRAME_SRC = '/assets/images/en-vivo-frame';

/**
 * Bloque "En vivo": el programa diario de cocina, arriba de todo en el funnel
 * del viajero. El nombre del programa y el horario exacto todavía no están
 * definidos — viven en `enVivo.sectionLabel` / `enVivo.headline` para poder
 * cambiarlos sin tocar el componente.
 */
@Component({
  selector: 'app-en-vivo',
  templateUrl: './en-vivo.component.html',
  styleUrl: './en-vivo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
})
export class EnVivoComponent {
  private readonly lang = inject(LanguageService);
  private readonly analytics = inject(AnalyticsService);

  readonly t = computed(() => TRANSLATIONS[this.lang.current()].enVivo);
  readonly channelUrl = YOUTUBE_CHANNEL_URL;
  readonly frameSrc   = LIVE_FRAME_SRC;

  onCtaClick(): void {
    this.analytics.track('en_vivo_click');
  }
}
