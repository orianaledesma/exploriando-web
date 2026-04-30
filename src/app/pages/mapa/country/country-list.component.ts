import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { COUNTRIES, CountryMeta, Place, placesOfCountry } from '../../../data/places';
import { LanguageService } from '../../../services/language.service';
import { TRANSLATIONS } from '../../../translations/translations';

type CountryListStatus = 'ok' | 'invalid-slug' | 'pending-content';

/**
 * Página `/mapa/:country` — listado de ciudades de un país.
 *
 * Tres estados posibles:
 * - `ok`: país válido con ciudades — renderiza header + grid + footer CTAs.
 * - `invalid-slug`: el slug no existe en COUNTRIES — empty state "no estuve".
 * - `pending-content`: país añadido a COUNTRIES pero sin places aún — empty
 *   state "todavía está cocinándose" + CTA al newsletter.
 *
 * Click en city-card lleva a `/mapa/:country/:city` (blog post).
 */
@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class CountryListComponent {
  private readonly lang = inject(LanguageService);

  /** Slug del país, viene del route param `:country`. */
  readonly country = input.required<string>();

  readonly t = computed(() => TRANSLATIONS[this.lang.current()].countryList);

  readonly meta = computed<CountryMeta | null>(() => {
    const slug = this.country();
    return Object.values(COUNTRIES).find(c => c.slug === slug) ?? null;
  });

  readonly cities = computed<Place[]>(() => {
    const m = this.meta();
    return m ? placesOfCountry(m.code) : [];
  });

  readonly status = computed<CountryListStatus>(() => {
    if (this.meta() === null) return 'invalid-slug';
    if (this.cities().length === 0) return 'pending-content';
    return 'ok';
  });

  /** Texto del pill 1 (ciudades grabadas) con plural correcto + número resaltado. */
  readonly statsCitiesText = computed(() => {
    const n = this.cities().length;
    const tpl = n === 1 ? this.t().statsCitiesOne : this.t().statsCitiesOther;
    return tpl.replace('{count}', `<strong>${n}</strong>`);
  });

  /** Texto del pill 2 (videos). Asume 1 video por place (cada city tiene un youtubeId). */
  readonly statsVideosText = computed(() => {
    const n = this.cities().length;
    const tpl = n === 1 ? this.t().statsVideosOne : this.t().statsVideosOther;
    return tpl.replace('{count}', `<strong>${n}</strong>`);
  });

  /** Reemplaza `{country}` en strings de traducción. */
  fillCountry(template: string): string {
    const name = this.meta()?.name ?? '';
    return template.replace('{country}', name);
  }

  /** URL del thumbnail mqdefault de YouTube (320x180). */
  thumbnailUrl(youtubeId: string): string {
    return `https://i.ytimg.com/vi/${youtubeId}/mqdefault.jpg`;
  }

  /**
   * Si falla la carga del thumbnail (video privado/eliminado, red caída, etc.),
   * marcamos el contenedor con `.thumb-error` para que el CSS muestre el
   * fallback de bandera grande sobre gradient.
   */
  onThumbError(e: Event): void {
    const target = e.target as HTMLElement;
    target.closest('.city-card__thumb')?.classList.add('thumb-error');
  }

  // ─── Focus management ────────────────────────────────────────────────────
  readonly titleEl = viewChild<ElementRef<HTMLHeadingElement>>('pageTitle');

  constructor() {
    afterNextRender(() => {
      const el = this.titleEl()?.nativeElement;
      if (el) {
        el.setAttribute('tabindex', '-1');
        el.focus({ preventScroll: false });
      }
    });
  }
}
