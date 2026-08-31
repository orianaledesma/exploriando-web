import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/**
 * Embed liviano de YouTube. Renderiza el thumbnail (jpg) y sólo carga el
 * iframe del player cuando el usuario hace click — bajamos significativamente
 * el costo en TBT/Lighthouse comparado con embebir el iframe directo.
 */
@Component({
  selector: 'app-lite-youtube',
  templateUrl: './lite-youtube.component.html',
  styleUrl: './lite-youtube.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiteYoutubeComponent {
  /** ID del video — la parte después de `v=` o `youtu.be/`. */
  readonly videoId = input.required<string>();

  /** Título descriptivo del video, usado para `aria-label` y alt del thumbnail. */
  readonly title = input<string>('Video de YouTube');

  /** Calidad del thumbnail. `hqdefault` = 480x360, `maxresdefault` = 1280x720. */
  readonly thumbQuality = input<'hqdefault' | 'maxresdefault'>('hqdefault');

  /**
   * Miniatura propia (sin extensión, ej. `/assets/images/portfolio/globos`).
   * Se sirve `.webp` con fallback `.jpg`. Si se omite, se deriva de YouTube
   * — que sólo entrega 16:9, por eso el portafolio vertical usa frames propios.
   */
  readonly thumbSrc = input<string>('');

  /**
   * ID de una playlist (`list=`). Si se pasa, el player arranca en `videoId`
   * y sigue con el resto de la lista — así el embed de /viajero-creador es
   * la playlist completa sin dejar de usar el poster liviano.
   */
  readonly playlistId = input<string>('');

  private readonly sanitizer = inject(DomSanitizer);

  private readonly _activated = signal(false);
  readonly activated = this._activated.asReadonly();

  readonly thumbUrl = computed(() =>
    this.thumbSrc()
      ? `${this.thumbSrc()}.jpg`
      : `https://i.ytimg.com/vi/${this.videoId()}/${this.thumbQuality()}.jpg`,
  );

  /** Fuente WebP del frame propio. Vacío cuando la miniatura viene de YouTube. */
  readonly thumbWebp = computed(() =>
    this.thumbSrc() ? `${this.thumbSrc()}.webp` : '',
  );

  /** URL del player. Es un resource URL (iframe src) → debe pasar por
   *  DomSanitizer o Angular lanza NG0904 al activar el video. */
  readonly iframeSrc = computed<SafeResourceUrl>(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${this.videoId()}` +
        `?autoplay=1&rel=0&modestbranding=1` +
        (this.playlistId() ? `&list=${this.playlistId()}` : ''),
    ),
  );

  /** Activa el iframe y reproduce el video. */
  activate(): void {
    this._activated.set(true);
  }
}
