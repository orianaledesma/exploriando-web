import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import {
  COUNTRIES,
  CountryMeta,
  Place,
  findPlace,
  placesOfCountry,
} from '../../../data/places';
import {
  PlaceContent,
  PlaceContentService,
} from '../../../services/place-content.service';
import { LanguageService } from '../../../services/language.service';
import { TRANSLATIONS } from '../../../translations/translations';
import { LiteYoutubeComponent } from '../../../components/lite-youtube/lite-youtube.component';
import { BestMonthsGridComponent } from '../../../components/best-months-grid/best-months-grid.component';

interface RouteParams {
  countrySlug: string;
  citySlug:    string;
}

/**
 * Página individual de un lugar visitado: `/mapa/[country-slug]/[city-slug]`.
 * Carga el .md desde assets/, renderiza el cuerpo como HTML, embebe el video
 * de YouTube y muestra la grilla de mejor época para visitar.
 */
@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrl: './place.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LiteYoutubeComponent, BestMonthsGridComponent],
})
export class PlaceComponent {
  private readonly route        = inject(ActivatedRoute);
  private readonly contentSvc   = inject(PlaceContentService);
  private readonly lang         = inject(LanguageService);

  readonly t = computed(() => TRANSLATIONS[this.lang.current()].mapa);

  /** Slugs reactivos desde la URL (countrySlug + citySlug). */
  readonly params = toSignal(
    this.route.paramMap.pipe(
      map<unknown, RouteParams>(p => {
        const pm = p as { get(name: string): string | null };
        return {
          countrySlug: pm.get('country') ?? '',
          citySlug:    pm.get('city')    ?? '',
        };
      }),
    ),
    { initialValue: { countrySlug: '', citySlug: '' } as RouteParams },
  );

  /** Metadata estática del lugar — viene de places.ts. */
  readonly place = computed<Place | undefined>(() => {
    const { countrySlug, citySlug } = this.params();
    if (!countrySlug || !citySlug) return undefined;
    return findPlace(countrySlug, citySlug);
  });

  readonly country = computed<CountryMeta | undefined>(() => {
    const p = this.place();
    return p ? COUNTRIES[p.countryCode] : undefined;
  });

  /** Estado combinado place + country, no-null sólo cuando ambos resuelven. */
  readonly state = computed<{ place: Place; country: CountryMeta } | null>(() => {
    const p = this.place();
    const c = this.country();
    return p && c ? { place: p, country: c } : null;
  });

  /** Otras ciudades del mismo país, excluyendo la actual. */
  readonly siblingPlaces = computed<Place[]>(() => {
    const p = this.place();
    if (!p) return [];
    return placesOfCountry(p.countryCode).filter(s => s.slug !== p.slug);
  });

  /** Contenido extenso del .md (frontmatter + HTML del body). */
  private readonly _content = signal<PlaceContent | null>(null);
  readonly content = this._content.asReadonly();

  readonly notFound = computed(() => {
    const { countrySlug, citySlug } = this.params();
    return Boolean(countrySlug && citySlug) && this.place() === undefined;
  });

  constructor() {
    effect(() => {
      const p = this.place();
      const c = this.country();
      if (!p || !c) {
        this._content.set(null);
        return;
      }
      this.contentSvc.load(c.slug, p.slug).subscribe(content => {
        this._content.set(content);
      });
    });
  }
}
