# Exploriando

Angular 19 · SSG (prerender) · Netlify.

## Correr local

```bash
npm install
npm start                 # dev server (SPA, sin prerender) → http://localhost:4300
npm run build:prod        # build de producción CON prerender (lo que va a Netlify)
```

`npm run build:prod` = `set-env.js` (inyecta env) → `ng build --configuration production`
(prerender de todas las rutas) → `generate-sitemap.mjs` (sitemap.xml + robots.txt).
Output: `dist/exploriando/browser/` (HTML completo por ruta).

Verificar prerender:

```bash
npx http-server dist/exploriando/browser -p 8080
curl -s http://localhost:8080/mapa/argentina/mendoza/ | grep '<title>'
# → <title>Mendoza, Argentina — Exploriando</title>  (HTML real, no <app-root> vacío)
```

## Variables de entorno

Se inyectan en build via `scripts/set-env.js` (GitHub Secrets en CI):

| Variable | Para |
|---|---|
| `EMAILJS_SERVICE_ID` | Captura de email (EmailJS) |
| `EMAILJS_NOTIFICATION_TEMPLATE_ID` | Email de aviso a Oriana |
| `EMAILJS_CONFIRMATION_TEMPLATE_ID` | Email de bienvenida al suscriptor |
| `EMAILJS_PUBLIC_KEY` | Key pública EmailJS |

GA4 (`G-QS5SN1M3H3`) está hardcodeado en `index.html` con Consent Mode v2
(analytics denegado hasta que el usuario acepta el banner de cookies).

## Agregar una ruta al prerender

- **Ciudad/país nuevo:** se agrega a `src/app/data/places.ts`. El prerender
  los lee solo (`src/app/app.routes.server.ts` → `getPrerenderParams`).
- **Ruta estática nueva** (ej. `/precios`): agregarla a `src/app/app.routes.ts`.
  El catch-all `{ path: '**', renderMode: Prerender }` la prerenderiza sola.
- **Artículo de blog:** crear `src/assets/content/blog/<slug>.md` + una entrada
  en `src/app/data/blog.ts`. Se prerenderiza solo en `/blog/<slug>`.

## Lighthouse (antes/después)

Capturar con Chrome real (no se puede fabricar acá):

```bash
npx http-server dist/exploriando/browser -p 8080
npx lighthouse http://localhost:8080/ --only-categories=performance,seo \
  --form-factor=mobile --output=json --output-path=./lh-home.json
```

**Antes (SPA, sin SSR):** SEO bajo — el crawler recibía `<app-root>` vacío,
contenido 0 en el primer response.
**Después (SSG):** cada ruta devuelve HTML completo con title/description/JSON-LD
únicos + sitemap. SEO esperado ≥ 95 (criterio del brief). Correr el comando de
arriba en las 3 URLs principales para el número exacto antes de cerrar.

## Estimación / riesgos (registro de ingeniería)

| Bloque | Estado | Horas aprox |
|---|---|---|
| SSR/prerender (P1) | ✅ hecho | 4–6 |
| Meta tags por ruta + sitemap/robots | ✅ hecho | 2–3 |
| Cookie consent GDPR (Consent Mode v2) | ✅ hecho | 2 |
| Afiliados (UTM + `affiliate_click`) | ✅ hecho | 1 |
| NgOptimizedImage (about + thumbnails) | ✅ hecho | 1 |
| Terreno blog SSR | ✅ hecho | 2 |
| GA4 + eventos | ✅ ya estaba (2026-05-07) | — |
| Captura email | ✅ ya estaba (EmailJS; Mailerlite pospuesto) | — |
| CTA hero above-the-fold | ✅ ya existía (form + botón) | — |

**Riesgos detectados:**
- **Deuda de tests pre-existente** (~10–19 specs de copy/contenido/CSP) que
  CI ignora con `continue-on-error`. No bloquea pero conviene saldarla.
- **lite-youtube** tiene un issue de CSP (NG0904) pre-existente; no se tocó
  (es facade ya optimizado). Saldar aparte.
- **Mailerlite** pospuesto por decisión de negocio — la captura sigue por
  EmailJS (no entra a una lista con welcome flow todavía).
- Hosting Netlify de Exploriando OK (cuenta distinta a orianaledesma.dev,
  sin el problema de créditos).
