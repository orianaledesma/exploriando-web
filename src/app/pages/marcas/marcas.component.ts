import { ChangeDetectionStrategy, Component, DestroyRef, computed, effect, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';
import { TRANSLATIONS } from '../../translations/translations';
import { RevealDirective } from '../../directives/reveal.directive';
import { LiteYoutubeComponent } from '../../components/lite-youtube/lite-youtube.component';
import { ProcesoTimelineComponent } from '../../components/proceso-timeline/proceso-timeline.component';
import { HeroCardsComponent } from '../../components/hero-cards/hero-cards.component';

// Contacto directo. Decisión Ori 2026-08-29: casi todas las respuestas de
// marcas llegan por DM, así que sacamos el paso intermedio de agendar llamada.
// `ig.me/m/` abre la conversación directa, no el perfil.
const INSTAGRAM_DM_URL = 'https://ig.me/m/exploriando';
const CONTACT_MAIL_URL =
  'mailto:exploriando.info@gmail.com?subject=Colaboraci%C3%B3n%20UGC';
/** Mismo buzón, asunto propio del bloque de cotización de servicios. */
const QUOTE_MAIL_URL =
  'mailto:exploriando.info@gmail.com?subject=Cotizaci%C3%B3n%20de%20contenido';

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@exploriando';

/**
 * Los dos frames en abanico del hero. Rutas sin extensión: se sirve `.webp`
 * con fallback `.jpg`. El primero queda atrás y el segundo adelante.
 */
const HERO_CARDS = [
  '/assets/images/portfolio/parrotel',
  '/assets/images/marcas-card-dome',
];

/**
 * Puente al taller. En false hasta que exista la página /taller: el bloque ya
 * está escrito (markup + copy ES/EN/PT) y sólo hay que dar vuelta la constante.
 */
const MOSTRAR_TALLER = false;

interface PlatformLink {
  /** Link público al posteo real, para que la marca pueda verificarlo. */
  url: string;
}

/**
 * Portafolio. Piezas demostrativas (no campañas de cliente) → se vende
 * capacidad probada, sin inventar nada. Decisión Ori 2026-08-29: la página
 * vende PRODUCCIÓN, no alcance, así que las tarjetas ya no muestran cifras;
 * queda el link a cada posteo para quien quiera ver los números en la fuente.
 */
interface PortfolioPiece {
  /** ID de YouTube. Vacío → la pieza vive sólo en Instagram (tarjeta sin player). */
  id: string;
  category: string;
  title: string;
  /** Destino y/o marca, se muestra bajo el título. */
  location: string;
  /** Frame vertical 9:16 propio, sin extensión (.webp + fallback .jpg). */
  thumb: string;
  yt?: PlatformLink;
  ig?: PlatformLink;
}

/** Las 3 piezas destacadas. El resto se despliega con "Ver más". */
const PORTFOLIO_FEATURED: PortfolioPiece[] = [
  {
    id: '', category: 'Alojamientos',
    title: 'Un día de relax en el bosque',
    location: 'Forest Domes · Vilnius, Lituania',
    thumb: '/assets/images/portfolio/forest-domes',
    ig: { url: 'https://www.instagram.com/reels/DaiZmzsMRHU/' },
  },
  {
    id: 'hthFxbQBQxc', category: 'Gastronomía',
    title: 'El mejor brunch',
    location: 'Vero Cafe · Lituania',
    thumb: '/assets/images/portfolio/verocafe',
    yt: { url: 'https://www.youtube.com/shorts/hthFxbQBQxc' },
  },
  {
    id: 'rCevn0IHPoQ', category: 'Alojamientos',
    title: 'El resort con de todo',
    location: 'Resort Paradise · Sharm el Sheikh',
    thumb: '/assets/images/portfolio/parrotel',
    yt: { url: 'https://www.youtube.com/watch?v=rCevn0IHPoQ' },
    ig: { url: 'https://www.instagram.com/reel/DKxV0oPs6R8/' },
  },
];

/** Trabajos anteriores — ocultos hasta que el visitante toca "Ver más". */
const PORTFOLIO_REST: PortfolioPiece[] = [
  {
    id: 'Urf1Qvxu3AU', category: 'Eventos',
    title: 'Globo aerostático',
    location: 'Luxor, Egipto',
    thumb: '/assets/images/portfolio/globos',
    yt: { url: 'https://www.youtube.com/watch?v=Urf1Qvxu3AU' },
    ig: { url: 'https://www.instagram.com/exploriando/reel/DB1eCtGAH7_/' },
  },
  {
    id: 'ArpO3W5Rzhw', category: 'Alojamientos',
    title: 'Panama Resort',
    location: 'Panamá',
    thumb: '',
    yt: { url: 'https://www.youtube.com/watch?v=ArpO3W5Rzhw' },
    ig: { url: 'https://www.instagram.com/reel/CxGR0O8gm5h/' },
  },
  {
    id: 'pvtR3abCZW0', category: 'Eventos',
    title: 'Cataratas del Iguazú',
    location: 'Misiones, Argentina',
    thumb: '',
    yt: { url: 'https://www.youtube.com/watch?v=pvtR3abCZW0' },
    ig: { url: 'https://www.instagram.com/reel/C2Se6VJAIMk/' },
  },
  {
    id: 'Gw4LnyMO864', category: 'Gastronomía',
    title: 'Experiencia gastronómica',
    location: 'Sharm el Sheikh',
    thumb: '',
    yt: { url: 'https://www.youtube.com/watch?v=Gw4LnyMO864' },
    ig: { url: 'https://www.instagram.com/reels/DK3wB8EsnWb/' },
  },
  {
    id: '5WDRY-KvFSM', category: 'Moda',
    title: 'Shopping',
    location: 'Panamá',
    thumb: '',
    yt: { url: 'https://www.youtube.com/watch?v=5WDRY-KvFSM' },
    // Sin link directo al reel → fallback al perfil (reemplazar si aparece).
    ig: { url: 'https://www.instagram.com/exploriando/' },
  },
];

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink, RevealDirective, LiteYoutubeComponent,
    ProcesoTimelineComponent, HeroCardsComponent,
  ],
})
export class MarcasComponent {
  private readonly lang = inject(LanguageService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly destroyRef = inject(DestroyRef);
  private readonly analytics = inject(AnalyticsService);

  readonly t = computed(() => TRANSLATIONS[this.lang.current()].ugc);
  readonly instagramUrl = INSTAGRAM_DM_URL;
  readonly mailUrl = CONTACT_MAIL_URL;
  readonly quoteMailUrl = QUOTE_MAIL_URL;
  readonly youtubeChannelUrl = YOUTUBE_CHANNEL_URL;

  readonly portfolioFeatured = PORTFOLIO_FEATURED;
  readonly portfolioRest = PORTFOLIO_REST;

  private readonly _extraServicesVisible = signal(false);
  /** `true` cuando el visitante desplegó los 3 servicios extra. */
  readonly extraServicesVisible = this._extraServicesVisible.asReadonly();

  toggleExtraServices(): void {
    const next = !this._extraServicesVisible();
    this._extraServicesVisible.set(next);
    if (next) this.analytics.track('servicios_ver_mas');
  }

  readonly heroCards     = HERO_CARDS;
  readonly mostrarTaller = MOSTRAR_TALLER;

  private readonly _restVisible = signal(false);
  /** `true` cuando el visitante desplegó los trabajos anteriores. */
  readonly restVisible = this._restVisible.asReadonly();

  showRest(): void {
    this._restVisible.set(true);
    this.analytics.track('portfolio_ver_mas');
  }

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
  /** `channel` distingue si la marca eligió DM o mail — antes todo era Calendly. */
  onContactClick(
    location: 'hero' | 'package' | 'final_cta' | 'hoteles',
    channel: 'instagram' | 'mail',
    packageName?: string,
  ): void {
    const params: Record<string, string> = { location, channel };
    if (packageName) params['package'] = packageName;
    this.analytics.track('marcas_form_click', params);
  }
}
