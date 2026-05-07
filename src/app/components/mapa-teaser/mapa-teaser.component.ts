import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';
import { TRANSLATIONS } from '../../translations/translations';
import { RevealDirective } from '../../directives/reveal.directive';
import {
  cityCountByCountry,
  CountryMeta,
  PLACES,
  visitedCountries,
} from '../../data/places';

/**
 * Teaser de la página /mapa para incluir en la landing.
 * Muestra stats + grid de country cards (12). Click en una card lleva
 * a `/mapa/:country` (listado de ciudades del país).
 *
 * Decisión 2026-04-30 (post-Sprint 2): el SVG decorativo y la slim list
 * fueron movidos exclusivamente a /mapa. El landing usa el grid de country
 * cards porque es el patrón visual que Oriana prefirió.
 */
@Component({
  selector: 'app-mapa-teaser',
  templateUrl: './mapa-teaser.component.html',
  styleUrl: './mapa-teaser.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RevealDirective],
})
export class MapaTeaserComponent {
  private readonly lang = inject(LanguageService);
  private readonly analytics = inject(AnalyticsService);

  readonly t = computed(() => TRANSLATIONS[this.lang.current()].mapaTeaser);
  readonly tMapa = computed(() => TRANSLATIONS[this.lang.current()].mapa);

  readonly countries = computed<readonly CountryMeta[]>(() => visitedCountries());
  readonly cityCounts = computed(() => cityCountByCountry());
  readonly stats = computed(() => ({
    countries: this.countries().length,
    places:    PLACES.length,
  }));

  /** Cantidad de ciudades de un país. */
  countOf(code: string): number {
    return this.cityCounts()[code] ?? 0;
  }

  /** Devuelve "ciudad" o "ciudades" según el count. */
  citySuffix(count: number): string {
    return count === 1 ? this.tMapa().citiesCountSuffixOne : this.tMapa().citiesCountSuffix;
  }

  /** Tracking: click en card de país (intent: ver guías de ese país). */
  onCountryCardClick(country: CountryMeta): void {
    this.analytics.track('country_card_click', {
      country_code: country.code,
      country_slug: country.slug,
    });
  }

  /** Tracking: click en CTA "Explorar las guías" (intent: ver el mapa completo). */
  onCtaClick(): void {
    this.analytics.track('mapa_cta_click');
  }
}
