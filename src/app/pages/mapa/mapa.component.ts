import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import {
  cityCountByCountry,
  CountryMeta,
  PLACES,
  visitedCountries,
} from '../../data/places';
import { LanguageService } from '../../services/language.service';
import { TRANSLATIONS } from '../../translations/translations';
import { WorldMapSvgComponent } from '../../components/world-map-svg/world-map-svg.component';
import { CountryNavListComponent } from '../../components/country-nav-list/country-nav-list.component';

/**
 * Página /mapa — vista completa del mapa de viajes de Oriana.
 *
 * Reemplazo completo de Leaflet por SVG estilizado (decisión 2026-04-30).
 * - Mobile: SVG decorativo + lista de países como nav real.
 * - Desktop con pointer fino: SVG con markers interactivos + lista en sidebar.
 *
 * El navegar a un país desde la lista lleva a `/mapa/:country` (ruta a crear
 * en Sprint 3 — por ahora cae en el catch-all de routes).
 */
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [WorldMapSvgComponent, CountryNavListComponent],
})
export class MapaComponent {
  private readonly lang = inject(LanguageService);

  readonly t = computed(() => TRANSLATIONS[this.lang.current()].mapa);

  readonly places = PLACES;
  readonly countries = computed<readonly CountryMeta[]>(() => visitedCountries());
  readonly cityCounts = computed(() => cityCountByCountry());
  readonly stats = computed(() => ({
    countries: this.countries().length,
    places:    PLACES.length,
  }));

  readonly titleEl = viewChild<ElementRef<HTMLHeadingElement>>('pageTitle');

  constructor() {
    // Focus management al cargar la página: mover el focus al H1 para que
    // los usuarios de teclado y screen readers oigan el cambio de ruta.
    afterNextRender(() => {
      const el = this.titleEl()?.nativeElement;
      if (el) {
        el.setAttribute('tabindex', '-1');
        el.focus({ preventScroll: false });
      }
    });
  }
}
