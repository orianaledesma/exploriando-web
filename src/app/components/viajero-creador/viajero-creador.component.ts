import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';
import { TRANSLATIONS } from '../../translations/translations';
import { RevealDirective } from '../../directives/reveal.directive';

// Modelo confirmado por Oriana (auditoría 2026-05-18): el contenido educativo
// es GRATIS en YouTube a propósito (monetiza el canal vía watch hours). El
// único producto pago son las sesiones 1:1. Se eliminó la waitlist (un
// "programa pago" contradecía el modelo de canal gratuito).
// Playlist del curso gratuito (no el canal a secas) — Ori la quiere apuntada
// directo al curso para maximizar watch time de esa lista.
const YOUTUBE_URL =
  'https://www.youtube.com/watch?v=Ireh_4z2DGc&list=PLjZ30HHREgvqeMNLcj36yBabdMVw_fAwa';

// Calendly: un solo event type para todo (plan pago). El query param `a1`
// prellena la pregunta custom → Oriana ve EXACTAMENTE qué sesión eligió
// el usuario en el email de aviso (1 sesión vs pack de 3).
const BOOKING_BASE = 'https://calendly.com/orianaledesma/asesoria-exploriando';

@Component({
  selector: 'app-viajero-creador',
  templateUrl: './viajero-creador.component.html',
  styleUrl: './viajero-creador.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
})
export class ViajeroCreadorComponent {
  private readonly lang      = inject(LanguageService);
  private readonly analytics = inject(AnalyticsService);

  readonly t          = computed(() => TRANSLATIONS[this.lang.current()].viajeroCreador);
  readonly youtubeUrl = YOUTUBE_URL;

  /**
   * URL de Calendly que lleva, en el tag `a1`, qué sesión eligió el usuario
   * (ej. "Asesoría 1:1 — Sesión individual (USD 150)") para que Oriana lo
   * sepa antes de la llamada.
   */
  bookingUrl(detail: string): string {
    return `${BOOKING_BASE}?a1=${encodeURIComponent('Asesoría 1:1 — ' + detail)}`;
  }

  /** Tracking: click al canal de YouTube (objetivo real: watch hours). */
  onYoutubeClick(): void {
    this.analytics.track('viajero_creador_youtube_click');
  }

  /** Tracking: click a reservar sesión 1:1 (único producto pago). */
  onSessionClick(): void {
    this.analytics.track('viajero_creador_session_click');
  }
}
