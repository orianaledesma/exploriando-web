import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { CaminosComponent } from '../../components/caminos/caminos.component';
import { EnVivoComponent } from '../../components/en-vivo/en-vivo.component';
import { RecursosComponent } from '../../components/recursos/recursos.component';
import { MapaTeaserComponent } from '../../components/mapa-teaser/mapa-teaser.component';
import { AboutComponent } from '../../components/about/about.component';
import { AsesoriasComponent } from '../../components/asesorias/asesorias.component';
import { MarcasTeaserComponent } from '../../components/marcas-teaser/marcas-teaser.component';
import { AfiliadosComponent } from '../../components/afiliados/afiliados.component';

// Orden de la maqueta versión 2 (2026-10-01). El cambio de fondo es que la
// home dejó de ser un funnel único y pasó a ser un ruteador por audiencia:
//
//   captura corta (hero)
//   → elegí tu camino (caminos)
//   → el vivo, que es donde más se encuentra la gente
//   → promesa gratis (recursos) y prueba de valor (mapa)
//   → confianza (about) y asesoría
//   → derivación B2B (marcas-teaser) y herramientas (afiliados)
//   → el CTA final de comunidad, que vive en el footer
//
// Movimientos respecto del orden anterior: recursos pasa antes del mapa, y
// marcas-teaser antes de afiliados — el B2B deja de ser lo último que se ve.
//
// DESMONTADAS, con componente y copy ES/EN/PT intactos:
//
// - `guias-premium`: fuera de la oferta desde 2026-08-31. Iba entre
//   mapa-teaser y recursos.
// - `viajero-creador` (teaser) y `latina-connection` (banda): los absorbió el
//   ruteador. Sus tarjetas son ahora la única puerta a /viajero-creador y a
//   latinaconnection.info; tenerlas también como sección mostraba el mismo
//   destino dos veces y le quitaba sentido al ruteador. Para reponer
//   cualquiera de las dos, reimportarla y agregar su tag al template.

@Component({
  selector: 'app-landing',
  template: `
    <app-hero />
    <app-caminos />
    <app-en-vivo />
    <app-recursos />
    <app-mapa-teaser />
    <app-about />
    <app-asesorias />
    <app-marcas-teaser />
    <app-afiliados />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroComponent,
    CaminosComponent,
    EnVivoComponent,
    RecursosComponent,
    MapaTeaserComponent,
    AboutComponent,
    AsesoriasComponent,
    MarcasTeaserComponent,
    AfiliadosComponent,
  ],
})
export class LandingComponent {}
