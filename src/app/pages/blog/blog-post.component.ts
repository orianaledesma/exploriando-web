import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { findBlogPost } from '../../data/blog';
import { BlogContentService } from '../../services/blog-content.service';
import { SeoService } from '../../services/seo.service';

/**
 * `/blog/:slug` — artículo. Carga el .md homónimo y renderiza el cuerpo.
 * notFound si el slug no está en BLOG_POSTS.
 */
@Component({
  selector: 'app-blog-post',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <article class="container" style="padding: var(--space-xl) 0;">
      @if (post(); as p) {
        <h1>{{ p.title }}</h1>
        <div [innerHTML]="bodyHtml()"></div>
      } @else {
        <h1>Artículo no encontrado</h1>
        <p><a routerLink="/blog">← Volver a las guías</a></p>
      }
    </article>
  `,
})
export class BlogPostComponent {
  private readonly content = inject(BlogContentService);
  private readonly seo = inject(SeoService);

  /** Route param :slug (bound via withComponentInputBinding). */
  readonly slug = input<string>('');

  readonly post = computed(() => findBlogPost(this.slug()));
  private readonly _html = signal('');
  readonly bodyHtml = this._html.asReadonly();

  constructor() {
    effect(() => {
      const p = this.post();
      if (!p) return;
      this.seo.update({
        title: `${p.title} — Exploriando`,
        description: p.description,
        path: `/blog/${p.slug}`,
        type: 'article',
      });
      this.content.load(p.slug).subscribe((html) => this._html.set(html ?? ''));
    });
  }
}
