import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { MarcasComponent } from './pages/marcas/marcas.component';
import { GuiaComponent } from './pages/guia/guia.component';

export const routes: Routes = [
  { path: '',       component: LandingComponent },
  { path: 'marcas', component: MarcasComponent  },
  { path: 'guia',   component: GuiaComponent    },

  // Mapa + listado por país + blog post por ciudad — lazy para no inflar la landing.
  {
    path: 'mapa',
    loadComponent: () => import('./pages/mapa/mapa.component').then(m => m.MapaComponent),
  },
  {
    path: 'mapa/:country',
    loadComponent: () => import('./pages/mapa/country/country-list.component').then(m => m.CountryListComponent),
  },
  {
    path: 'mapa/:country/:city',
    loadComponent: () => import('./pages/mapa/place/place.component').then(m => m.PlaceComponent),
  },

  { path: '**', redirectTo: '' },
];
