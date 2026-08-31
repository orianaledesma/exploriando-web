import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';
import { TRANSLATIONS } from '../../translations/translations';
import { RevealDirective } from '../../directives/reveal.directive';

// Calendly: un solo event type para todo (plan pago). El query param `a1`
// prellena la pregunta custom → Oriana ve EXACTAMENTE qué sesión eligió
// el usuario en el email de aviso (1 sesión vs pack de 3).
const BOOKING_BASE = 'https://calendly.com/orianaledesma/asesoria-exploriando';

/**
 * Asesorías 1:1 sobre el plan de viaje — único producto pago del lado viajero.
 * Estuvo un rato en /viajero-creador; volvió a la home (decisión Ori
 * 2026-08-31) porque es la oferta que tiene que ver quien aterriza.
 *
 * El copy sigue leyéndose de `viajeroCreador.sessions`: es el mismo texto,
 * no se renombró la clave para no tocar los 3 idiomas sin necesidad.
 */
@Component({
  selector: 'app-asesorias',
  templateUrl: './asesorias.component.html',
  styleUrl: './asesorias.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
})
export class AsesoriasComponent {
  private readonly lang      = inject(LanguageService);
  private readonly analytics = inject(AnalyticsService);

  readonly t = computed(() => TRANSLATIONS[this.lang.current()].viajeroCreador.sessions);

  /**
   * URL de Calendly que lleva, en el tag `a1`, qué sesión eligió el usuario
   * (ej. "Asesoría 1:1 — Sesión individual (USD 150)") para que Oriana lo
   * sepa antes de la llamada.
   */
  bookingUrl(detail: string): string {
    return `${BOOKING_BASE}?a1=${encodeURIComponent('Asesoría 1:1 — ' + detail)}`;
  }

  /** Tracking: click a reservar sesión 1:1. */
  onSessionClick(): void {
    this.analytics.track('viajero_creador_session_click');
  }
}
