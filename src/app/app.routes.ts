import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { GuiaComponent } from './pages/guia/guia.component';

export const routes: Routes = [
  { path: '',       component: LandingComponent },
  // /marcas es lazy: media-kit pesado (portfolio + secciones) que el visitante
  // de la home casi nunca abre. Prerendera igual (SSG soporta lazy routes).
  {
    path: 'marcas',
    loadComponent: () => import('./pages/marcas/marcas.component').then(m => m.MarcasComponent),
  },
  { path: 'guia',   component: GuiaComponent    },

  // Viajero Creador — pestaña propia (antes era una sección de la home).
  // Lazy: playlist + grilla de videos + waitlist, contenido que el visitante
  // de la home no siempre abre. Prerendera igual (SSG soporta lazy routes).
  {
    path: 'viajero-creador',
    loadComponent: () =>
      import('./pages/viajero-creador/viajero-creador-page.component')
        .then(m => m.ViajeroCreadorPageComponent),
  },

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

  // Blog / guías — terreno listo y prerenderizable (contenido se suma en data/blog.ts).
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog-list.component').then(m => m.BlogListComponent),
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./pages/blog/blog-post.component').then(m => m.BlogPostComponent),
  },

  // Página privada de la guía — solo accesible vía el link del email de MailerLite.
  {
    path: 'guia-acceso',
    loadComponent: () => import('./pages/guia-acceso/guia-acceso.component').then(m => m.GuiaAccesoComponent),
  },

  // Baja de la lista — link en el footer del email de bienvenida (EmailJS).
  {
    path: 'baja',
    loadComponent: () => import('./pages/baja/baja.component').then(m => m.BajaComponent),
  },

  { path: '**', redirectTo: '' },
];
