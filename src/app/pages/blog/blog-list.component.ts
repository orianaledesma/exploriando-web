import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BLOG_POSTS } from '../../data/blog';
import { SeoService } from '../../services/seo.service';

/**
 * `/blog` — índice de artículos. Terreno: hoy BLOG_POSTS está vacío y
 * muestra un empty state. Al sumar posts en data/blog.ts se listan solos.
 */
@Component({
  selector: 'app-blog-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section class="container" style="padding: var(--space-xl) 0;">
      <h1>Guías</h1>
      @if (posts.length === 0) {
        <p>Pronto: guías concretas para viajar más por menos. Sumate al
           newsletter para enterarte cuando salgan.</p>
      } @else {
        <ul role="list">
          @for (p of posts; track p.slug) {
            <li>
              <a [routerLink]="['/blog', p.slug]">
                <strong>{{ p.title }}</strong> — {{ p.description }}
              </a>
            </li>
          }
        </ul>
      }
    </section>
  `,
})
export class BlogListComponent {
  readonly posts = BLOG_POSTS;

  constructor() {
    inject(SeoService).update({
      title: 'Guías de viaje — Exploriando',
      description:
        'Guías concretas para viajar más gastando menos: documentación, vuelos, presupuesto.',
      path: '/blog',
    });
  }
}
