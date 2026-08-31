import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Par de frames verticales dispuestos en abanico, como dos naipes en la mano.
 * Presentacional: recibe las rutas (sin extensión — sirve `.webp` con fallback
 * `.jpg`) y los alts ya traducidos.
 *
 * Hoy lo usa el hero de /marcas para mostrar material real antes de que la
 * marca lea una palabra.
 */
@Component({
  selector: 'app-hero-cards',
  templateUrl: './hero-cards.component.html',
  styleUrl: './hero-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroCardsComponent {
  /** Rutas sin extensión. La primera queda atrás; la segunda, adelante. */
  readonly sources = input.required<readonly string[]>();

  /** Alt de cada frame, en el mismo orden que `sources`. */
  readonly alts = input.required<readonly string[]>();
}
