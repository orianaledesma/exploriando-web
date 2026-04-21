import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { TRANSLATIONS } from '../../translations/translations';
import { RevealDirective } from '../../directives/reveal.directive';
import { UGC_COPY, getPortfolio } from '../../copy/ugc.copy';

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeytaDQFUtlmkt7_12laaoroyxsE7H_FNtrQ9zrFkB8Tveslw/viewform?usp=dialog';

@Component({
  selector: 'app-ugc',
  templateUrl: './ugc.component.html',
  styleUrl: './ugc.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RevealDirective],
})
export class UgcComponent {
  private readonly lang = inject(LanguageService);
  readonly t            = computed(() => TRANSLATIONS[this.lang.current()].ugc);
  readonly formUrl      = GOOGLE_FORM_URL;
  readonly portfolio    = getPortfolio();
  readonly portfolioTitle = UGC_COPY.portfolioTitle;
}
