import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { MapaTeaserComponent } from '../../components/mapa-teaser/mapa-teaser.component';
import { ViajeroCreadorComponent } from '../../components/viajero-creador/viajero-creador.component';
import { AfiliadosComponent } from '../../components/afiliados/afiliados.component';
import { RecursosComponent } from '../../components/recursos/recursos.component';
import { UgcComponent } from '../../components/ugc/ugc.component';

// Sección "Comunidad" reemplazada por MapaTeaser (decisión 2026-04-30):
// el mapa interactivo cumple mejor el rol de "qué ganás sumándote" porque
// muestra el contenido real del canal en vez de bullets abstractos.
//
// DocumentacionComponent sigue oculto — consume créditos de Anthropic API.

@Component({
  selector: 'app-landing',
  template: `
    <app-hero />
    <app-mapa-teaser />
    <app-about />
    <app-viajero-creador />
    <app-afiliados />
    <app-recursos />
    <app-ugc />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroComponent,
    MapaTeaserComponent,
    AboutComponent,
    ViajeroCreadorComponent,
    AfiliadosComponent,
    RecursosComponent,
    UgcComponent,
  ],
})
export class LandingComponent {}
