import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { GUIA_PAGA_COPY_A } from '../../copy/guia-paga.copy';

// URL de compra en Hotmart — reemplazar con el link real del producto
const PURCHASE_URL = 'https://pay.hotmart.com/exploriando-guia';

@Component({
  selector: 'app-guia-paga',
  templateUrl: './guia-paga.component.html',
  styleUrl: './guia-paga.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
})
export class GuiaPagaComponent {
  readonly copy        = GUIA_PAGA_COPY_A;
  readonly purchaseUrl = PURCHASE_URL;
}
