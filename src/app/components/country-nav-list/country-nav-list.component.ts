import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CountryMeta } from '../../data/places';
import { LanguageService } from '../../services/language.service';
import { TRANSLATIONS } from '../../translations/translations';

/**
 * Lista de países visitados como nav. Cada item es un `<a>` full-width que
 * lleva a `/mapa/[country-slug]` (ruta a crear en Sprint 3).
 *
 * Es la nav real en mobile (donde el SVG es decorativo) y un sidebar
 * permanente en desktop al lado del mapa.
 */
@Component({
  selector: 'app-country-nav-list',
  templateUrl: './country-nav-list.component.html',
  styleUrl: './country-nav-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class CountryNavListComponent {
  private readonly lang = inject(LanguageService);

  /** Lista de países a mostrar (en el orden recibido). */
  readonly countries = input.required<readonly CountryMeta[]>();

  /** Mapa `{ARG: 7, COL: 3, ...}` con la cantidad de ciudades por país. */
  readonly cityCounts = input<Record<string, number>>({});

  readonly t = computed(() => TRANSLATIONS[this.lang.current()].mapa);

  /** Devuelve la cantidad de ciudades del país, 0 si no está en el map. */
  countOf(code: string): number {
    return this.cityCounts()[code] ?? 0;
  }

  /** Devuelve "ciudad" o "ciudades" según el count para evitar "1 ciudades". */
  citySuffix(count: number): string {
    return count === 1 ? this.t().citiesCountSuffixOne : this.t().citiesCountSuffix;
  }

  /** aria-label completo: "Ver guías de Argentina, 7 ciudades". */
  ariaLabelFor(country: CountryMeta): string {
    const n = this.countOf(country.code);
    return `${this.t().markerAriaLabel
      .replace('{city}', `${n} ${this.citySuffix(n)}`)
      .replace('{country}', country.name)}`;
  }
}
