import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { MarcasComponent } from './pages/marcas/marcas.component';

export const routes: Routes = [
  { path: '',       component: LandingComponent },
  { path: 'marcas', component: MarcasComponent  },
  { path: '**',     redirectTo: ''              },
];
