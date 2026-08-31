import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

/** Un paso de la línea de tiempo. Espeja `ProcessStep` de las traducciones. */
export interface ProcesoStep {
  title: string;
  items: string[];
}

/**
 * Línea de tiempo horizontal de N pasos (puntos unidos por una línea, título
 * y bullets debajo de cada punto). En mobile los pasos se apilan en vertical
 * con la línea a la izquierda.
 *
 * Presentacional: recibe el copy ya traducido, así el mismo bloque sirve para
 * cualquier proceso (hoy sólo el "Cómo trabajo" de /marcas).
 */
@Component({
  selector: 'app-proceso-timeline',
  templateUrl: './proceso-timeline.component.html',
  styleUrl: './proceso-timeline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
})
export class ProcesoTimelineComponent {
  readonly title    = input.required<string>();
  readonly subtitle = input.required<string>();
  readonly steps    = input.required<readonly ProcesoStep[]>();

  /** Id del `<h3>`, para que el contenedor pueda referenciarlo por a11y. */
  readonly titleId = input<string>('proceso-title');
}
