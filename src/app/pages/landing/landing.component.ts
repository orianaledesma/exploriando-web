import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { ComunidadComponent } from '../../components/comunidad/comunidad.component';
import { AboutComponent } from '../../components/about/about.component';
import { ViajeroCreadorComponent } from '../../components/viajero-creador/viajero-creador.component';
import { DocumentacionComponent } from '../../components/documentacion/documentacion.component';
import { AfiliadosComponent } from '../../components/afiliados/afiliados.component';
import { RecursosComponent } from '../../components/recursos/recursos.component';
import { GuiaPagaComponent } from '../../components/guia-paga/guia-paga.component';
import { UgcComponent } from '../../components/ugc/ugc.component';

@Component({
  selector: 'app-landing',
  template: `
    <app-hero />
    <app-comunidad />
    <app-about />
    <app-viajero-creador />
    <app-documentacion />
    <app-afiliados />
    <app-recursos />
    <app-guia-paga />
    <app-ugc />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroComponent,
    ComunidadComponent,
    AboutComponent,
    ViajeroCreadorComponent,
    DocumentacionComponent,
    AfiliadosComponent,
    RecursosComponent,
    GuiaPagaComponent,
    UgcComponent,
  ],
})
export class LandingComponent {}
