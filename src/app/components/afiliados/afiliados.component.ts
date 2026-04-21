import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { AFILIADOS_COPY_A, AfiliadoCard } from '../../copy/afiliados.copy';

@Component({
  selector: 'app-afiliados',
  templateUrl: './afiliados.component.html',
  styleUrl: './afiliados.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
})
export class AfiliadosComponent {
  readonly copy  = AFILIADOS_COPY_A;
  readonly cards: AfiliadoCard[] = AFILIADOS_COPY_A.cards;
}
