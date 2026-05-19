import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COUNTRIES, Place } from '../../data/places';
import { CONTINENT_PATHS } from '../../data/world-map.paths';
import { projectLngLat } from '../../data/world-map.projection';
import { LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';
import { TRANSLATIONS } from '../../translations/translations';

interface ProjectedMarker {
  readonly slug:        string;
  readonly citySlug:    string;
  readonly city:        string;
  readonly country:     string;
  readonly countryCode: string;
  readonly countrySlug: string;
  readonly x:           number;
  readonly y:           number;
}

/**
 * Mapa SVG inline del mundo con markers a nivel ciudad.
 *
 * Comportamiento por viewport:
 * - Mobile / coarse pointer: SVG es 100% decorativo (markers sin pointer-events).
 *   La nav real vive en `<app-country-nav-list>` debajo.
 * - Desktop / fine pointer: cada marker es un `<a>` que navega a
 *   `/mapa/[country-slug]/[city-slug]` con tooltip on hover/focus.
 *
 * Reemplaza al Leaflet anterior. El SVG inline es ~6.4kb y no requiere
 * librerías externas ni tiles ni hidratación. Las paths viven en
 * `data/world-map.paths.ts` y los markers se proyectan en runtime con
 * `projectLngLat` desde `data/world-map.projection.ts`.
 */
@Component({
  selector: 'app-world-map-svg',
  templateUrl: './world-map-svg.component.html',
  styleUrl: './world-map-svg.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class WorldMapSvgComponent {
  private readonly lang = inject(LanguageService);
  private readonly analytics = inject(AnalyticsService);

  /** Lista de lugares a renderizar. Solo se muestran los que tengan `coords`. */
  readonly places = input.required<Place[]>();

  /** Si está seteado, los markers de ese país lucen en color full y el resto a opacity 0.4. */
  readonly activeCountryCode = input<string | null>(null);

  /** Variante visual con dots más chicos, pensado para uso embebido en MapaTeaser. */
  readonly compact = input<boolean>(false);

  readonly continentPaths = CONTINENT_PATHS;

  readonly markers = computed<ProjectedMarker[]>(() => {
    return this.places()
      .filter(p => p.coords !== undefined)
      .map(p => {
        const country = COUNTRIES[p.countryCode];
        const [lat, lng] = p.coords as [number, number];
        const { x, y } = projectLngLat(lng, lat);
        return {
          slug:        `${p.countryCode}-${p.slug}`,
          citySlug:    p.slug,
          city:        p.city,
          country:     country?.name ?? p.countryCode,
          countryCode: p.countryCode,
          countrySlug: country?.slug ?? p.countryCode.toLowerCase(),
          x,
          y,
        };
      });
  });

  readonly t = computed(() => TRANSLATIONS[this.lang.current()].mapa);

  /**
   * aria-label del SVG, derivado de los markers reales (no hardcodeado).
   * Soporta `{cities}` y `{countries}` en la traducción → nunca se desincroniza
   * cuando se suman ciudades/países a `data/places.ts`.
   */
  readonly mapAriaLabel = computed(() => {
    const m = this.markers();
    const countries = new Set(m.map(x => x.countryCode)).size;
    return this.t().mapAriaLabel
      .replace('{cities}', String(m.length))
      .replace('{countries}', String(countries));
  });

  /** Devuelve el tooltip i18n con interpolación `{city}` / `{country}`. */
  tooltip(m: ProjectedMarker): string {
    return this.t().markerTooltip.replace('{city}', m.city).replace('{country}', m.country);
  }

  /** Devuelve el aria-label i18n del marker. */
  ariaLabel(m: ProjectedMarker): string {
    return this.t().markerAriaLabel.replace('{city}', m.city).replace('{country}', m.country);
  }

  /** Returns true si el marker pertenece al país marcado como activo. */
  isActive(m: ProjectedMarker): boolean {
    const active = this.activeCountryCode();
    return active === null || active === m.countryCode;
  }

  /** Tracking: click en marker (intent: ese país/ciudad despertó interés). */
  onMarkerClick(m: ProjectedMarker): void {
    this.analytics.track('marker_click', {
      country_code: m.countryCode,
      city_slug:    m.citySlug,
    });
  }
}
