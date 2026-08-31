import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';
import { EmailCaptureService } from '../../services/email-capture.service';
import { EmailCaptureStatus } from '../../models/email-capture.model';
import { TRANSLATIONS } from '../../translations/translations';
import { RevealDirective } from '../../directives/reveal.directive';
import { LiteYoutubeComponent } from '../../components/lite-youtube/lite-youtube.component';

/**
 * Playlist del curso gratuito. Es la fuente de la sección "Aprendé gratis":
 * el embed la reproduce entera y `PLAYLIST_URL` es el CTA al pie.
 */
const PLAYLIST_ID  = 'PLjZ30HHREgvqeMNLcj36yBabdMVw_fAwa';
const PLAYLIST_URL = `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`;

/**
 * Grilla de videos sueltos de la playlist. Se cargan a mano (igual que el
 * portafolio de /marcas) porque listar la playlist en runtime necesitaría la
 * YouTube Data API con una key, y el sitio es estático.
 *
 * PENDIENTE: Oriana tiene que pasar los 6-9 videos de la playlist con su
 * título. Hoy queda sólo el primero, que es el único ID confirmado. Sumar
 * entradas acá es lo único necesario — la grilla y el embed no se tocan.
 */
interface FreeVideo {
  /** ID de YouTube — la parte después de `v=`. */
  id: string;
  title: string;
}

const FREE_VIDEOS: FreeVideo[] = [
  { id: 'Ireh_4z2DGc', title: 'Cómo empezar a crear contenido de viaje' },
];

/**
 * Modo del bloque del curso. Cambiar esta constante es TODO lo necesario para
 * pasar de lista de espera a venta: en 'venta' se rinde la card con precio,
 * bullets y botón de compra, y desaparece el formulario. Mismo patrón que
 * `GuiasPremiumComponent`.
 */
const MODO_CURSO: 'waitlist' | 'venta' = 'waitlist';

/** URL de checkout del curso. Se completa al pasar a modo venta. */
const CURSO_CHECKOUT_URL = '';

/**
 * Página /viajero-creador. Antes era una sección de la home; se convirtió en
 * pestaña propia (decisión Ori 2026-08-31) y en la home quedó sólo el teaser
 * (`ViajeroCreadorComponent`).
 *
 * Orden: hero → qué vas a aprender → playlist gratis → lista de espera del
 * curso. El bloque de newsletter que cierra la página es el del footer, que
 * ya se rinde en todas las rutas desde `AppComponent`. Las asesorías 1:1
 * viven en la home (`AsesoriasComponent`).
 */
@Component({
  selector: 'app-viajero-creador-page',
  templateUrl: './viajero-creador-page.component.html',
  styleUrl: './viajero-creador-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RevealDirective, LiteYoutubeComponent],
})
export class ViajeroCreadorPageComponent {
  private readonly lang         = inject(LanguageService);
  private readonly analytics    = inject(AnalyticsService);
  private readonly fb           = inject(FormBuilder);
  private readonly emailService = inject(EmailCaptureService);
  private readonly title        = inject(Title);
  private readonly meta         = inject(Meta);
  private readonly destroyRef   = inject(DestroyRef);

  readonly t = computed(() => TRANSLATIONS[this.lang.current()].viajeroCreador);

  readonly playlistId  = PLAYLIST_ID;
  readonly playlistUrl = PLAYLIST_URL;
  readonly videos      = FREE_VIDEOS;

  /** Primer video de la playlist: da el poster del embed y arranca la lista. */
  readonly firstVideoId = FREE_VIDEOS[0].id;

  readonly cursoEnVenta   = MODO_CURSO === 'venta';
  readonly cursoCheckout  = CURSO_CHECKOUT_URL;

  // ─── Lista de espera del curso ─────────────────────────────────────────────
  // Usa la MISMA lista de MailerLite que el resto del sitio; lo que segmenta
  // es `source: 'curso-creador'`, que viaja como campo custom.

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    trap:  [''],
  });

  status = signal<EmailCaptureStatus>('idle');

  get emailCtrl() { return this.form.controls['email']; }

  onSubmit(): void {
    if (this.form.value['trap']) { this.status.set('success'); return; }
    if (this.form.invalid)       { this.form.markAllAsTouched(); return; }
    if (this.emailService.isRateLimited())                      { this.status.set('rateLimit'); return; }
    if (this.emailService.hasAlreadySubmitted('curso-creador')) { this.status.set('duplicate'); return; }

    this.status.set('loading');
    this.emailService
      .submit({ email: this.form.value['email'] as string, source: 'curso-creador', lang: this.lang.current() })
      .subscribe({
        next: () => {
          this.emailService.recordSubmission('curso-creador');
          this.status.set('success');
          this.form.reset();
        },
        error: () => this.status.set('error'),
      });
  }

  /** Tracking: click a la playlist en YouTube (objetivo real: watch hours). */
  onYoutubeClick(): void {
    this.analytics.track('viajero_creador_youtube_click');
  }

  /** Tracking: click a un video suelto de la grilla. */
  onVideoClick(title: string): void {
    this.analytics.track('viajero_creador_video_click', { video: title });
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

  constructor() {
    effect(() => {
      const meta = this.t().meta;
      this.title.setTitle(meta.title);
      this.meta.updateTag({ name: 'description', content: meta.description });
      this.meta.updateTag({ property: 'og:title', content: meta.title });
      this.meta.updateTag({ property: 'og:description', content: meta.description });
      this.meta.updateTag({ property: 'og:url', content: 'https://exploriando.page/viajero-creador' });
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
