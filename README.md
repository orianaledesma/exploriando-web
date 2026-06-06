# Exploriando

Sitio de la marca de viajes **Exploriando** — comunidad para viajeros LATAM
(guías, mapa de destinos, recursos) + una sección B2B (`/marcas`) que es el
media-kit para hoteles y experiencias. Angular 19, prerenderizado (SSG),
trilingüe (ES/EN/PT).

## Stack

- **Angular 19** standalone (sin NgModules) · signals · `OnPush` en todo.
- **SSG**: prerender de todas las rutas (`@angular/ssr`, `outputMode: static`).
- **SCSS con design tokens** (custom properties) — sin colores hardcodeados.
- **i18n** propio: `TRANSLATIONS` (ES/EN/PT) + `LanguageService` (signal).
- **Captura de email**: EmailJS (aviso) + función serverless que da de alta en
  MailerLite (el token vive server-side).
- Deploy: **GitHub Actions → Netlify** (estático + Netlify Functions en `/api/*`).

## Correr local

```bash
npm install
npm start                 # dev server (SPA, sin prerender) → http://localhost:4300
npm run build:prod        # build de producción CON prerender (lo que se publica)
```

`npm run build:prod` = `set-env.js` (inyecta env) → `ng build --configuration production`
(prerender de todas las rutas) → `generate-sitemap.mjs` (sitemap.xml + robots.txt).
Output: `dist/exploriando/browser/` (HTML completo por ruta).

Verificar que el prerender funciona (HTML real, no `<app-root>` vacío):

```bash
npx http-server dist/exploriando/browser -p 8080
curl -s http://localhost:8080/mapa/argentina/mendoza/ | grep '<title>'
# → <title>Mendoza, Argentina — Exploriando</title>
```

## Arquitectura

- **Rutas** (`src/app/app.routes.ts`): la landing es eager; el resto
  (`/mapa`, `/mapa/:country`, `/mapa/:country/:city`, `/blog`, `/blog/:slug`,
  `/marcas`, `/guia-acceso`) son lazy. Todas prerenderizan.
- **Contenido como dato**: los destinos viven en `src/app/data/places.ts` +
  markdown en `src/assets/content/places/<país>/<ciudad>.md`; los posts en
  `src/app/data/blog.ts` + `src/assets/content/blog/`. El prerender los lee
  solo (`app.routes.server.ts` → `getPrerenderParams`).
- **Diseño**: tokens de marca (navy/blue/aqua/pink + Montserrat/DM Sans) en
  `src/styles.scss`; los componentes consumen tokens, así que la marca se
  cambia desde un solo lugar.
- **Estado**: signals para UI local; `LanguageService` para el idioma; sin
  store global (no hace falta).
- **Funciones serverless** (`netlify/functions/`): `subscribe.ts` da de alta
  en MailerLite con el token server-side. Se exponen en `/api/*`.

## Estructura

```
src/app/
├── components/        # secciones del sitio (hero, about, mapa-teaser, ...)
├── pages/             # rutas (landing, mapa, blog, marcas, guia, guia-acceso)
├── services/          # language, email-capture, analytics, ...
├── data/              # places.ts, blog.ts (contenido tipado)
├── translations/      # TRANSLATIONS ES/EN/PT
└── models/            # tipos compartidos
netlify/functions/     # serverless (/api/*)
scripts/               # set-env.js, generate-sitemap.mjs
```

## Variables de entorno

Build-time (inyectadas por `scripts/set-env.js`, GitHub Secrets en CI):

| Variable | Para |
|---|---|
| `EMAILJS_SERVICE_ID` | Captura de email (EmailJS) |
| `EMAILJS_NOTIFICATION_TEMPLATE_ID` | Aviso a Oriana de nuevo suscriptor |
| `EMAILJS_CONFIRMATION_TEMPLATE_ID` | Email de bienvenida al suscriptor |
| `EMAILJS_PUBLIC_KEY` | Key pública de EmailJS |

Server-side (solo en la config del host, NUNCA en el bundle — las usan las
Netlify Functions):

| Variable | Para |
|---|---|
| `MAILER_API_TOKEN` | Token de la API de MailerLite |
| `MAILER_GROUP_ID` | Grupo donde se da de alta al suscriptor |

GA4 (`G-QS5SN1M3H3`) va hardcodeado en `index.html` con Consent Mode v2
(analytics denegado hasta que el usuario acepta el banner de cookies).

## Agregar contenido / rutas

- **Ciudad/país nuevo:** entrada en `src/app/data/places.ts` + su markdown.
  Se prerenderiza solo.
- **Ruta estática nueva:** agregarla a `src/app/app.routes.ts`; el catch-all
  de prerender la toma.
- **Post de blog:** `src/assets/content/blog/<slug>.md` + entrada en
  `src/app/data/blog.ts`.

## Tests

```bash
npm test    # Jasmine/Karma (headless: --watch=false --browsers=ChromeHeadless)
```

Cubren la lógica de servicios (captura de email, idioma) y comportamiento de
componentes (forms, tracking, render por idioma).

## Decisiones y trade-offs

- **SSG en vez de SSR runtime.** El contenido es estático (guías, mapa), así que
  prerenderizar da el mismo SEO sin servidor que mantener. Costo: el contenido
  nuevo entra con un build, no en vivo.
- **Sin librería de UI.** Todo a mano con tokens y HTML semántico → control
  total del peso y la marca. Costo: más trabajo en primitivas con a11y.
- **Tema por tokens.** "Build once, theme always": cambiar la paleta es editar
  `styles.scss`, no cada componente.
- **Se removió el generador de documentación con IA** (Anthropic). Estaba oculto
  y consumía créditos sin uso real; el backend serverless quedó solo para la
  captura de email. Si se reactiva, conviene un endpoint dedicado con rate-limit.
- **MailerLite + EmailJS.** EmailJS (client-side) avisa y manda la bienvenida;
  el alta real a la lista pasa por la función serverless (token protegido).

## Pendientes conocidos

- `lite-youtube` tiene un warning de CSP (NG0904) pre-existente en prerender;
  es un facade ya optimizado, se salda aparte.
- Para que el alta/baja de email funcione en prod faltan las env vars del lado
  de Netlify (`MAILER_API_TOKEN`, `MAILER_GROUP_ID`) y las plantillas EmailJS
  ES/EN configuradas.
