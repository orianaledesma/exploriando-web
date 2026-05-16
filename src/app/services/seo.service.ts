import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

const SITE_NAME = 'Exploriando';
const ORIGIN = 'https://exploriando.page';
const DEFAULT_IMAGE = `${ORIGIN}/assets/images/og-image.jpeg`;

export interface SeoData {
  /** Full <title>. */
  title: string;
  description: string;
  /** Absolute or root-relative path of the canonical URL (e.g. /mapa/argentina). */
  path: string;
  image?: string;
  type?: 'website' | 'article';
  /** JSON-LD object — serialized into a <script type="application/ld+json">. */
  jsonLd?: Record<string, unknown>;
}

/**
 * Per-route SEO: title, description, Open Graph / Twitter, canonical and
 * JSON-LD. SSR-safe — Title/Meta come from platform-browser (provided on the
 * server too) and DOM writes go through the injected DOCUMENT, which
 * platform-server populates during prerender.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  /** Applies all SEO tags for the current route. */
  update(data: SeoData): void {
    const url = data.path.startsWith('http')
      ? data.path
      : `${ORIGIN}${data.path.startsWith('/') ? '' : '/'}${data.path}`;
    const image = data.image ?? DEFAULT_IMAGE;
    const type = data.type ?? 'website';

    this.title.setTitle(data.title);

    this.setName('description', data.description);
    this.setProp('og:title', data.title);
    this.setProp('og:description', data.description);
    this.setProp('og:url', url);
    this.setProp('og:image', image);
    this.setProp('og:type', type);
    this.setProp('og:site_name', SITE_NAME);
    this.setName('twitter:card', 'summary_large_image');
    this.setName('twitter:title', data.title);
    this.setName('twitter:description', data.description);
    this.setName('twitter:image', image);

    this.setCanonical(url);
    this.setJsonLd(data.jsonLd ?? null);
  }

  private setName(name: string, content: string): void {
    this.meta.updateTag({ name, content });
  }

  private setProp(property: string, content: string): void {
    this.meta.updateTag({ property, content });
  }

  private setCanonical(url: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setJsonLd(data: Record<string, unknown> | null): void {
    const id = 'seo-jsonld';
    this.doc.getElementById(id)?.remove();
    if (!data) return;
    const script = this.doc.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    this.doc.head.appendChild(script);
  }
}
