import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { MapaTeaserComponent } from '../../components/mapa-teaser/mapa-teaser.component';
import { ViajeroCreadorComponent } from '../../components/viajero-creador/viajero-creador.component';
import { AfiliadosComponent } from '../../components/afiliados/afiliados.component';
import { RecursosComponent } from '../../components/recursos/recursos.component';
import { MarcasTeaserComponent } from '../../components/marcas-teaser/marcas-teaser.component';

// Landing 100% viajero (auditoría 2026-05-18). Orden por funnel:
// captura → prueba de valor → promesa gratis → confianza → herramientas →
// creador (YouTube + 1:1) → derivación B2B a /marcas.
//
// La sección UGC completa vive en /marcas; acá solo queda el teaser que deriva
// al B2B sin contaminar el funnel del viajero.

@Component({
  selector: 'app-landing',
  template: `
    <app-hero />
    <app-mapa-teaser />
    <app-recursos />
    <app-about />
    <app-afiliados />
    <app-viajero-creador />
    <app-marcas-teaser />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroComponent,
    MapaTeaserComponent,
    RecursosComponent,
    AboutComponent,
    AfiliadosComponent,
    ViajeroCreadorComponent,
    MarcasTeaserComponent,
  ],
})
export class LandingComponent {}
