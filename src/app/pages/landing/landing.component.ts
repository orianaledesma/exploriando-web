import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { MapaTeaserComponent } from '../../components/mapa-teaser/mapa-teaser.component';
import { ViajeroCreadorComponent } from '../../components/viajero-creador/viajero-creador.component';
import { AfiliadosComponent } from '../../components/afiliados/afiliados.component';
import { AsesoriasComponent } from '../../components/asesorias/asesorias.component';
import { RecursosComponent } from '../../components/recursos/recursos.component';
import { MarcasTeaserComponent } from '../../components/marcas-teaser/marcas-teaser.component';
import { EnVivoComponent } from '../../components/en-vivo/en-vivo.component';

// Landing 100% viajero (auditoría 2026-05-18). Orden por funnel:
// captura → prueba de valor → promesa gratis → confianza → herramientas →
// creador (YouTube + 1:1) → derivación B2B a /marcas.
//
// La sección UGC completa vive en /marcas; acá solo queda el teaser que deriva
// al B2B sin contaminar el funnel del viajero.
//
// "Guías premium" está DESMONTADA a pedido de Ori (2026-08-31): no entra en la
// oferta por ahora. El componente y su copy ES/EN/PT quedan intactos en
// `components/guias-premium/`; para reponerlo alcanza con volver a importarlo
// y agregar <app-guias-premium /> al template, entre mapa-teaser y recursos.

@Component({
  selector: 'app-landing',
  template: `
    <app-hero />
    <app-en-vivo />
    <app-mapa-teaser />
    <app-recursos />
    <app-about />
    <app-asesorias />
    <app-afiliados />
    <app-viajero-creador />
    <app-marcas-teaser />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroComponent,
    EnVivoComponent,
    MapaTeaserComponent,
    RecursosComponent,
    AboutComponent,
    AsesoriasComponent,
    AfiliadosComponent,
    ViajeroCreadorComponent,
    MarcasTeaserComponent,
  ],
})
export class LandingComponent {}
