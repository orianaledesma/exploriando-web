/**
 * Blog / guías — registro de artículos.
 *
 * INFRAESTRUCTURA SOLAMENTE: hoy está vacío a propósito. Para sumar un
 * artículo (sin tocar componentes ni rutas):
 *   1. Crear src/assets/content/blog/<slug>.md  (frontmatter + cuerpo markdown)
 *   2. Agregar una entrada acá con el mismo `slug`
 *   3. El build lo prerenderiza solo (app.routes.server.ts lee este array)
 */
export interface BlogPost {
  /** Slug URL-safe → /blog/<slug> y nombre del .md. */
  slug: string;
  title: string;
  description: string;
  /** ISO date (YYYY-MM-DD) para orden y meta. */
  date: string;
}

export const BLOG_POSTS: BlogPost[] = [];

export function findBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
