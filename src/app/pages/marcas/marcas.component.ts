import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { TRANSLATIONS } from '../../translations/translations';
import { RevealDirective } from '../../directives/reveal.directive';

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeytaDQFUtlmkt7_12laaoroyxsE7H_FNtrQ9zrFkB8Tveslw/viewform?usp=dialog';

const PORTFOLIO_ITEMS = [
  { id: 1, brand: 'Ejemplo Marca A', category: 'Turismo', image: '/assets/images/ugc-1.webp' },
  { id: 2, brand: 'Ejemplo Marca B', category: 'Gastronomía', image: '/assets/images/ugc-2.webp' },
  { id: 3, brand: 'Ejemplo Marca C', category: 'Hospedaje', image: '/assets/images/ugc-3.webp' },
  { id: 4, brand: 'Ejemplo Marca D', category: 'Aventura', image: '/assets/images/ugc-4.webp' },
  { id: 5, brand: 'Ejemplo Marca E', category: 'Cultura', image: '/assets/images/ugc-5.webp' },
  { id: 6, brand: 'Ejemplo Marca F', category: 'Transporte', image: '/assets/images/ugc-6.webp' },
];

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RevealDirective],
})
export class MarcasComponent {
  private readonly lang = inject(LanguageService);
  readonly t = computed(() => TRANSLATIONS[this.lang.current()].ugc);

  readonly portfolioItems = PORTFOLIO_ITEMS;
  readonly formUrl = GOOGLE_FORM_URL;
}
