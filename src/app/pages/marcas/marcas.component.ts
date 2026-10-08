import { ChangeDetectionStrategy, Component, DestroyRef, computed, effect, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';
import { TRANSLATIONS, type PortfolioPieceKey } from '../../translations/translations';
import { RevealDirective } from '../../directives/reveal.directive';
import { LiteYoutubeComponent } from '../../components/lite-youtube/lite-youtube.component';
import { ProcesoTimelineComponent } from '../../components/proceso-timeline/proceso-timeline.component';
import { HeroCardsComponent } from '../../components/hero-cards/hero-cards.component';
import { YOUTUBE_CHANNEL_URL } from '../../data/links';

// Contacto directo. Decisión Ori 2026-08-29: casi todas las respuestas de
// marcas llegan por DM, así que sacamos el paso intermedio de agendar llamada.
// `ig.me/m/` abre la conversación directa, no el perfil.
const INSTAGRAM_DM_URL = 'https://ig.me/m/exploriando';
const CONTACT_MAIL_URL =
  'mailto:exploriando.info@gmail.com?subject=Colaboraci%C3%B3n%20UGC';
/** Mismo buzón, asunto propio del bloque de cotización de servicios. */
const QUOTE_MAIL_URL =
  'mailto:exploriando.info@gmail.com?subject=Cotizaci%C3%B3n%20de%20contenido';

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
/**
 * Categorías del portafolio. El id une la pieza con su etiqueta e intro
 * traducidas; el orden de esta lista es el orden de las pestañas.
 */
export const CATEGORIES = [
  'hoteleria',
  'gastronomia',
  'cocina',
  'experiencias',
  'moda',
] as const;

export type CategoryId = (typeof CATEGORIES)[number];

interface PortfolioPiece {
  /**
   * Clave del texto traducido en `portfolioPieces`. El título, el lugar y la
   * descripción viven en translations.ts: acá queda sólo lo estructural, que
   * es igual en los tres idiomas.
   */
  key: PortfolioPieceKey;
  /** ID de YouTube. Vacío → la pieza vive sólo en Instagram (tarjeta sin player). */
  id: string;
  category: CategoryId;
  /** Frame vertical 9:16 propio, sin extensión (.webp + fallback .jpg). */
  thumb: string;
  yt?: PlatformLink;
  ig?: PlatformLink;
}

/** Una pieza con su texto ya resuelto al idioma activo, lista para la tarjeta. */
interface PortfolioCard extends PortfolioPiece {
  title: string;
  /** Destino y/o marca, se muestra bajo el título. Vacío → se omite la línea. */
  location: string;
}

/**
 * Una pieza se muestra si tiene a dónde llevar: un video de YouTube, un frame
 * propio, o al menos un link a la plataforma donde vive.
 *
 * Cuando no hay imagen, la tarjeta dibuja un bloque neutro en su lugar en vez
 * de armar `<img src=".jpg">`. Eso permite publicar una pieza con su link el
 * mismo día, sin esperar al frame: el visitante igual puede ir a verla, y
 * cuando la imagen aparece la tarjeta mejora sola.
 */
function renderable(piece: PortfolioPiece): boolean {
  return Boolean(piece.id || piece.thumb || piece.ig || piece.yt);
}

/**
 * Las piezas del portafolio, agrupadas en pestañas por categoría.
 *
 * Hasta 2026-10-05 eran dos listas (destacadas + "ver más"); la maqueta v2 las
 * reemplaza por categorías, así que el orden dentro de cada una es el orden en
 * que se muestran. La tarjeta muestra título y lugar: la pieza se explica
 * sola al verla, y la línea de enfoque alargaba la grilla sin agregar nada.
 */
const PORTFOLIO: PortfolioPiece[] = [
  // ── Hotelería ──────────────────────────────────────────────────────────────
  {
    key: 'forest-domes', id: '', category: 'hoteleria',
    thumb: '/assets/images/portfolio/forest-domes',
    ig: { url: 'https://www.instagram.com/reels/DaiZmzsMRHU/' },
  },
  {
    key: 'parrotel', id: 'rCevn0IHPoQ', category: 'hoteleria',
    thumb: '/assets/images/portfolio/parrotel',
    yt: { url: 'https://www.youtube.com/watch?v=rCevn0IHPoQ' },
    ig: { url: 'https://www.instagram.com/reel/DKxV0oPs6R8/' },
  },
  {
    key: 'casa-del-lago', id: '', category: 'hoteleria',
    thumb: '/assets/images/portfolio/3krantai',
    ig: { url: 'https://www.instagram.com/reel/DdJlhUnOEU3/' },
  },

  // ── Gastronomía ────────────────────────────────────────────────────────────
  {
    key: 'vero-cafe', id: 'hthFxbQBQxc', category: 'gastronomia',
    thumb: '/assets/images/portfolio/verocafe',
    yt: { url: 'https://www.youtube.com/shorts/hthFxbQBQxc' },
  },
  {
    key: 'sharm-gastro', id: 'Gw4LnyMO864', category: 'gastronomia',
    thumb: '',
    yt: { url: 'https://www.youtube.com/watch?v=Gw4LnyMO864' },
    ig: { url: 'https://www.instagram.com/reels/DK3wB8EsnWb/' },
  },
  {
    key: 'cafeteria', id: '', category: 'gastronomia',
    thumb: '/assets/images/portfolio/cafeteria',
    ig: { url: 'https://www.instagram.com/reel/DKIPVCEsq71/' },
  },

  // ── Cocina (vivos) ─────────────────────────────────────────────────────────
  // Los vivos son horizontales: el poster lo deriva lite-youtube del propio
  // YouTube, así que no necesitan frame vertical propio.
  {
    key: 'empanadas', id: 'c5aac8OX40c', category: 'cocina',
    thumb: '',
    yt: { url: 'https://www.youtube.com/watch?v=c5aac8OX40c' },
  },
  {
    key: 'pastel-papa', id: 'BNiXo2zVeok', category: 'cocina',
    thumb: '',
    yt: { url: 'https://www.youtube.com/watch?v=BNiXo2zVeok' },
  },
  {
    key: 'noquis', id: 'GPIOXYanTus', category: 'cocina',
    thumb: '',
    yt: { url: 'https://www.youtube.com/watch?v=GPIOXYanTus' },
  },

  // ── Experiencias ───────────────────────────────────────────────────────────
  {
    key: 'globo', id: 'Urf1Qvxu3AU', category: 'experiencias',
    thumb: '/assets/images/portfolio/globos',
    yt: { url: 'https://www.youtube.com/watch?v=Urf1Qvxu3AU' },
    ig: { url: 'https://www.instagram.com/exploriando/reel/DB1eCtGAH7_/' },
  },
  {
    key: 'boxeo', id: '', category: 'experiencias',
    thumb: '/assets/images/portfolio/boxeo',
    ig: { url: 'https://www.instagram.com/reel/Ddyf0VhO48j/' },
  },
  {
    key: 'who-win', id: '', category: 'experiencias',
    thumb: '/assets/images/portfolio/who-win',
    ig: { url: 'https://www.instagram.com/reel/Ddw1i_du6JZ/' },
  },

  // ── Moda y retail ──────────────────────────────────────────────────────────
  {
    key: 'shopping', id: '5WDRY-KvFSM', category: 'moda',
    thumb: '',
    yt: { url: 'https://www.youtube.com/watch?v=5WDRY-KvFSM' },
    // Sin link directo al reel → fallback al perfil (reemplazar si aparece).
    ig: { url: 'https://www.instagram.com/exploriando/' },
  },
  {
    key: 'unboxing', id: '', category: 'moda',
    thumb: '/assets/images/portfolio/unboxing',
    ig: { url: 'https://www.instagram.com/reel/DRCoQWYjBnO/' },
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

  readonly categories = CATEGORIES;

  /** Categoría abierta. Arranca en la primera que tenga piezas publicadas. */
  private readonly _activeCategory = signal<CategoryId>(
    CATEGORIES.find((c) => PORTFOLIO.some((p) => p.category === c && renderable(p)))
      ?? CATEGORIES[0],
  );
  readonly activeCategory = this._activeCategory.asReadonly();

  /**
   * Piezas publicables agrupadas por categoría.
   *
   * Se calculan todas, no sólo las de la pestaña abierta: los paneles se
   * renderizan completos y se ocultan con `hidden`, así las 16 piezas quedan
   * en el HTML prerenderizado. Rendiendo sólo la activa, Google veía tres.
   */
  readonly piecesByCategory = computed(() => {
    const copy = this.t().portfolioPieces;
    const card = (p: PortfolioPiece): PortfolioCard => ({ ...p, ...copy[p.key] });
    return Object.fromEntries(
      CATEGORIES.map((c) => [
        c,
        PORTFOLIO.filter((p) => p.category === c && renderable(p)).map(card),
      ]),
    ) as Record<CategoryId, PortfolioCard[]>;
  });

  /** Piezas de la categoría abierta. */
  readonly visiblePieces = computed(() => this.piecesByCategory()[this.activeCategory()]);

  /**
   * Etiqueta accesible del link de una pieza. El título va interpolado en la
   * plantilla traducida, no concatenado: en inglés y portugués el orden de las
   * palabras no es el mismo que en español.
   */
  pieceLinkLabel(title: string): string {
    return this.t().portfolioLinks.piece.replace('{title}', title);
  }


  selectCategory(category: CategoryId): void {
    this._activeCategory.set(category);
    this.analytics.track('portfolio_category_click', { category });
  }

  /**
   * Flechas para moverse entre pestañas, Home/End a los extremos.
   * Sin esto las seis pestañas son seis paradas sueltas del tabulador, que es
   * justo lo que el patrón ARIA de tablist existe para evitar.
   */
  onCategoryKeydown(event: KeyboardEvent, index: number): void {
    const last = CATEGORIES.length - 1;
    let next: number | null = null;

    switch (event.key) {
      case 'ArrowRight': next = index === last ? 0 : index + 1; break;
      case 'ArrowLeft':  next = index === 0 ? last : index - 1; break;
      case 'Home':       next = 0; break;
      case 'End':        next = last; break;
      default: return;
    }

    event.preventDefault();
    this.selectCategory(CATEGORIES[next]);
    const tabs = (event.currentTarget as HTMLElement).parentElement?.children;
    (tabs?.[next] as HTMLElement | undefined)?.focus();
  }

  /**
   * Índices de los servicios con sus opciones desplegadas.
   *
   * Arrancan cerrados a propósito: los tres servicios con todas sus opciones
   * abiertas son más de cien líneas de texto, y quien llega no sabe todavía
   * cuál de los tres le sirve. Primero elige, después profundiza.
   */
  private readonly _openServices = signal<ReadonlySet<number>>(new Set());

  isServiceOpen(index: number): boolean {
    return this._openServices().has(index);
  }

  toggleService(index: number): void {
    const next = new Set(this._openServices());
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
      this.analytics.track('servicios_ver_mas', { servicio: index + 1 });
    }
    this._openServices.set(next);
  }

  readonly heroCards     = HERO_CARDS;
  readonly mostrarTaller = MOSTRAR_TALLER;

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
