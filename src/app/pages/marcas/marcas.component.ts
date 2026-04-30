import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { TRANSLATIONS } from '../../translations/translations';
import { RevealDirective } from '../../directives/reveal.directive';

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeytaDQFUtlmkt7_12laaoroyxsE7H_FNtrQ9zrFkB8Tveslw/viewform?usp=dialog';

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@exploriando';

// 6 piezas curadas: 2 alojamientos + 2 eventos + 1 gastronomía + 1 moda
// Para cambiar la selección, actualizá esta lista (el canal completo está en YOUTUBE_CHANNEL_URL)
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

  readonly t = computed(() => TRANSLATIONS[this.lang.current()].ugc);
  readonly formUrl = GOOGLE_FORM_URL;
  readonly youtubeChannelUrl = YOUTUBE_CHANNEL_URL;

  readonly portfolioVideos = PORTFOLIO_VIDEOS.map(v => ({
    ...v,
    safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(v.embedUrl),
  }));
}
