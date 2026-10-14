import { ChangeDetectionStrategy, Component, DOCUMENT, DestroyRef, computed, effect, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';
import { SeoService } from '../../services/seo.service';
import { TRANSLATIONS } from '../../translations/translations';
import { RevealDirective } from '../../directives/reveal.directive';
import { CAFECITO_URL, PAYPAL_URL } from '../../data/links';

type GoalId = 'ingredientes' | 'set' | 'yerba' | 'otro';

interface ApoyoGoal {
  id: GoalId;
  /** Banner sin extensión (.webp + fallback .jpg). */
  image: string;
  /** Monto fijo del botón, en USD. `null` → monto libre que completa quien apoya. */
  amount: number | null;
}

/** Moneda de los links de PayPal. USD porque el público es de varios países. */
const CURRENCY = 'USD';

/** Tope del monto libre: frena un typo tipo 1500 en vez de 15. */
const MAX_CUSTOM_AMOUNT = 1000;

/**
 * Link de PayPal.me con el monto ya cargado (`/exploriando/10USD`). Sin monto
 * cae al link pelado, donde PayPal pide el monto.
 */
export function paypalAmountUrl(amount: number | null): string {
  return amount ? `${PAYPAL_URL}/${amount}${CURRENCY}` : PAYPAL_URL;
}

/**
 * Destinos del apoyo, en el orden en que se muestran (orden Ori 2026-10-14):
 * en la grilla 2×2 quedan ingredientes y yerba arriba, set y monto libre abajo. El texto vive en
 * translations.ts (`apoyo.goals`); acá queda lo que es igual en los tres
 * idiomas. Para sumar un destino: agregarlo acá, a `GoalId` y al copy.
 */
const APOYO_GOALS: ApoyoGoal[] = [
  { id: 'ingredientes', image: '/assets/images/apoyo/ingredientes', amount: 7 },
  { id: 'yerba',        image: '/assets/images/apoyo/yerba',        amount: 14 },
  { id: 'set',          image: '/assets/images/apoyo/set',          amount: 20 },
  // Destino y monto libres: el monto se escribe acá y arma el link; el
  // destino, en la nota del pago.
  { id: 'otro',         image: '/assets/images/apoyo/elegis-vos',   amount: null },
];

/**
 * Página /apoyo. A propósito NO está en el nav (decisión Ori 2026-10-14): se
 * llega desde la sección de la home (`ApoyoTeaserComponent`) o con el link
 * directo, que es el que se comparte cuando alguien pregunta cómo donar.
 *
 * Todas las tarjetas van al mismo PayPal con el monto en la URL: el destino
 * lo distingue analytics y, para "otro", la nota que deja quien paga. Cafecito va en un bloque
 * aparte porque sólo sirve desde Argentina (Mercado Pago, en pesos).
 */
@Component({
  selector: 'app-apoyo',
  templateUrl: './apoyo.component.html',
  styleUrl: './apoyo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
})
export class ApoyoComponent {
  private readonly lang       = inject(LanguageService);
  private readonly analytics  = inject(AnalyticsService);
  private readonly title      = inject(Title);
  private readonly meta       = inject(Meta);
  private readonly seo        = inject(SeoService);
  private readonly doc        = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  readonly t = computed(() => TRANSLATIONS[this.lang.current()].apoyo);

  /** Destinos con su copy ya resuelto al idioma activo. */
  readonly goals = computed(() =>
    APOYO_GOALS.map((g) => ({ ...g, ...this.t().goals[g.id] })),
  );

  readonly cafecitoUrl = CAFECITO_URL;
  readonly currency    = CURRENCY;
  readonly maxCustomAmount = MAX_CUSTOM_AMOUNT;
  readonly paypalAmountUrl = paypalAmountUrl;

  /** Monto libre de la última tarjeta. `null` mientras esté vacío o sea inválido. */
  readonly customAmount = signal<number | null>(null);

  /** Link de la última tarjeta: se arma con lo que haya en el campo. */
  readonly customUrl = computed(() => paypalAmountUrl(this.customAmount()));

  /** "Aportar" solo hasta que haya monto; después "Aportar USD 15". */
  readonly customCta = computed(() => {
    const amount = this.customAmount();
    return amount ? `${this.t().give} ${CURRENCY} ${amount}` : this.t().give;
  });

  /** Acepta enteros de 1 al tope; cualquier otra cosa deja el link sin monto. */
  onCustomAmountInput(value: string): void {
    const amount = Math.floor(Number(value));
    this.customAmount.set(
      Number.isFinite(amount) && amount >= 1 && amount <= MAX_CUSTOM_AMOUNT ? amount : null,
    );
  }

  /** Tracking: salida a un medio de pago. `destino` es la tarjeta elegida. */
  onSupportClick(
    destino: GoalId | 'cafecito',
    medio: 'paypal' | 'cafecito',
    monto: number | null = null,
  ): void {
    this.analytics.track('apoyo_click', monto ? { destino, medio, monto } : { destino, medio });
  }

  // ─── SEO: título y meta propios, restaurados al salir de la ruta ───────────

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
  private readonly previousCanonical =
    this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href
    ?? 'https://exploriando.page';

  constructor() {
    effect(() => {
      const meta = this.t().meta;
      this.title.setTitle(meta.title);
      this.meta.updateTag({ name: 'description', content: meta.description });
      this.meta.updateTag({ property: 'og:title', content: meta.title });
      this.meta.updateTag({ property: 'og:description', content: meta.description });
      this.meta.updateTag({ property: 'og:url', content: 'https://exploriando.page/apoyo' });
      this.meta.updateTag({ name: 'twitter:title', content: meta.title });
      this.meta.updateTag({ name: 'twitter:description', content: meta.description });
      // Sin esto hereda el canonical de index.html (la home) — ver /marcas.
      this.seo.setCanonicalPath('/apoyo');
    });

    this.destroyRef.onDestroy(() => {
      this.title.setTitle(this.previousTitle);
      this.meta.updateTag({ name: 'description', content: this.previousDescription });
      this.meta.updateTag({ property: 'og:title', content: this.previousOgTitle });
      this.meta.updateTag({ property: 'og:description', content: this.previousOgDescription });
      this.meta.updateTag({ property: 'og:url', content: this.previousOgUrl });
      this.meta.updateTag({ name: 'twitter:title', content: this.previousTwitterTitle });
      this.meta.updateTag({ name: 'twitter:description', content: this.previousTwitterDescription });
      this.seo.setCanonicalPath(this.previousCanonical);
    });
  }
}
