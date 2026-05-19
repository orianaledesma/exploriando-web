import { ChangeDetectionStrategy, Component, DestroyRef, computed, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';
import { TRANSLATIONS } from '../../translations/translations';
import { RevealDirective } from '../../directives/reveal.directive';
import { LiteYoutubeComponent } from '../../components/lite-youtube/lite-youtube.component';

// Calendly: un solo event type (plan pago). `a1` prellena la pregunta custom
// → Oriana ve en el email de aviso si es UGC y, si vino de un paquete,
// EXACTAMENTE cuál (Probar el agua €150 / Campaña €400 / Presencia €700).
const CALENDLY_BASE = 'https://calendly.com/orianaledesma/asesoria-exploriando';
const CALENDLY_UGC_URL =
  `${CALENDLY_BASE}?a1=` + encodeURIComponent('UGC - Marca');

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@exploriando';

interface PlatformStat {
  /** Link público al posteo real. Si falta, se muestra el dato sin redirección. */
  url?: string;
  /** Métricas públicas verificables (views/likes/coment.). */
  stats: string;
}

/**
 * Portafolio. Cada pieza muestra sus métricas PÚBLICAS reales por plataforma
 * (YT + IG) con icono de redirección al posteo, para que la marca pueda
 * VERIFICAR los números. Decisión Ori 2026-05-18: son piezas demostrativas
 * (no campañas de cliente) → se vende capacidad probada, sin inventar nada.
 */
const PORTFOLIO_VIDEOS: {
  id: string;
  category: string;
  title: string;
  yt: PlatformStat;
  ig?: PlatformStat;
}[] = [
  {
    id: 'rCevn0IHPoQ', category: 'Alojamientos', title: 'Paradise Hotel — Sharm el Sheikh',
    yt: { url: 'https://www.youtube.com/watch?v=rCevn0IHPoQ', stats: '941 views · 10 likes' },
    ig: { url: 'https://www.instagram.com/reel/DKxV0oPs6R8/', stats: '2,7K views · 69 likes · 16 coment.' },
  },
  {
    id: 'ArpO3W5Rzhw', category: 'Alojamientos', title: 'Panama Resort',
    yt: { url: 'https://www.youtube.com/watch?v=ArpO3W5Rzhw', stats: '2,7K views · 78 likes' },
    ig: { url: 'https://www.instagram.com/reel/CxGR0O8gm5h/', stats: '671 views · 30 likes' },
  },
  {
    id: 'pvtR3abCZW0', category: 'Eventos', title: 'Cataratas del Iguazú',
    yt: { url: 'https://www.youtube.com/watch?v=pvtR3abCZW0', stats: '178 views · 6 likes' },
    ig: { url: 'https://www.instagram.com/reel/C2Se6VJAIMk/', stats: '6,4K views · 215 likes · 3 coment.' },
  },
  {
    id: 'Urf1Qvxu3AU', category: 'Eventos', title: 'Globo aerostático — Luxor',
    yt: { url: 'https://www.youtube.com/watch?v=Urf1Qvxu3AU', stats: '167 views · 8 likes' },
    ig: { url: 'https://www.instagram.com/exploriando/reel/DB1eCtGAH7_/', stats: '15,9K views · 356 likes · 33 coment.' },
  },
  {
    id: 'Gw4LnyMO864', category: 'Gastronomía', title: 'Experiencia gastronómica',
    yt: { url: 'https://www.youtube.com/watch?v=Gw4LnyMO864', stats: '1,2K views · 11 likes' },
    ig: { url: 'https://www.instagram.com/reels/DK3wB8EsnWb/', stats: '1,4K views · 11 likes' },
  },
  {
    id: '5WDRY-KvFSM', category: 'Moda', title: 'Shopping — Panamá',
    yt: { url: 'https://www.youtube.com/watch?v=5WDRY-KvFSM', stats: '1,7K views · 23 likes · 2 coment.' },
    // Sin link directo al reel → fallback al perfil (reemplazar si aparece el reel).
    ig: { url: 'https://www.instagram.com/exploriando/', stats: '624 views · 34 likes · 8 coment.' },
  },
];

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RevealDirective, LiteYoutubeComponent],
})
export class MarcasComponent {
  private readonly lang = inject(LanguageService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly destroyRef = inject(DestroyRef);
  private readonly analytics = inject(AnalyticsService);

  readonly t = computed(() => TRANSLATIONS[this.lang.current()].ugc);
  readonly formUrl = CALENDLY_UGC_URL;

  /** Calendly con el paquete elegido en el tag `a1` (nombre + precio). */
  packageBookingUrl(pkg: { name: string; price: string }): string {
    return `${CALENDLY_BASE}?a1=` +
      encodeURIComponent(`UGC - ${pkg.name} (${pkg.price})`);
  }
  readonly youtubeChannelUrl = YOUTUBE_CHANNEL_URL;

  readonly portfolioVideos = PORTFOLIO_VIDEOS;

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

  /** Tracking: click outbound al Google Form. `location` distingue de qué CTA salió. */
  onMarcasFormClick(location: 'hero' | 'package' | 'final_cta', packageName?: string): void {
    const params: Record<string, string> = { location };
    if (packageName) params['package'] = packageName;
    this.analytics.track('marcas_form_click', params);
  }
}
