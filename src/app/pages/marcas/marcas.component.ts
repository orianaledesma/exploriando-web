import { ChangeDetectionStrategy, Component, DestroyRef, computed, effect, inject } from '@angular/core';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { TRANSLATIONS } from '../../translations/translations';
import { RevealDirective } from '../../directives/reveal.directive';

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeytaDQFUtlmkt7_12laaoroyxsE7H_FNtrQ9zrFkB8Tveslw/viewform?usp=dialog';

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@exploriando';

const PORTFOLIO_VIDEOS: { id: string; embedUrl: string; category: string }[] = [
  { id: 'rCevn0IHPoQ', embedUrl: 'https://www.youtube.com/embed/rCevn0IHPoQ?rel=0', category: 'Alojamientos' },
  { id: 'ArpO3W5Rzhw', embedUrl: 'https://www.youtube.com/embed/ArpO3W5Rzhw?rel=0', category: 'Alojamientos' },
  { id: 'pvtR3abCZW0', embedUrl: 'https://www.youtube.com/embed/pvtR3abCZW0?rel=0', category: 'Eventos' },
  { id: 'Urf1Qvxu3AU', embedUrl: 'https://www.youtube.com/embed/Urf1Qvxu3AU?rel=0', category: 'Eventos' },
  { id: 'Gw4LnyMO864', embedUrl: 'https://www.youtube.com/embed/Gw4LnyMO864?rel=0', category: 'Gastronomía' },
  { id: '5WDRY-KvFSM', embedUrl: 'https://www.youtube.com/embed/5WDRY-KvFSM?rel=0', category: 'Moda' },
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
  private readonly sanitizer = inject(DomSanitizer);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly destroyRef = inject(DestroyRef);

  readonly t = computed(() => TRANSLATIONS[this.lang.current()].ugc);
  readonly formUrl = GOOGLE_FORM_URL;
  readonly youtubeChannelUrl = YOUTUBE_CHANNEL_URL;

  readonly portfolioVideos = PORTFOLIO_VIDEOS.map(v => ({
    ...v,
    safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(v.embedUrl),
  }));

  private readonly previousTitle = this.title.getTitle();
  private readonly previousDescription =
    this.meta.getTag('name="description"')?.content ?? '';
  private readonly previousOgTitle =
    this.meta.getTag('property="og:title"')?.content ?? '';
  private readonly previousOgDescription =
    this.meta.getTag('property="og:description"')?.content ?? '';
  private readonly previousOgUrl =
    this.meta.getTag('property="og:url"')?.content ?? '';
  private readonly previousTwitterTitle =
    this.meta.getTag('name="twitter:title"')?.content ?? '';
  private readonly previousTwitterDescription =
    this.meta.getTag('name="twitter:description"')?.content ?? '';

  constructor() {
    effect(() => {
      const meta = this.t().meta;
      this.title.setTitle(meta.title);
      this.meta.updateTag({ name: 'description', content: meta.description });
      this.meta.updateTag({ property: 'og:title', content: meta.title });
      this.meta.updateTag({ property: 'og:description', content: meta.description });
      this.meta.updateTag({ property: 'og:url', content: 'https://exploriando.page/marcas' });
      this.meta.updateTag({ name: 'twitter:title', content: meta.title });
      this.meta.updateTag({ name: 'twitter:description', content: meta.description });
    });

    this.destroyRef.onDestroy(() => {
      this.title.setTitle(this.previousTitle);
      this.meta.updateTag({ name: 'description', content: this.previousDescription });
      this.meta.updateTag({ property: 'og:title', content: this.previousOgTitle });
      this.meta.updateTag({ property: 'og:description', content: this.previousOgDescription });
      this.meta.updateTag({ property: 'og:url', content: this.previousOgUrl });
      this.meta.updateTag({ name: 'twitter:title', content: this.previousTwitterTitle });
      this.meta.updateTag({ name: 'twitter:description', content: this.previousTwitterDescription });
    });
  }
}
