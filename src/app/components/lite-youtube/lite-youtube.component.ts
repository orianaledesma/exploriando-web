import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';

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

  private readonly _activated = signal(false);
  readonly activated = this._activated.asReadonly();

  readonly thumbUrl = computed(
    () => `https://i.ytimg.com/vi/${this.videoId()}/${this.thumbQuality()}.jpg`,
  );

  readonly iframeSrc = computed(
    () =>
      `https://www.youtube-nocookie.com/embed/${this.videoId()}` +
      `?autoplay=1&rel=0&modestbranding=1`,
  );

  /** Activa el iframe y reproduce el video. */
  activate(): void {
    this._activated.set(true);
  }
}
