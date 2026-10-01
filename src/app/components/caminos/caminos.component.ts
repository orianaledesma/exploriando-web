import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';
import { TRANSLATIONS } from '../../translations/translations';
import { RevealDirective } from '../../directives/reveal.directive';

/** Curso de español argentino. Marca aparte, así que el destino es externo. */
export const LATINA_CONNECTION_URL = 'https://latinaconnection.info/';

/** Los cuatro caminos. El id es la clave que une destino con copy traducido. */
export type CaminoId = 'viajar' | 'crear' | 'espanol' | 'marca';

interface Destino {
  readonly id: CaminoId;
  readonly icon: string;
  /** `route` usa routerLink; `external` sale del sitio en pestaña nueva. */
  readonly kind: 'route' | 'external';
  readonly href: string;
  /** Marca la tarjeta con el acento cálido: no es un destino de Exploriando. */
  readonly foreign?: boolean;
}

const DESTINOS: readonly Destino[] = [
  { id: 'viajar',  icon: '🗺️', kind: 'route',    href: '/mapa' },
  { id: 'crear',   icon: '🎬', kind: 'route',    href: '/viajero-creador' },
  { id: 'espanol', icon: '💬', kind: 'external', href: LATINA_CONNECTION_URL, foreign: true },
  { id: 'marca',   icon: '📣', kind: 'route',    href: '/marcas' },
];

/**
 * Ruteador por audiencia, arriba de la home.
 *
 * La home servía cuatro intenciones distintas (viajar, crear contenido,
 * aprender español, contratar) obligando a scrollear para encontrar la propia.
 * Esto las pone a la vista en el primer pantallazo.
 *
 * Reemplaza a los teasers de Viajero Creador y Latina Connection, que quedaron
 * desmontados del landing: si el ruteador manda a los mismos destinos que unas
 * secciones más abajo, el visitante ve todo dos veces y el scroll no decide
 * nada. Esas tarjetas son ahora la única puerta.
 */
@Component({
  selector: 'app-caminos',
  templateUrl: './caminos.component.html',
  styleUrl: './caminos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RevealDirective],
})
export class CaminosComponent {
  private readonly lang = inject(LanguageService);
  private readonly analytics = inject(AnalyticsService);

  readonly t = computed(() => TRANSLATIONS[this.lang.current()].caminos);

  /** Destino + copy del idioma activo, unidos por id. */
  readonly cards = computed(() =>
    DESTINOS.map((destino) => ({ ...destino, ...this.t()[destino.id] })),
  );

  /** Tracking: qué intención eligió el visitante. */
  onCardClick(id: CaminoId): void {
    this.analytics.track('camino_click', { camino: id });
  }
}
