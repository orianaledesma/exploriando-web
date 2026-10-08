import { Lang } from '../models/language.model';

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * Clave estable de cada pieza del portafolio. Une la fila estructural del
 * componente (id de YouTube, frame, links) con su texto traducido, para no
 * triplicar ids ni URLs en los tres idiomas.
 */
export type PortfolioPieceKey =
  | 'forest-domes' | 'parrotel' | 'casa-del-lago'
  | 'vero-cafe' | 'sharm-gastro' | 'cafeteria'
  | 'empanadas' | 'pastel-papa' | 'noquis'
  | 'globo' | 'boxeo' | 'who-win'
  | 'shopping' | 'unboxing';

interface NavLink        { label: string; href: string; }
/** Una opción contratable dentro de un servicio. */
interface ServicioOpcionT {
  name: string;
  /** Plazo o unidad de venta: "1 semana", "Por mes", "1 pieza". */
  scope: string;
  body: string;
  includes: string[];
}
interface ServicioT {
  title: string;
  /** Para quién es, en una línea. */
  para: string;
  body: string;
  bullets: string[];
  options: ServicioOpcionT[];
  /** A quién le llega. Vacío en los servicios donde no aplica. */
  audienceTitle: string;
  audience: string;
  /** Letra chica: licencias, extras que se cotizan aparte. */
  note: string;
}
/** Una tarjeta del ruteador. `note` se rinde sólo si tiene contenido. */
interface CaminoCopy     { title: string; body: string; cta: string; note: string; }
interface FooterLink     { label: string; href: string; }
interface Stat           { value: string; label: string; }
interface Topic          { title: string; description: string; }
interface Package        { badge: string; name: string; desc?: string; price?: string; delivery: string; includes: string[]; }
interface Testimonial    { quote: string; author: string; }
interface PremiumGuide   { title: string; place: string; price: string; cta: string; url: string; }
/** Un paso de la línea de tiempo "Cómo trabajo" de /marcas. */
interface ProcessStep    { title: string; items: string[]; }

interface AppTranslations {
  nav: { links: NavLink[]; cta: string; };
  hero: {
    eyebrow: string;
    /** El titular va partido en dos: la segunda mitad se rinde en itálica y
     *  con el color de acento. Partirlo acá en vez de meter markup en el copy
     *  mantiene las traducciones como texto plano. */
    headlineA: string; headlineB: string;
    subheadline: string;
    ctaLive: string; ctaGuides: string;
    socialProof: string;
  };
  about: { sectionLabel: string; headline: string; body: string[]; stats: Stat[]; crossSell: string; };
  viajeroCreador: {
    sectionLabel: string; headline: string; subheadline: string; intro: string;
    /** Teaser de la home. El contenido completo vive en /viajero-creador. */
    teaser: { headline: string; text: string; cta: string; };
    /** Hero de la página /viajero-creador. */
    hero: { sectionLabel: string; headline: string; text: string; cta: string; };
    /** Sección "Aprendé gratis": playlist embebida + grilla de videos. */
    free: { title: string; subtitle: string; cta: string; };
    /** El curso completo. Hoy en lista de espera; los campos de venta ya están
     *  para que pasar a `MODO = 'venta'` no requiera rediseñar el bloque. */
    curso: {
      sectionLabel: string; title: string; text: string;
      emailLabel: string; waitlistCta: string; note: string; success: string;
      errorEmail: string; errorGeneric: string; errorRate: string;
      price: string; salesCta: string; includes: string[];
    };
    meta: { title: string; description: string; };
    topics: Topic[];
    youtube: { badge: string; text: string; cta: string; };
    sessions: {
      preTitle: string; title: string; sub: string;
      coversTitle: string; covers: string[];
      session1Name: string; session1Duration: string;
      session2Name: string; session2Duration: string; session2Badge: string;
      cta: string; ctaNote: string;
    };
  };
  recursos: {
    sectionLabel: string; headline: string; subheadline: string; guideTitle: string;
    guideContents: string[]; videoLabel: string;
    form: { emailLabel: string; emailPlaceholder: string; cta: string; ctaLoading: string; privacyNote: string; };
    successMessage: string; alreadySubscribed: string;
    testimonial: { quote: string; author: string; location: string; };
  };
  ugc: {
    // ─── Hero ──────────────────────────────────────────────────────────
    heroBack: string; heroLabel: string;
    headline: string; subheadline: string;
    sectionLabel: string;
    // ─── Quién soy + audiencia ─────────────────────────────────────────
    quienSoy: {
      /** Título de la sección (visually-hidden, landmark a11y). */
      heading: string;
      /** Párrafo(s) de presentación. */
      body: string[];
      howTitle: string; howBody: string;
    };
    /** Franja de specs bajo el hero: capacidades de PRODUCCIÓN, no alcance. */
    specs: string[];
    /** Alts de los dos frames que van como naipes en el hero. */
    heroCardAlts: string[];
    // ─── Portfolio (antes hardcodeado en el HTML) ──────────────────────
    portfolioTitle: string; portfolioSubtitle: string;
    /**
     * Una entrada por categoría del portafolio, con el mismo id que CATEGORIES
     * en marcas.component.ts. `intro` dice cómo se graba esa categoría: es lo
     * que convierte la pestaña en un argumento de venta y no en un filtro.
     */
    portfolioCategories: Record<
      'hoteleria' | 'gastronomia' | 'cocina' | 'experiencias' | 'moda',
      { label: string; intro: string }
    >;
    /** Tarjeta que ocupa el lugar de una categoría todavía sin piezas. */
    portfolioEmpty: { title: string; note: string };
    /**
     * Texto de cada pieza. Lo estructural (id, frame, links) vive en el
     * componente; acá sólo lo que cambia de idioma. Un `location` vacío es
     * válido: la tarjeta omite esa línea.
     */
    portfolioPieces: Record<
      PortfolioPieceKey,
      { title: string; location: string }
    >;
    /**
     * Etiquetas accesibles de los links de cada tarjeta. `piece` lleva el
     * marcador {title}, que el componente reemplaza por el título traducido.
     */
    portfolioLinks: { piece: string; yt: string; ig: string };

    // ─── Servicios (maqueta v2, 2026-10-05) ───────────────────────────────
    /**
     * Tres formas de trabajar más un paquete a medida. Reemplaza la grilla de
     * paquetes sueltos: antes todo era producción UGC; ahora se distingue
     * producir material para la marca de aparecer en los canales de Ori, que
     * son negocios distintos con audiencias distintas.
     */
    servicios: {
      sectionLabel: string;
      title: string;
      lead: string;
      optionsTitle: string;
      expandCta: string;
      collapseCta: string;
      items: ServicioT[];
      custom: {
        title: string; body: string; cta: string;
      };
    };
    portfolioExpandCta: string;
    portfolioMoreText: string; portfolioMoreCta: string;
    // ─── Hoteles & experiencias (entrada de baja fricción) ─────────────
    hoteles: {
      title: string; body: string;
      startTitle: string; startBody: string;
    };
    // ─── Testimonios (la sección se oculta si `testimonials` está vacío) ─
    testimonialsTitle: string; testimonials: Testimonial[];
    // ─── Precios: tarjeta de entrada + 3 tiers ─────────────────────────
    packagesTitle: string;
    packages: Package[];
    /** Los 3 servicios que aparecen al desplegar "Ver más servicios". */
    packagesExtra: Package[];
    packagesExpandCta: string; packagesCollapseCta: string;
    /** Nota de derechos de uso, debajo de las dos grillas. */
    rightsNote: string;
    /** CTA "3 datos para cotizar" que cierra la sección de servicios. */
    quote: { title: string; items: string[]; closing: string; };
    /** Línea de tiempo "Cómo trabajo": 4 pasos, entre los servicios y el CTA. */
    proceso: { title: string; subtitle: string; steps: ProcessStep[]; };
    /** Puente al taller: preparado pero OCULTO — la página todavía no existe. */
    taller: { title: string; text: string; cta: string; };
    // ─── CTA final (antes hardcodeado en el HTML) ──────────────────────
    /** Par de botones de contacto directo, reutilizado en toda la página. */
    contact: {
      instagram: string; mail: string; mailFull: string;
      /** Checklist que reemplaza a la llamada de descubrimiento. */
      briefTitle: string; briefItems: string[]; briefNote: string;
    };
    finalCta: { title: string; body: string; sub: string; };
    cta: string; ctaSubtext: string;
    meta: { title: string; description: string; };
  };
  /** Bloque "En vivo" — programa diario de cocina en YouTube. */
  enVivo: {
    /** Etiqueta y título quedan editables: falta definir nombre y horario. */
    sectionLabel: string; headline: string; text: string;
    cta: string; note: string;
    /** Nombre del programa y horario exacto — vacíos hasta que Oriana los defina.
     *  Se rinden sólo si tienen contenido, así el bloque no muestra huecos. */
    programName: string; schedule: string;
    /** Alt del frame de un vivo real (la imagen la provee Oriana). */
    imageAlt: string;
  };
  /** Guías premium de pago. Convive con el mapa de guías gratis. */
  guiasPremium: {
    sectionLabel: string; headline: string; text: string;
    /** Lista de espera — el modo publicado hoy. */
    emailLabel: string; waitlistCta: string; note: string; success: string;
    errorEmail: string; errorGeneric: string; errorRate: string;
    /** Modo venta (apagado hasta que la primera guía esté publicada). */
    price: string; cta: string;
    /** 1-3 guías, sólo se rinden en modo venta. */
    guias: PremiumGuide[];
  };
  marcasTeaser: { sectionLabel: string; headline: string; text: string; cta: string; };
  /** Cross-promo a Latina Connection, el curso de español argentino que Ori da
   *  con su marido. Es una marca aparte, no un producto de Exploriando: se
   *  muestra en los tres idiomas, y como las clases son en inglés, `note` lo
   *  aclara para quien navega en ES o PT. */
  latinaConnection: {
    sectionLabel: string; headline: string; text: string; note: string; cta: string;
  };

  /** Ruteador por audiencia, arriba de la home. Cuatro caminos, uno por
   *  intención: viajar, crear contenido, aprender español, contratar.
   *  Reemplaza a los teasers de Viajero Creador y Latina Connection, que
   *  quedaron desmontados — las tarjetas son ahora la única puerta. */
  caminos: {
    sectionLabel: string; headline: string; intro: string;
    viajar: CaminoCopy; crear: CaminoCopy; espanol: CaminoCopy; marca: CaminoCopy;
  };
  mapaTeaser: {
    sectionLabel: string; headline: string; lead: string;
    countriesLabel: string; placesLabel: string; yearsLabel: string;
    mapHint: string; cta: string;
    /** aria-label del SVG decorativo en MapaTeaser. */
    mapAriaLabel: string;
  };
  mapa: {
    eyebrow: string; title: string; subtitle: string;
    countriesLabel: string; placesLabel: string; yearsLabel: string;
    mapHint: string;
    /** aria-label del SVG en /mapa. */
    mapAriaLabel: string;
    /** Tooltip mostrado en hover/focus de un city-marker. Soporta `{city}` y `{country}`. */
    markerTooltip: string;
    /** aria-label del link de cada city-marker. Soporta `{city}` y `{country}`. */
    markerAriaLabel: string;
    /** aria-label del nav de países visitados. */
    countriesNavLabel: string;
    /** Sufijo plural de ciudades en items de la lista (ej. "ciudades" → "7 ciudades"). */
    citiesCountSuffix: string;
    /** Sufijo singular para count = 1 (ej. "ciudad" → "1 ciudad"). */
    citiesCountSuffixOne: string;
    crumbMap: string; bestMonthsLabel: string; loading: string;
    moreInCountry: string;
    /** Soporta interpolación: usar `{city}` para inyectar el nombre de la ciudad. */
    ctaTitle: string;
    ctaBody: string; ctaButton: string;
    notFoundTitle: string; notFoundBody: string; backToMap: string;
  };
  countryList: {
    /** Eyebrow arriba del título. Soporta `{country}`. */
    eyebrow: string;
    /** Título principal. Soporta `{country}`. */
    title: string;
    /** Subtítulo del header. Soporta `{country}`. */
    subtitle: string;
    /** Texto del breadcrumb hacia /mapa. */
    backToMap: string;
    /** aria-label del grid de ciudades. Soporta `{country}`. */
    citiesGridLabel: string;
    /** CTA secundario al pie del listado (deprecated, ya no se usa). */
    viewOnMapCta: string;
    // ─── Stats line del header (M2) ─────────────────────────────────────
    /** Pill 1 plural. Soporta `{count}`. */
    statsCitiesOther: string;
    /** Pill 1 singular. Soporta `{count}`. */
    statsCitiesOne: string;
    /** Pill 2 plural. Soporta `{count}`. */
    statsVideosOther: string;
    /** Pill 2 singular. Soporta `{count}`. */
    statsVideosOne: string;
    /** Pill 3 estática. */
    statsYears: string;
    // ─── Estado A: slug inválido (país no existe en COUNTRIES) ──────────
    notFoundTitle: string;
    notFoundBody: string;
    // ─── Estado B: país válido sin places aún ───────────────────────────
    /** Soporta `{country}`. */
    pendingTitle: string;
    pendingBody: string;
    pendingCta: string;
    pendingBackToMap: string;
    // ─── Footer CTAs (B2) ──────────────────────────────────────────────
    footerCtaIntro: string;
    footerCtaPrimary: string;
    footerCtaSecondary: string;
    // ─── Misc ──────────────────────────────────────────────────────────
    /** Sufijo del alt text del thumbnail YouTube (ej "— video"). */
    thumbAltSuffix: string;
  };
  footer: {
    finalCta: { headline: string; subheadline: string; cta: string; ctaSubtext: string; };
    footer: {
      tagline: string;
      columns: {
        explore:   { title: string; links: FooterLink[]; };
        community: { title: string; links: FooterLink[]; };
        brands:    { title: string; links: FooterLink[]; };
      };
      legal: string; disclaimer: string; madeIn: string;
    };
  };
  a11y: {
    /** Texto del skip link (visible solo on focus). */
    skipLink: string;
  };
  cookieConsent: {
    message: string;
    accept: string;
    reject: string;
  };
}

// ─── Español ──────────────────────────────────────────────────────────────────

const es: AppTranslations = {
  nav: {
    links: [
      { label: 'Nosotros',        href: '#about' },
      { label: 'Viajero Creador', href: '/viajero-creador' },
      { label: 'Marcas',          href: '/marcas' },
      { label: 'Recursos',        href: '#recursos' },
    ],
    cta: 'Unirme a la comunidad',
  },
  hero: {
    eyebrow:     'Una argentina, un lituano y el mundo en el medio',
    headlineA:   'Viajá con los ojos,',
    headlineB:   'comé con el alma.',
    subheadline: 'Soy Ori y con mi esposo lituano te mostramos cómo se vive, se come y qué pasa cuando dos culturas se mezclan.',
    ctaLive:     'Unirme al vivo de hoy',
    ctaGuides:   'Ver guías de destinos',
    // 42 es el número real de ciudades en src/app/data/places.ts. Antes decía
    // 54, que no coincidía con el mapa que el visitante puede contar.
    socialProof: '+2.000 viajeros · 42 ciudades · 9 años viajando',
  },
  about: {
    sectionLabel: 'Quiénes somos',
    headline:     'Una argentina que dejó de esperar el momento perfecto.',
    body: [
      'Me llamo Ori. Hace años decidí que no iba a esperar tener más dinero, más tiempo o más seguridad para viajar. Agarré lo que tenía y me fui.',
      'Después se sumó mi esposo lituano, y Exploriando dejó de ser un proyecto mío para ser de los dos. Yo pongo la mirada de la latina que se enfrentó a cada trámite y cada miedo desde cero; él, la del europeo que vive donde para muchos es destino. Las rutas, las guías y los videos los pensamos, los viajamos y los grabamos juntos.',
    ],
    stats: [
      { value: '42', label: 'ciudades recorridas' },
      { value: '9',   label: 'años viajando full time' },
      { value: '3',   label: 'continentes desde cero' },
    ],
    crossSell:    'Exploriando lo construí yo, de punta a punta — el sitio, las guías y hasta el sistema de IA que lo opera por detrás. Soy creadora de contenido e ingeniera de software: por eso acá todo funciona, se mide y mejora.',
  },
  viajeroCreador: {
    sectionLabel:    'Viajero Creador',
    headline:        'Viajar y crear contenido no son dos caminos distintos.',
    subheadline:     'Cada vez más personas pagan sus viajes creando contenido en el camino. No necesitás millones de seguidores. Necesitás saber cómo empezar.',
    intro:           'Esta sección es para los que quieren más que fotos lindas: quieren que viajar sea sostenible. Acá vas a aprender cómo convertir tu cámara, tu historia y tus destinos en algo que te financie.',
    teaser: {
      headline: 'Viajar y crear contenido no son dos caminos distintos.',
      text:     'Cada vez más personas pagan sus viajes creando contenido en el camino. No necesitás millones de seguidores: necesitás saber cómo empezar. Todo lo que aprendí en 9 años, ordenado en una sola página.',
      cta:      'Entrar',
    },
    hero: {
      sectionLabel: 'VIAJERO CREADOR',
      headline:     'Documentá tus viajes con criterio, no con suerte.',
      text:         'Todo lo que aprendí en 9 años grabando con el celular: cómo contar un viaje para que la gente se quede, qué grabar antes de que se te pase, y cómo editar sin volverte loca. Primero gratis. Y cuando quieras ir más a fondo, el curso completo.',
      cta:          'Empezar por lo gratis',
    },
    free: {
      title:    'Aprendé gratis',
      subtitle: 'La playlist completa, en orden, en YouTube.',
      cta:      'Ver toda la playlist en YouTube',
    },
    curso: {
      sectionLabel: 'EL CURSO',
      title:        'El curso completo está en camino.',
      text:         'Todo lo de la playlist, ordenado en un método: guion, grabación con el celular, edición y cómo distribuirlo. Con ejercicios y mis plantillas. Anotate y te aviso cuando salga.',
      emailLabel:   'Tu correo',
      waitlistCta:  'Avisame cuando salga',
      note:         'Cero spam. Solo el aviso.',
      success:      '¡Listo! Te aviso apenas salga.',
      errorEmail:   'Ingresá un correo válido.',
      errorGeneric: 'Algo falló. Intentá de nuevo.',
      errorRate:    'Demasiados intentos. Probá en un rato.',
      // Modo venta (apagado): precio, CTA y bullets ya listos.
      price:        '',
      salesCta:     'Comprar el curso',
      includes: [
        'Guion: cómo se cuenta un viaje',
        'Grabación con el celular, sin equipo extra',
        'Edición: el método rápido',
        'Distribución: dónde y cuándo publicar',
        'Ejercicios y mis plantillas',
      ],
    },
    meta: {
      title:       'Viajero Creador — Aprendé a documentar tus viajes | Exploriando',
      description: 'Cómo contar un viaje para que la gente se quede, qué grabar y cómo editar sin volverte loca. Playlist gratis en YouTube y el curso completo en camino.',
    },
    topics: [
      { title: 'Cómo empezar desde cero',    description: 'Qué equipo necesitás (spoiler: probablemente ya lo tenés), qué plataformas funcionan y cómo dar el primer paso sin audiencia.' },
      { title: 'Contenido que monetiza',      description: 'La diferencia entre postear y construir. Qué formatos pagan, qué marcas buscan, y cómo no depender de un solo ingreso.' },
      { title: 'Viajando mientras creás',     description: 'Cómo organizar tu tiempo para no perderte el viaje mientras lo grabás. El balance que nadie te cuenta en los videos de lifestyle.' },
      { title: 'Colaboraciones con marcas',   description: 'Cómo conseguir tu primera colaboración, qué pedir, qué evitar y cómo no laburar gratis.' },
    ],
    youtube: {
      badge: 'GRATIS EN YOUTUBE',
      text:  'Todo esto lo enseño gratis en mi canal. Cero curso pago: solo dale play, suscribite y empezá hoy.',
      cta:   'Ver todo gratis en YouTube',
    },
    sessions: {
      preTitle:         'Uno a uno',
      title:            'Cómo te ayudo con tu plan de viaje',
      sub:              'Una hora, vos y yo, sobre tu viaje real. Traés tus dudas y salís con un plan concreto y los próximos pasos claros — sin vueltas ni teoría.',
      coversTitle:      'Qué podemos ver juntas',
      covers: [
        'Armar tu ruta y tiempos sin morir en el intento',
        'Documentación y visas según tu pasaporte',
        'Vuelos baratos: cómo y cuándo cazarlos',
        'Presupuesto realista y cómo estirarlo',
        'Cómo arrancar a crear contenido en el camino',
      ],
      session1Name:     'Sesión individual',
      session1Duration: '45 min',
      session2Name:     'Pack 3 sesiones',
      session2Duration: '45 min cada una',
      session2Badge:    'Tu viaje planificado de punta a punta',
      cta:              'Reservar sesión',
      ctaNote:          'Te respondo en menos de 48hs con disponibilidad.',
    },
  },
  recursos: {
    sectionLabel:  'Recursos gratuitos',
    headline:      'La guía que hubiéramos querido tener antes de nuestro primer viaje.',
    subheadline:   'Sin relleno, sin teoría. Solo lo que realmente necesitás saber para organizar tu primer viaje sin gastar de más.',
    guideTitle:    'Guía para tu primer viaje',
    videoLabel:    'Mirá la guía explicada en video',
    guideContents: [
      'Documentos: qué fotocopiar, dónde guardarlo y los permisos que se olvidan',
      'Money y tarjetas: la tarjeta sin comisiones y apps para controlar gastos',
      'Bolso de mano perfecto: qué entra, qué no y qué no puede faltar',
      '5 apps imprescindibles: mapas offline, comunicación y hacks de vuelo',
      'Revisión final antes de volar: seguros, avisar al banco, último chequeo',
      'Tips de viajera inteligente: viajá más seguro, gastá menos, adaptate rápido',
    ],
    form: {
      emailLabel:   'Tu correo',
      emailPlaceholder: 'hola@tucorreo.com',
      cta:          'Quiero la guía gratis',
      ctaLoading:   'Enviando...',
      privacyNote:  'Cero spam. Podés darte de baja cuando quieras.',
    },
    successMessage:   '¡Listo! Revisá tu correo — la guía ya está en camino.',
    alreadySubscribed: 'Ya sos parte de la comunidad. Descargá la guía acá →',
    testimonial: {
      quote:    'La leí en una noche y al día siguiente ya tenía el viaje armado. No es teoría: es lo que tendrías que haber sabido antes de tu primer vuelo.',
      author:   'Camila D.',
      location: 'Santiago, Chile',
    },
  },
  ugc: {
    heroBack:    '← Volver',
    heroLabel:   'UGC & Contenido de marca',
    headline:    'Contenido real que hace desear lo que vendés.',
    subheadline: 'Reels y fotos de viaje en pareja, reales, para marcas de viaje y lifestyle: hoteles, experiencias y productos.',
    sectionLabel: 'Para marcas',
    quienSoy: {
      heading: 'Quién soy',
      body: [
        'Soy Oriana — creadora argentina de lifestyle y viajes 🇦🇷, viviendo en Lituania con mi marido lituano 🇱🇹. Hace 9 años documentamos viajes reales, y nuestro contenido en pareja es lo que más conecta: la escapada romántica, la aventura en familia, el lado humano de un lugar.',
      ],
      howTitle:       'Cómo trabajo:',
      howBody:        'te entrego contenido listo para TUS redes (UGC) — vos sos dueño/a de los videos y fotos. Y si querés, lo comparto también con mi comunidad.',
    },
    specs: [
      'Contenido en español nativo e inglés',
      'Grabación en destino — base en Lituania',
      '9 años documentando viajes con el celular',
    ],
    heroCardAlts: [
      'Frame de un video: Oriana en la entrada del hotel Parrotel, Sharm el Sheikh',
      'Frame de un video: pareja en un domo de cristal mirando al bosque',
    ],
    portfolioTitle:    'Portafolio de contenido',
    portfolioSubtitle: 'Contenido real grabado en destino, no en set. Así se ve el estilo que produzco — cada pieza linkea a su posteo original.',
    portfolioCategories: {
      hoteleria: {
        label: 'Hotelería',
        intro: 'Alojamientos grabados como una estadía real: la llegada, el primer ingreso, el amanecer, los detalles. No un recorrido de ambientes, sino la secuencia que hace que alguien se imagine adentro.',
      },
      gastronomia: {
        label: 'Gastronomía',
        intro: 'Producto en contexto: lo que se pide, cómo llega, cómo se ve en la mesa y qué se siente al probarlo. Formatos cortos pensados para que dé hambre, no para catalogar la carta.',
      },
      cocina: {
        label: 'Cocina',
        intro: 'Cocino en vivo de lunes a viernes en YouTube, una hora por día, contestando qué le pongo a cada plato. Un producto que aparece ahí se usa de verdad, delante de gente que pregunta.',
      },
      experiencias: {
        label: 'Experiencias',
        intro: 'Experiencias y actividades contadas desde adentro: la anticipación, el momento y la reacción. El formato que mejor funciona cuando lo que se vende es algo que se siente.',
      },
      moda: {
        label: 'Moda',
        intro: 'Producto en uso y en recorrido: cómo se ve puesto, cómo se elige, qué se lleva. Pensado para tiendas y marcas que venden algo que se prueba.',
      },
    },
    portfolioEmpty: {
      title: 'Próxima producción',
      note: 'Esta categoría todavía no tiene piezas publicadas.',
    },
    portfolioPieces: {
      'forest-domes': { title: 'Un día de relax en el bosque', location: 'Forest Domes · Vilnius, Lituania' },
      parrotel: { title: 'El resort con de todo', location: 'Resort Paradise · Sharm el Sheikh' },
      'casa-del-lago': { title: 'Casa del lago', location: '3Krantai' },
      'vero-cafe': { title: 'El mejor brunch', location: 'Vero Cafe · Lituania' },
      'sharm-gastro': { title: 'Experiencia gastronómica', location: 'Sharm el Sheikh' },
      cafeteria: { title: 'Cafetería', location: '' },
      empanadas: { title: 'Empanadas argentinas', location: 'Vivo de cocina · YouTube' },
      'pastel-papa': { title: 'Pastel de papa', location: 'Vivo de cocina · YouTube' },
      noquis: { title: 'Ñoquis caseros del 29', location: 'Vivo de cocina · YouTube' },
      globo: { title: 'Globo aerostático', location: 'Luxor, Egipto' },
      boxeo: { title: 'Boxeo', location: '' },
      'who-win': { title: 'Who win?', location: '' },
      shopping: { title: 'Shopping', location: 'Panamá' },
      unboxing: { title: 'Unboxing', location: '' },
    },
    portfolioLinks: {
      piece: 'Ver «{title}» en Instagram (abre en pestaña nueva)',
      yt: 'Ver en YouTube (abre en pestaña nueva)',
      ig: 'Ver en Instagram (abre en pestaña nueva)',
    },
    servicios: {
      sectionLabel: 'Servicios',
      title: 'Tres formas de trabajar conmigo',
      lead: 'Elegí según lo que necesites: material para tus canales, presencia en los míos, o las dos cosas.',
      optionsTitle: 'Opciones disponibles',
      expandCta: 'Ver opciones',
      collapseCta: 'Ocultar opciones',
      items: [
        {
          title: 'Contenido UGC',
          para: 'Para hoteles, restaurantes, experiencias y productos',
          body: 'Produzco el material y te lo entrego a vos. Es tuyo: lo usás en tus redes, tu web, tus fichas de OTA y tus ads. Mi audiencia no entra en la ecuación.',
          bullets: [
            'Videos verticales y fotos grabados en destino',
            'Varios hooks para testear cuál convierte',
            'En español y en inglés',
          ],
          options: [
            {
              name: 'Video UGC Suelto',
              scope: '1 semana',
              body: 'Para probar el formato con una pieza.',
              includes: [
                '1 video vertical de 15-60s, en español o inglés',
                'Hook y CTA definidos antes de grabar',
                '1 ronda de ajustes y subtítulos',
              ],
            },
            {
              name: 'Piloto Medido',
              scope: '2 semanas + medición 60 días',
              body: 'Para saber si funciona antes de escalar. Es el camino que recomiendo.',
              includes: [
                '3 videos verticales con 3 hooks distintos + 5 fotos, en tu propiedad',
                'Objetivos por escrito antes de grabar — qué querés que pase',
                'Medición de 3 métricas a 30 y 60 días, con reporte simple',
                'Si no funciona, el contenido queda para vos igual',
              ],
            },
            {
              name: 'Librería de Contenido',
              scope: '3-4 semanas',
              body: 'Para grupos, cadenas y operadores con varias propiedades.',
              includes: [
                '6 videos verticales + 10 clips de historias derivados',
                '10 fotos lifestyle para web, redes y OTAs',
                'Set completo de formatos y guion incluido',
              ],
            },
          ],
          audienceTitle: '',
          audience: '',
          note: 'Todas las opciones incluyen licencia de uso orgánico por 90 días. Publicidad paga, whitelisting, perpetuidad, material en crudo y exclusividad se cotizan como línea aparte en la propuesta.',
        },
        {
          title: 'Entretenimiento en redes',
          para: 'Para marcas que quieren llegar a mi comunidad de Instagram',
          body: 'Tu marca aparece en mi contenido de viaje y lifestyle, publicado en mis canales. El formato es el mismo con el que la gente ya me sigue, así que no se lee como un aviso.',
          bullets: [
            'Reels e historias publicados en mis redes',
            'Integración dentro de la historia, no una placa',
            'Audiencia principalmente latinoamericana',
          ],
          options: [
            {
              name: 'Reel publicado',
              scope: '1 pieza',
              body: 'Una aparición en mi feed, integrada en el contenido.',
              includes: [
                '1 reel con tu producto o lugar dentro de la historia',
                'Guion compartido antes de grabar',
                'Mención y link en el posteo',
              ],
            },
            {
              name: 'Reel + historias',
              scope: '1 pieza + apoyo',
              body: 'El reel más la secuencia de historias que lo acompaña.',
              includes: [
                '1 reel publicado en el feed',
                'Secuencia de historias con link directo',
                'Historias guardadas en destacados',
              ],
            },
            {
              name: 'Pack mensual',
              scope: 'Por mes',
              body: 'Presencia sostenida durante todo el mes, no una aparición suelta.',
              includes: [
                'Varias piezas repartidas en el mes',
                'Historias de apoyo en cada publicación',
                'Reporte mensual de alcance y comentarios',
              ],
            },
          ],
          audienceTitle: 'A quién le llega',
          audience: 'Comunidad adulta de 25 a 45 años, mayoritariamente en Argentina, Panamá, Guatemala, Brasil y República Dominicana. Es el servicio indicado si tu marca vende en Latinoamérica.',
          note: 'Si además querés el material para usarlo en tus propios canales, se suma como línea aparte en la propuesta.',
        },
        {
          title: 'Entretenimiento en vivo',
          para: 'Para marcas de alimentos, cocina y consumo masivo',
          body: 'Cocino en vivo en YouTube todos los días hábiles, una hora por día. Tu producto se usa de verdad en la receta, con la comunidad preguntando en tiempo real.',
          bullets: [
            'Mención y uso real durante el vivo',
            'Preguntas de la audiencia respondidas al aire',
            'El replay queda publicado con tu link',
          ],
          options: [
            {
              name: 'Mención en vivo',
              scope: '1 vivo',
              body: 'Para probar el formato con una sola aparición.',
              includes: [
                'Tu producto usado en la receta del día, con el nombre dicho',
                'Preguntas de la audiencia respondidas al aire',
                'Link en la descripción del vivo y del replay',
              ],
            },
            {
              name: 'Plan mensual',
              scope: 'Por mes',
              body: 'Presencia repetida, que es donde el formato rinde de verdad.',
              includes: [
                'Varias apariciones a lo largo del mes',
                'Piezas verticales derivadas de los mejores momentos',
                'Link fijo en descripciones durante todo el mes',
                'Reporte mensual de views y comentarios',
              ],
            },
            {
              name: 'Patrocinio de temporada',
              scope: '3 meses mínimo',
              body: 'Para quedar asociado al formato, no solo aparecer en él.',
              includes: [
                'Presencia sostenida durante toda la temporada',
                'Mejor precio por mención que la compra suelta',
                'Reporte mensual de resultados',
              ],
            },
          ],
          audienceTitle: 'A quién le llega',
          audience: 'Público adulto hispanohablante, principalmente en Estados Unidos, España y México. Muchos son latinos viviendo fuera de su país — si tu producto resuelve algo de esa vida, es tu cliente.',
          note: 'Si además querés las piezas para usarlas en tus propios canales, se suman como línea aparte en la propuesta.',
        },
      ],
      custom: {
        title: 'Paquete personalizado',
        body: '¿Necesitás una combinación de los tres, o algo que no está en la lista? Armamos la propuesta a medida: producción y difusión se cotizan por separado, para que sepas exactamente qué estás pagando en cada línea.',
        cta: 'Armemos el tuyo',
      },
    },
    portfolioExpandCta: 'Ver más trabajos',
    portfolioMoreText: '¿Querés ver todo lo que produzco?',
    portfolioMoreCta:  'Ver canal completo →',
    hoteles: {
      title:      '¿Tenés un hotel, una experiencia o un producto que mostrar?',
      body:       'Creo el contenido que vende lo que ofrecés como lo que es: algo que la gente quiere vivir o tener. Reels, fotos y stories listos para tus redes — con el ángulo pareja/familia que más conecta.',
      startTitle: 'Empecemos fácil:',
      startBody:  'probá el formato con un video suelto. Si funciona, escalamos a campaña o a un plan mensual.',
    },
    testimonialsTitle: 'Lo que dicen las marcas con las que trabajé',
    testimonials: [],
    packagesTitle: 'Paquetes disponibles',
    packages: [
      {
        badge:    'PRUEBA CHICA',
        name:     'Video UGC Suelto',
        delivery: 'entrega en 1 semana',
        includes: [
          '1 video vertical (15-60s), en español o inglés',
          'Hook + CTA definidos antes de grabar',
          '1 ronda de ajustes + subtítulos',
          'Licencia de uso orgánico 90 días · derechos para ads aparte',
        ],
      },
      {
        badge:    'EL RECOMENDADO',
        name:     'Piloto Medido',
        delivery: '2 semanas + medición 60 días',
        includes: [
          '3 videos verticales con 3 hooks distintos para testear + 5 fotos, grabados en tu propiedad',
          'Objetivos por escrito antes de grabar — qué querés que pase',
          'Medición de 3 métricas a 30 y 60 días, con reporte simple',
          'Todo en horizontal y vertical (redes + web/OTAs)',
          'Si funciona, seguimos. Si no, el contenido queda para vos igual',
        ],
      },
      {
        badge:    'GRUPOS Y OPERADORES',
        name:     'Librería de Contenido',
        delivery: '3-4 semanas',
        includes: [
          '6 videos verticales + 10 clips de historias derivados',
          '10 fotos lifestyle para web, redes y OTAs',
          'Set completo de formatos (testimonial, experiencia, aspiracional, oferta)',
          'Para grupos, cadenas y operadores que alimentan varias propiedades',
          'Guion y concepto incluidos',
        ],
      },
    ],
    packagesExtra: [
      {
        badge:    'PUERTA DE ENTRADA',
        name:     'Auditoría Express',
        price:    '€200',
        delivery: 'entrega en 1 semana',
        includes: [
          'Revisión de tu Instagram y tus fichas (60-90 min)',
          'Documento con lo que está frenando tu contenido y qué haría primero',
          'Se descuenta entero si avanzamos con un piloto o taller',
        ],
      },
      {
        badge:    'SOLO LITUANIA',
        name:     'Refresh Estacional',
        delivery: '4 sesiones al año',
        includes: [
          'Una sesión por temporada: tu propiedad en sus 4 estaciones',
          'Contenido fresco para redes, web y OTAs todo el año',
          'Sin costo de viaje: estoy acá',
        ],
      },
      {
        badge:    'REMOTO · SIN VIAJE',
        name:     'Servicios de Escritorio',
        delivery: 'según pieza',
        includes: [
          'Edición de material que tu marca ya tiene',
          'Localización español↔inglés de contenido existente',
          'Pack de 10 guiones/hooks sin producción',
        ],
      },
    ],
    packagesExpandCta:   'Ver más servicios (3) ↓',
    packagesCollapseCta: 'Ver menos ↑',
    rightsNote: 'Todos los paquetes incluyen licencia de uso orgánico por 90 días. Derechos para publicidad paga, whitelisting, perpetuidad, material en crudo y exclusividad se cotizan como línea aparte en cada propuesta.',
    quote: {
      title: 'Para cotizarte necesito 3 datos',
      items: [
        'Qué querés lograr con el contenido (más reservas, más consultas, mejores fichas)',
        'Dónde lo vas a usar (orgánico, publicidad paga, web/OTAs)',
        'Tu fecha ideal',
      ],
      closing: 'Mandámelos por DM o mail y en 24-48h tenés propuesta con precio cerrado.',
    },
    // Línea de tiempo del proceso: va entre los servicios y el CTA de cotización.
    proceso: {
      title:    'Cómo trabajo',
      subtitle: 'Un proceso claro de punta a punta — para que sepas qué pasa, cuándo, y qué recibís.',
      steps: [
        {
          title: 'Visión creativa',
          items: [
            'Brief creativo: qué querés lograr y para qué canal',
            'Entregables, formatos y requisitos definidos',
            'Ideas de contenido y hooks propuestos antes de grabar',
            'En el Piloto Medido: objetivos por escrito, firmados',
          ],
        },
        {
          title: 'Contrato + seña',
          items: [
            '50% del pago al firmar el contrato',
            'Licencia de uso definida por escrito (orgánico 90 días incluido; ads, whitelisting y perpetuidad como línea aparte)',
            'Fecha de grabación o de recepción del producto',
          ],
        },
        {
          title: 'Producción',
          items: [
            'Grabación en destino, en horizontal y vertical',
            'Primer corte hasta 7 días después de grabar (o de recibir el producto)',
            'Una ronda de ajustes incluida',
          ],
        },
        {
          title: 'Entrega',
          items: [
            '50% restante al aprobar el material final',
            'Archivos por WeTransfer o Google Drive, listos para publicar',
            'En el Piloto Medido: medición a 30 y 60 días + reporte simple',
          ],
        },
      ],
    },
    // Puente al taller: la página todavía no existe → el bloque está OCULTO.
    taller: {
      title: 'También lo enseño',
      text:  'Si preferís que tu equipo aprenda a producir este contenido en casa, doy un taller práctico de un día.',
      cta:   'Ver el taller',
    },
    contact: {
      instagram: 'Escribime por Instagram',
      mail:      'O por mail',
      mailFull:  'exploriando.info@gmail.com',
      briefTitle: 'Con estos tres datos ya puedo cotizarte',
      briefItems: [
        'Qué querés mostrar: alojamiento, experiencia o producto.',
        'Dónde vas a usar el contenido: orgánico, ads, web o todo.',
        'Destino y fechas, si ya los tenés definidos.',
      ],
      briefNote: 'Respondo en 24-48 h · Español e inglés · Sin compromiso',
    },
    finalCta: {
      title: '¿Listo para trabajar juntos?',
      body:  'Contame qué querés mostrar y te paso una propuesta a medida.',
      sub:   'Sin compromiso — la primera consulta es gratis',
    },
    cta:       'Hablemos de tu marca',
    ctaSubtext: 'Respondemos en menos de 48hs.',
    meta: {
      title:       'UGC para marcas de viaje — Exploriando',
      description: 'Contenido UGC en destino para hospitality y travel-tech. 9 años recorriendo, videos reales grabados en ruta, entrega en 7-14 días.',
    },
  },
  enVivo: {
    sectionLabel: 'EN VIVO · LUNES A VIERNES',
    headline:     'Todos los días cocinamos juntos.',
    text:         'De lunes a viernes prendo la cámara y cocino en vivo: recetas argentinas con lo que se consigue en Lituania. No es un programa de cocina — es la hora en que charlamos, nos reímos de la fricción de vivir afuera y conectamos de verdad. Vení a cocinar conmigo.',
    cta:          'Sumarte al vivo de hoy',
    note:         'Todos los episodios quedan en el canal.',
    // Vacíos a propósito: Oriana todavía no definió nombre ni horario exacto.
    // El template los rinde sólo si tienen contenido.
    programName:  '',
    schedule:     '',
    imageAlt:     'Oriana cocinando en vivo desde su cocina en Lituania',
  },
  guiasPremium: {
    sectionLabel: 'GUÍAS PREMIUM',
    headline:     'Para cuando el viaje va en serio.',
    text:         'Las guías del mapa son gratis y lo van a seguir siendo. Estas son otra cosa: el destino completo en un solo PDF — ruta día por día, presupuesto real, documentación según tu pasaporte y los errores que no vas a tener que comerte vos. La primera está en camino.',
    emailLabel:   'Tu correo',
    waitlistCta:  'Avisame cuando salga',
    note:         'Cero spam. Solo el aviso cuando esté lista.',
    success:      '¡Listo! Te aviso apenas salga la primera.',
    errorEmail:   'Ingresá un correo válido.',
    errorGeneric: 'Algo falló. Intentá de nuevo.',
    errorRate:    'Demasiados intentos. Probá en un rato.',
    price:        'Desde €12 · descarga inmediata',
    cta:          'Ver las guías',
    guias: [
      {
        title: 'Lituania y el Báltico en español',
        place: 'Lituania · Letonia · Estonia',
        price: 'Desde €12',
        cta:   'Comprar',
        url:   '/guias-premium',
      },
    ],
  },
  marcasTeaser: {
    sectionLabel: '¿Sos una marca?',
    headline:     'Contenido que vende la experiencia, no una escena armada.',
    text:         'Hago UGC real en destino para marcas de viaje, beauty y lifestyle. Mirá el portafolio y los paquetes.',
    cta:          'Ver portafolio y paquetes',
  },
  latinaConnection: {
    sectionLabel: 'Otro proyecto mío',
    headline:     'Latina Connection',
    text:         'Un curso corto de español argentino para hombres que quieren conocer a una latina. Lo doy con mi marido, que fue el primero en aprenderlo así.',
    note:         'Las clases son en inglés.',
    cta:          'Conocer el curso',
  },
  caminos: {
    sectionLabel: '¿Qué te trajo acá?',
    headline:     'Elegí por dónde empezar',
    intro:        'Cuatro caminos distintos. Cada uno te lleva a lo suyo, sin que tengas que buscar.',
    viajar: {
      title: 'Quiero viajar más',
      body:  '42 ciudades con guía, mapa, presupuesto real y los errores ya cometidos.',
      cta:   'Ver el mapa',
      note:  '',
    },
    crear: {
      title: 'Quiero crear contenido',
      body:  'La serie Viajero Creador y asesorías 1 a 1 para arrancar de verdad.',
      cta:   'Empezar acá',
      note:  '',
    },
    // A propósito en inglés, igual que en la maqueta: el curso se dicta en
    // inglés, así que la tarjeta en su idioma es la señal más clara de a quién
    // le habla. `note` lo dice explícito para quien navega en español.
    espanol: {
      title: 'I want to learn Spanish',
      body:  'Real Argentine Spanish, taught by someone who actually lives it.',
      cta:   'See the course',
      note:  'Curso en inglés · otra marca mía',
    },
    marca: {
      title: 'Tengo una marca',
      body:  'Contenido en destino para hotelería y travel-tech, con medición.',
      cta:   'Ver paquetes',
      note:  '',
    },
  },
  mapaTeaser: {
    sectionLabel:   'Esto es para vos',
    headline:       'Diez años de ruta. Cero teoría.',
    lead:           'Si vas a Argentina, México o Egipto, ya pasé yo. Cada ciudad acá tiene su video, su guía y los errores que ya me comí. Te lo regalo para que llegues mejor de lo que llegué yo.',
    countriesLabel: 'países',
    placesLabel:    'ciudades grabadas',
    yearsLabel:     'años recorriendo',
    mapHint:        'Tocá un país para ver sus guías',
    cta:            'Explorar las guías',
    mapAriaLabel:   'Mapa decorativo de los lugares recorridos por Oriana — navegá por la lista de países',
  },
  mapa: {
    eyebrow:              'Mapa de viajes',
    title:                'Por dónde anduvimos',
    subtitle:             'Cada lugar acá lo grabamos, lo escribimos y lo vivimos. Elegí un país y empezá.',
    countriesLabel:       'países',
    placesLabel:          'ciudades',
    yearsLabel:           'años en la ruta',
    mapHint:              'Tocá un país de la lista para ver sus guías',
    mapAriaLabel:         '{cities} ciudades en {countries} países visitados',
    markerTooltip:        '{city} · {country}',
    markerAriaLabel:      'Ver guías de {country}',
    countriesNavLabel:    'Países visitados',
    citiesCountSuffix:    'ciudades',
    citiesCountSuffixOne: 'ciudad',
    crumbMap:             'Mapa',
    bestMonthsLabel:      'Mejor época para visitar',
    loading:              'Cargando guía…',
    moreInCountry:        'Más ciudades en',
    ctaTitle:             '¿Querés más guías como la de {city}?',
    ctaBody:              'Sumate a la newsletter y te llegan los próximos destinos directo al mail. Sin spam, todos los meses.',
    ctaButton:            'Quiero estar adentro',
    notFoundTitle:        'No encontramos esta ciudad',
    notFoundBody:         'Puede que el link esté roto o que aún no la hayamos publicado. Volvé al mapa para explorar el resto.',
    backToMap:            'Volver al mapa',
  },
  countryList: {
    eyebrow:            'Las guías de {country}',
    title:              '{country}',
    subtitle:           'Cada ciudad de {country} la viví, la grabé y la escribí. Te dejo todo lo que sé.',
    backToMap:          '← Volver al mapa',
    citiesGridLabel:    'Ciudades grabadas en {country}',
    viewOnMapCta:       'Ver {country} en el mapa',
    statsCitiesOther:   '{count} ciudades grabadas',
    statsCitiesOne:     '{count} ciudad grabada',
    statsVideosOther:   '{count} videos',
    statsVideosOne:     '{count} video',
    statsYears:         '10+ años recorriendo',
    notFoundTitle:      'Acá todavía no estuve',
    notFoundBody:       'Ese país no está en mi mapa. Volvé y mirá los doce que sí recorrí.',
    pendingTitle:       '{country} todavía está cocinándose',
    pendingBody:        'Estuve, pero la guía está en proceso. Sumate a la newsletter y te aviso cuando esté lista — sin spam, sin vueltas.',
    pendingCta:         'Avisame cuando esté',
    pendingBackToMap:   '← Ver el resto del mapa',
    footerCtaIntro:     '¿Querés que te avise cuando publique nuevas?',
    footerCtaPrimary:   'Quiero más guías como ésta',
    footerCtaSecondary: 'Ver todos los países',
    thumbAltSuffix:     '— video',
  },
  footer: {
    finalCta: {
      headline:    '¿Todavía no sos parte?',
      subheadline: 'Cada mes mandamos información concreta: destinos accesibles, requisitos actualizados, errores que evitar. Gratis, siempre.',
      cta:         'Unirme ahora',
      ctaSubtext:  'Ya son más de 2.000 viajeros adentro.',
    },
    footer: {
      tagline: 'No necesitás ser rico para viajar.\nNecesitás saber cómo hacerlo.',
      columns: {
        explore: { title: 'Explorar', links: [
          { label: 'Mapa de viajes',     href: '/mapa' },
          { label: 'Viajero Creador',    href: 'https://www.youtube.com/watch?v=-XOHTRkBZv8&list=PLjZ30HHREgvqeMNLcj36yBabdMVw_fAwa' },
          { label: 'Guía de viaje',      href: '/guia' },
        ]},
        community: { title: 'Comunidad', links: [
          { label: 'YouTube',   href: 'https://www.youtube.com/@Exploriando' },
          { label: 'Instagram', href: 'https://www.instagram.com/exploriando/' },
          { label: 'TikTok',    href: 'https://www.tiktok.com/@exploriando_' },
        ]},
        brands: { title: 'Para marcas', links: [
          { label: 'Contenido UGC', href: '/marcas' },
          { label: 'Contacto',      href: 'mailto:exploriando.info@gmail.com' },
        ]},
      },
      legal:      '© 2026 Exploriando.',
      disclaimer: 'La información de documentación es orientativa. Siempre verificá con fuentes oficiales antes de viajar.',
      madeIn:     'Hecho desde Kaunas, Lituania · Para toda Latinoamérica y Europa',
    },
  },
  a11y: {
    skipLink: 'Ir al contenido principal',
  },
  cookieConsent: {
    message: 'Usamos cookies de analítica para entender qué contenido te sirve. Solo se activan si aceptás.',
    accept: 'Aceptar',
    reject: 'Rechazar',
  },
};

// ─── English ──────────────────────────────────────────────────────────────────

const en: AppTranslations = {
  nav: {
    links: [
      { label: 'About',            href: '#about' },
      { label: 'Creator Traveler', href: '/viajero-creador' },
      { label: 'Brands',           href: '/marcas' },
      { label: 'Resources',        href: '#recursos' },
    ],
    cta: 'Join the community',
  },
  hero: {
    eyebrow:     'An Argentine, a Lithuanian and the world in between',
    headlineA:   'Travel with your eyes,',
    headlineB:   'eat with your soul.',
    subheadline: "I'm Ori, and with my Lithuanian husband we show you how people live, what they eat, and what happens when two cultures mix.",
    ctaLive:     "Join today's live",
    ctaGuides:   'See destination guides',
    socialProof: '+2,000 travelers · 42 cities · 9 years traveling',
  },
  about: {
    sectionLabel: 'Who we are',
    headline:     'An Argentine woman who stopped waiting for the perfect moment.',
    body: [
      "My name is Ori. Years ago I decided I wasn't going to wait until I had more money, more time, or more security to travel. I grabbed what I had and left.",
      "Then my Lithuanian husband joined the project — and Exploriando stopped being mine and became ours. I bring the perspective of a Latina who faced every form, every visa and every fear from scratch; he brings the side of the European who lives where, for many, the trip ends. The routes, the guides and the videos — we think them, travel them and film them together.",
    ],
    stats: [
      { value: '42', label: 'cities visited' },
      { value: '9',   label: 'years traveling full time' },
      { value: '3',   label: 'continents from scratch' },
    ],
    crossSell:    'I built Exploriando end to end — the site, the guides, and even the AI system running it behind the scenes. I am a content creator and a software engineer: that is why everything here works, gets measured and improves.',
  },
  viajeroCreador: {
    sectionLabel:    'Creator Traveler',
    headline:        "Traveling and creating content aren't two different paths.",
    subheadline:     "More and more people pay for their trips by creating content along the way. You don't need millions of followers. You need to know how to start.",
    intro:           "This section is for those who want more than pretty photos: they want travel to be sustainable. Here you'll learn how to turn your camera, your story, and your destinations into something that funds you.",
    teaser: {
      headline: "Traveling and creating content aren't two different paths.",
      text:     "More and more people pay for their trips by creating content along the way. You don't need millions of followers: you need to know how to start. Everything I learned in 9 years, laid out on one page.",
      cta:      'Enter',
    },
    hero: {
      sectionLabel: 'CREATOR TRAVELER',
      headline:     'Document your trips with judgement, not luck.',
      text:         "Everything I learned in 9 years filming on my phone: how to tell a trip so people stay, what to film before the moment is gone, and how to edit without losing your mind. Free first. And when you want to go deeper, the full course.",
      cta:          'Start with the free stuff',
    },
    free: {
      title:    'Learn for free',
      subtitle: 'The full playlist, in order, on YouTube.',
      cta:      'See the whole playlist on YouTube',
    },
    curso: {
      sectionLabel: 'THE COURSE',
      title:        'The full course is on its way.',
      text:         'Everything in the playlist, organised into a method: script, filming on your phone, editing and how to distribute it. With exercises and my templates. Sign up and I will let you know when it is out.',
      emailLabel:   'Your email',
      waitlistCta:  'Tell me when it is out',
      note:         'Zero spam. Just the heads-up.',
      success:      'Done! I will let you know as soon as it is out.',
      errorEmail:   'Enter a valid email.',
      errorGeneric: 'Something went wrong. Try again.',
      errorRate:    'Too many attempts. Try again in a bit.',
      // Modo venta (apagado): precio, CTA y bullets ya listos.
      price:        '',
      salesCta:     'Buy the course',
      includes: [
        'Script: how a trip gets told',
        'Filming on your phone, no extra gear',
        'Editing: the fast method',
        'Distribution: where and when to publish',
        'Exercises and my templates',
      ],
    },
    meta: {
      title:       'Creator Traveler — Learn to document your trips | Exploriando',
      description: 'How to tell a trip so people stay, what to film and how to edit without losing your mind. Free playlist on YouTube and the full course on its way.',
    },
    topics: [
      { title: 'How to start from scratch',  description: "What equipment you need (spoiler: you probably already have it), which platforms work, and how to take the first step without an audience." },
      { title: 'Content that monetizes',     description: "The difference between posting and building. What formats pay, what brands look for, and how not to depend on a single income." },
      { title: 'Traveling while creating',   description: "How to organize your time so you don't miss the trip while filming it. The balance nobody tells you about in lifestyle videos." },
      { title: 'Brand collaborations',       description: "How to get your first collaboration, what to ask for, what to avoid, and how not to work for free." },
    ],
    youtube: {
      badge: 'FREE ON YOUTUBE',
      text:  'I teach all of this for free on my channel. No paid course: just hit play, subscribe and start today.',
      cta:   'Watch it all free on YouTube',
    },
    sessions: {
      preTitle:         'One on one',
      title:            'How I help with your travel plan',
      sub:              'One hour, you and me, about your real trip. Bring your questions and leave with a concrete plan and clear next steps — no fluff, no theory.',
      coversTitle:      'What we can cover',
      covers: [
        'Building your route and timing without losing your mind',
        'Paperwork and visas for your passport',
        'Cheap flights: how and when to catch them',
        'A realistic budget and how to stretch it',
        'How to start creating content on the road',
      ],
      session1Name:     'Single session',
      session1Duration: '45 min',
      session2Name:     'Pack of 3 sessions',
      session2Duration: '45 min each',
      session2Badge:    'Your trip planned end to end',
      cta:              'Book a session',
      ctaNote:          'I reply in under 48h with availability.',
    },
  },
  recursos: {
    sectionLabel:  'Free resources',
    headline:      "The guide we wish we'd had before our first trip.",
    subheadline:   "No fluff, no theory. Just what you really need to know to organize your first trip without overspending.",
    guideTitle:    'Guide for your first trip',
    videoLabel:    'Watch the guide explained on video',
    guideContents: [
      'Documents: what to photocopy, where to store it and the permits people forget',
      'Money & cards: the no-fee card and apps to keep spending in check',
      'The perfect carry-on: what goes in, what doesn’t and what can’t be missing',
      '5 must-have apps: offline maps, communication and flight hacks',
      'Final check before flying: insurance, notify your bank, last review',
      'Smart traveler tips: travel safer, spend less, adapt faster',
    ],
    form: {
      emailLabel:       'Your email',
      emailPlaceholder: 'hello@youremail.com',
      cta:              'I want the free guide',
      ctaLoading:       'Sending...',
      privacyNote:      'Zero spam. Unsubscribe whenever you want.',
    },
    successMessage:    "Done! Check your email — the guide is on its way.",
    alreadySubscribed: 'You\'re already part of the community. Download the guide here →',
    testimonial: {
      quote:    "I read it in one night and by the next day I had my trip planned. It's not theory — it's what you should have known before your first flight.",
      author:   'Camila D.',
      location: 'Santiago, Chile',
    },
  },
  ugc: {
    heroBack:    '← Back',
    heroLabel:   'UGC & Brand content',
    headline:    'Real content that makes people want what you sell.',
    subheadline: 'Real couple-travel reels & photos for travel & lifestyle brands: hotels, experiences and products.',
    sectionLabel: 'For brands',
    quienSoy: {
      heading: 'Who I am',
      body: [
        "I'm Oriana — an Argentine lifestyle and travel creator 🇦🇷 living in Lithuania with my Lithuanian husband 🇱🇹. For 9 years we've documented real trips, and our couple content is what connects most: the romantic getaway, the family adventure, the human side of a place.",
      ],
      howTitle:       'How I work:',
      howBody:        "I deliver content ready for YOUR channels (UGC) — you own the videos and photos. And if you'd like, I also share it with my community.",
    },
    specs: [
      'Native Spanish, plus English',
      'Filming on location — based in Lithuania',
      '9 years documenting travel on a phone',
    ],
    heroCardAlts: [
      'Video frame: Oriana at the entrance of the Parrotel hotel, Sharm el Sheikh',
      'Video frame: a couple in a glass dome looking out at the forest',
    ],
    portfolioTitle:    'Content portfolio',
    portfolioSubtitle: 'Real content shot on location, not on a set. This is what the style I produce looks like — every piece links to its original post.',
    portfolioCategories: {
      hoteleria: {
        label: 'Hospitality',
        intro: 'Stays filmed like a real one: the arrival, walking in for the first time, sunrise, the small details. Not a tour of the rooms — the sequence that makes someone picture themselves there.',
      },
      gastronomia: {
        label: 'Food',
        intro: 'Product in context: what you order, how it arrives, how it looks on the table and what it feels like to taste it. Short formats built to make people hungry, not to catalogue the menu.',
      },
      cocina: {
        label: 'Cooking',
        intro: 'I cook live on YouTube every weekday, an hour a day, answering what goes into each dish. A product that shows up there gets genuinely used, in front of people asking questions.',
      },
      experiencias: {
        label: 'Experiences',
        intro: 'Experiences told from the inside: the build-up, the moment, the reaction. The format that works best when what you sell is something people feel.',
      },
      moda: {
        label: 'Fashion',
        intro: 'Product worn and shopped for: how it looks on, how it gets picked, what goes home. Built for stores and brands selling something you try on.',
      },
    },
    portfolioEmpty: {
      title: 'Next production',
      note: 'No published pieces in this category yet.',
    },
    portfolioPieces: {
      'forest-domes': { title: 'A quiet day in the forest', location: 'Forest Domes · Vilnius, Lithuania' },
      parrotel: { title: 'The resort that has everything', location: 'Resort Paradise · Sharm el Sheikh' },
      'casa-del-lago': { title: 'Lakeside house', location: '3Krantai' },
      'vero-cafe': { title: 'The best brunch', location: 'Vero Cafe · Lithuania' },
      'sharm-gastro': { title: 'A dining experience', location: 'Sharm el Sheikh' },
      cafeteria: { title: 'Coffee shop', location: '' },
      empanadas: { title: 'Argentine empanadas', location: 'Cooking live · YouTube' },
      'pastel-papa': { title: 'Argentine potato pie', location: 'Cooking live · YouTube' },
      noquis: { title: 'Homemade gnocchi for the 29th', location: 'Cooking live · YouTube' },
      globo: { title: 'Hot air balloon', location: 'Luxor, Egypt' },
      boxeo: { title: 'Boxing', location: '' },
      'who-win': { title: 'Who win?', location: '' },
      shopping: { title: 'Shopping', location: 'Panama' },
      unboxing: { title: 'Unboxing', location: '' },
    },
    portfolioLinks: {
      piece: 'Watch “{title}” on Instagram (opens in a new tab)',
      yt: 'Watch on YouTube (opens in a new tab)',
      ig: 'Watch on Instagram (opens in a new tab)',
    },
    servicios: {
      sectionLabel: 'Services',
      title: 'Three ways to work with me',
      lead: 'Pick what you need: material for your own channels, presence on mine, or both.',
      optionsTitle: 'Available options',
      expandCta: 'See options',
      collapseCta: 'Hide options',
      items: [
        {
          title: 'UGC content',
          para: 'For hotels, restaurants, experiences and products',
          body: 'I produce the material and hand it over to you. It is yours: your socials, your website, your OTA listings, your ads. My audience is not part of the deal.',
          bullets: [
            'Vertical videos and photos shot on location',
            'Several hooks so you can test which one converts',
            'In Spanish and in English',
          ],
          options: [
            {
              name: 'Single UGC video',
              scope: '1 week',
              body: 'To try the format with one piece.',
              includes: [
                'One 15-60s vertical video, in Spanish or English',
                'Hook and CTA agreed before shooting',
                'One round of edits, subtitles included',
              ],
            },
            {
              name: 'Measured pilot',
              scope: '2 weeks + 60-day tracking',
              body: 'To know whether it works before scaling. This is the one I recommend.',
              includes: [
                '3 vertical videos with 3 different hooks + 5 photos, shot at your property',
                'Goals in writing before shooting — what you want to happen',
                '3 metrics measured at 30 and 60 days, with a plain report',
                'If it does not work, the content is still yours',
              ],
            },
            {
              name: 'Content library',
              scope: '3-4 weeks',
              body: 'For groups, chains and operators running several properties.',
              includes: [
                '6 vertical videos + 10 story clips derived from them',
                '10 lifestyle photos for web, social and OTAs',
                'Full set of formats, script included',
              ],
            },
          ],
          audienceTitle: '',
          audience: '',
          note: 'Every option includes a 90-day organic usage licence. Paid media, whitelisting, perpetuity, raw footage and exclusivity are quoted as separate lines in the proposal.',
        },
        {
          title: 'Social entertainment',
          para: 'For brands that want to reach my Instagram community',
          body: 'Your brand shows up inside my travel and lifestyle content, published on my channels. It is the same format people already follow me for, so it does not read as an ad.',
          bullets: [
            'Reels and stories published on my channels',
            'Woven into the story, not a title card',
            'Mainly Latin American audience',
          ],
          options: [
            {
              name: 'Published reel',
              scope: '1 piece',
              body: 'One appearance on my feed, built into the content.',
              includes: [
                'One reel with your product or venue inside the story',
                'Script shared before shooting',
                'Mention and link in the caption',
              ],
            },
            {
              name: 'Reel + stories',
              scope: '1 piece + support',
              body: 'The reel plus the story sequence that carries it.',
              includes: [
                'One reel published on the feed',
                'Story sequence with a direct link',
                'Stories saved to highlights',
              ],
            },
            {
              name: 'Monthly pack',
              scope: 'Per month',
              body: 'Sustained presence across the month, not a one-off appearance.',
              includes: [
                'Several pieces spread across the month',
                'Supporting stories with every post',
                'Monthly report on reach and comments',
              ],
            },
          ],
          audienceTitle: 'Who it reaches',
          audience: 'Adults aged 25 to 45, mostly in Argentina, Panama, Guatemala, Brazil and the Dominican Republic. This is the service to pick if your brand sells in Latin America.',
          note: 'If you also want the material for your own channels, it is added as a separate line in the proposal.',
        },
        {
          title: 'Live entertainment',
          para: 'For food, cooking and consumer brands',
          body: 'I cook live on YouTube every weekday, an hour a day. Your product gets genuinely used in the recipe, with the community asking questions in real time.',
          bullets: [
            'Named and actually used during the live',
            'Audience questions answered on air',
            'The replay stays up with your link',
          ],
          options: [
            {
              name: 'Live mention',
              scope: '1 live',
              body: 'To try the format with a single appearance.',
              includes: [
                'Your product used in that day recipe, named out loud',
                'Audience questions answered on air',
                'Link in the live and replay description',
              ],
            },
            {
              name: 'Monthly plan',
              scope: 'Per month',
              body: 'Repeated presence, which is where this format actually pays off.',
              includes: [
                'Several appearances across the month',
                'Vertical pieces cut from the best moments',
                'Permanent link in descriptions all month',
                'Monthly report on views and comments',
              ],
            },
            {
              name: 'Season sponsorship',
              scope: '3 months minimum',
              body: 'To be associated with the format, not just appear in it.',
              includes: [
                'Sustained presence across the whole season',
                'Better price per mention than buying one-off',
                'Monthly results report',
              ],
            },
          ],
          audienceTitle: 'Who it reaches',
          audience: 'Spanish-speaking adults, mainly in the United States, Spain and Mexico. Many are Latin Americans living abroad — if your product solves something about that life, they are your customer.',
          note: 'If you also want the pieces for your own channels, they are added as a separate line in the proposal.',
        },
      ],
      custom: {
        title: 'Custom package',
        body: 'Need a mix of the three, or something that is not on the list? We build the proposal to fit: production and distribution are quoted separately, so you know exactly what you are paying for on each line.',
        cta: 'Let us build yours',
      },
    },
    portfolioExpandCta: 'See more work',
    portfolioMoreText: 'Want to see everything I produce?',
    portfolioMoreCta:  'See the full channel →',
    hoteles: {
      title:      'Got a hotel, an experience or a product to show?',
      body:       'I create the content that sells what you offer as what it really is: something people want to live or own. Reels, photos and stories ready for your channels — with the couple/family angle that connects.',
      startTitle: "Let's start easy:",
      startBody:  'try the format with a single video. If it works, we scale to a campaign or a monthly plan.',
    },
    testimonialsTitle: "What the brands I've worked with say",
    testimonials: [],
    packagesTitle: 'Available packages',
    packages: [
      {
        badge:    'SMALL TEST',
        name:     'Single UGC Video',
        delivery: 'delivered in 1 week',
        includes: [
          '1 vertical video (15-60s), in Spanish or English',
          'Hook + CTA agreed before we shoot',
          '1 round of revisions + captions',
          '90-day organic usage licence · paid-ads rights quoted separately',
        ],
      },
      {
        badge:    'RECOMMENDED',
        name:     'Measured Pilot',
        delivery: '2 weeks + 60-day measurement',
        includes: [
          '3 vertical videos with 3 different hooks to test + 5 photos, shot at your property',
          'Goals written down before we shoot — what you want to happen',
          '3 metrics measured at 30 and 60 days, with a simple report',
          'Everything in horizontal and vertical (social + web/OTAs)',
          "If it works, we continue. If not, the content is yours anyway",
        ],
      },
      {
        badge:    'GROUPS AND OPERATORS',
        name:     'Content Library',
        delivery: '3-4 weeks',
        includes: [
          '6 vertical videos + 10 derived story clips',
          '10 lifestyle photos for web, social and OTAs',
          'Full set of formats (testimonial, experience, aspirational, offer)',
          'For groups, chains and operators feeding several properties',
          'Script and concept included',
        ],
      },
    ],
    packagesExtra: [
      {
        badge:    'ENTRY POINT',
        name:     'Express Audit',
        price:    '€200',
        delivery: 'delivered in 1 week',
        includes: [
          'A review of your Instagram and your listings (60-90 min)',
          "A document with what's holding your content back and what I'd fix first",
          'Fully credited if we move ahead with a pilot or a workshop',
        ],
      },
      {
        badge:    'LITHUANIA ONLY',
        name:     'Seasonal Refresh',
        delivery: '4 sessions a year',
        includes: [
          'One session per season: your property across all four',
          'Fresh content for social, web and OTAs all year round',
          "No travel costs: I'm based here",
        ],
      },
      {
        badge:    'REMOTE · NO TRAVEL',
        name:     'Desk Services',
        delivery: 'per piece',
        includes: [
          'Editing footage your brand already has',
          'Spanish↔English localisation of existing content',
          'A pack of 10 scripts/hooks with no production',
        ],
      },
    ],
    packagesExpandCta:   'See more services (3) ↓',
    packagesCollapseCta: 'See less ↑',
    rightsNote: 'Every package includes a 90-day organic usage licence. Paid-advertising rights, whitelisting, perpetuity, raw footage and exclusivity are quoted as a separate line in each proposal.',
    quote: {
      title: 'To quote you I need 3 things',
      items: [
        'What you want the content to achieve (more bookings, more enquiries, better listings)',
        "Where you'll use it (organic, paid ads, web/OTAs)",
        'Your ideal date',
      ],
      closing: 'Send them over by DM or email and within 24-48h you get a proposal with a closed price.',
    },
    // Línea de tiempo del proceso: va entre los servicios y el CTA de cotización.
    proceso: {
      title:    'How I work',
      subtitle: 'A clear process end to end — so you know what happens, when, and what you get.',
      steps: [
        {
          title: 'Creative vision',
          items: [
            'Creative brief: what you want to achieve and for which channel',
            'Deliverables, formats and requirements defined',
            'Content ideas and hooks proposed before filming',
            'On the Measured Pilot: objectives in writing, signed',
          ],
        },
        {
          title: 'Contract + deposit',
          items: [
            '50% of the payment on signing the contract',
            'Usage licence defined in writing (90 days organic included; ads, whitelisting and perpetuity quoted separately)',
            'Filming date, or date the product is received',
          ],
        },
        {
          title: 'Production',
          items: [
            'Filming on location, both horizontal and vertical',
            'First cut within 7 days of filming (or of receiving the product)',
            'One round of revisions included',
          ],
        },
        {
          title: 'Delivery',
          items: [
            'Remaining 50% once you approve the final material',
            'Files via WeTransfer or Google Drive, ready to publish',
            'On the Measured Pilot: 30- and 60-day measurement + a simple report',
          ],
        },
      ],
    },
    // Puente al taller: la página todavía no existe → el bloque está OCULTO.
    taller: {
      title: 'I also teach it',
      text:  'If you would rather your team learned to produce this content in-house, I run a one-day hands-on workshop.',
      cta:   'See the workshop',
    },
    contact: {
      instagram: 'Message me on Instagram',
      mail:      'Or by email',
      mailFull:  'exploriando.info@gmail.com',
      briefTitle: 'With these three things I can already quote you',
      briefItems: [
        'What you want to show: a stay, an experience or a product.',
        'Where the content will run: organic, ads, web — or all of them.',
        'Destination and dates, if you already have them.',
      ],
      briefNote: 'I reply within 24-48 h · Spanish and English · No commitment',
    },
    finalCta: {
      title: 'Ready to work together?',
      body:  "Tell me what you want to show and I'll send you a tailored proposal.",
      sub:   'No commitment — the first consultation is free',
    },
    cta:       "Let's talk about your brand",
    ctaSubtext: 'We respond in less than 48hs.',
    meta: {
      title:       'Travel UGC for brands — Exploriando',
      description: 'On-location UGC for hospitality and travel-tech brands. 9 years on the road, real videos shot on the way, 7-14 day delivery.',
    },
  },
  enVivo: {
    sectionLabel: 'LIVE · MONDAY TO FRIDAY',
    headline:     'Every day we cook together.',
    text:         'Monday to Friday I turn the camera on and cook live: Argentine recipes made with whatever you can find in Lithuania. It is not a cooking show — it is the hour when we chat, laugh at the friction of living abroad and actually connect. Come cook with me.',
    cta:          'Join today\'s live',
    note:         'Every episode stays up on the channel.',
    // Vacíos a propósito: Oriana todavía no definió nombre ni horario exacto.
    programName:  '',
    schedule:     '',
    imageAlt:     'Oriana cooking live from her kitchen in Lithuania',
  },
  guiasPremium: {
    sectionLabel: 'PREMIUM GUIDES',
    headline:     'For when the trip gets serious.',
    text:         'The guides on the map are free and always will be. These are something else: a whole destination in a single PDF — a day-by-day route, a real budget, paperwork based on your passport, and the mistakes you will not have to make yourself. The first one is on its way.',
    emailLabel:   'Your email',
    waitlistCta:  'Let me know when it is out',
    note:         'Zero spam. Just the heads-up when it is ready.',
    success:      'Done! I will let you know as soon as the first one is out.',
    errorEmail:   'Enter a valid email.',
    errorGeneric: 'Something went wrong. Try again.',
    errorRate:    'Too many attempts. Try again in a bit.',
    price:        'From €12 · instant download',
    cta:          'See the guides',
    guias: [
      {
        title: 'Lithuania and the Baltics, in Spanish',
        place: 'Lithuania · Latvia · Estonia',
        price: 'From €12',
        cta:   'Buy',
        url:   '/guias-premium',
      },
    ],
  },
  marcasTeaser: {
    sectionLabel: 'Are you a brand?',
    headline:     'Content that sells the experience — not a staged set.',
    text:         'I make real on-location UGC for travel, beauty and lifestyle brands. Check the portfolio and packages.',
    cta:          'See portfolio and packages',
  },
  latinaConnection: {
    sectionLabel: 'Another project of mine',
    headline:     'Latina Connection',
    text:         'A short Argentine Spanish course for men who want to meet a Latina. I teach it with my husband — he was the first one to learn it this way.',
    note:         '4 lessons, 55 minutes.',
    cta:          'See the course',
  },
  caminos: {
    sectionLabel: 'What brought you here?',
    headline:     'Pick where to start',
    intro:        'Four different paths. Each one takes you straight to its own thing.',
    viajar: {
      title: 'I want to travel more',
      body:  '42 cities with guides, maps, real budgets and the mistakes already made.',
      cta:   'See the map',
      note:  '',
    },
    crear: {
      title: 'I want to create content',
      body:  'The Creator Traveler series and 1-on-1 sessions to actually get started.',
      cta:   'Start here',
      note:  '',
    },
    espanol: {
      title: 'I want to learn Spanish',
      body:  'Real Argentine Spanish, taught by someone who actually lives it.',
      cta:   'See the course',
      note:  'Another project of mine',
    },
    marca: {
      title: 'I have a brand',
      body:  'On-location content for hospitality and travel-tech, with measurement.',
      cta:   'See packages',
      note:  '',
    },
  },
  mapaTeaser: {
    sectionLabel:   "This one's for you",
    headline:       'Ten years on the road. Zero theory.',
    lead:           "If you're heading to Argentina, Mexico or Egypt — I've already been there. Each city here has its video, its guide and the mistakes I already made. I'm handing it over so you start where it took me years to arrive.",
    countriesLabel: 'countries',
    placesLabel:    'cities filmed',
    yearsLabel:     'years on the road',
    mapHint:        'Tap a country to see its guides',
    cta:            'Explore the guides',
    mapAriaLabel:   'Decorative map of places Oriana has traveled — navigate via the country list',
  },
  mapa: {
    eyebrow:              'Travel map',
    title:                'Where we have been',
    subtitle:             "Every place here we filmed, wrote and lived. Pick a country and let's go.",
    countriesLabel:       'countries',
    placesLabel:          'cities',
    yearsLabel:           'years on the road',
    mapHint:              'Tap a country in the list to see its guides',
    mapAriaLabel:         '{cities} cities across {countries} countries visited',
    markerTooltip:        '{city} · {country}',
    markerAriaLabel:      'See guides for {country}',
    countriesNavLabel:    'Countries visited',
    citiesCountSuffix:    'cities',
    citiesCountSuffixOne: 'city',
    crumbMap:             'Map',
    bestMonthsLabel:      'Best time to visit',
    loading:              'Loading guide…',
    moreInCountry:        'More cities in',
    ctaTitle:             'Want more guides like the one for {city}?',
    ctaBody:              "Join the newsletter and we'll send the next destinations straight to your inbox. No spam, just every month.",
    ctaButton:            'I want in',
    notFoundTitle:        "We couldn't find this city",
    notFoundBody:         "The link may be broken or we haven't published it yet. Go back to the map to explore the rest.",
    backToMap:            'Back to the map',
  },
  countryList: {
    eyebrow:            'The {country} guides',
    title:              '{country}',
    subtitle:           "Every city in {country} I lived, filmed and wrote. I'm leaving you everything I know.",
    backToMap:          '← Back to the map',
    citiesGridLabel:    'Cities filmed in {country}',
    viewOnMapCta:       'See {country} on the map',
    statsCitiesOther:   '{count} cities filmed',
    statsCitiesOne:     '{count} city filmed',
    statsVideosOther:   '{count} videos',
    statsVideosOne:     '{count} video',
    statsYears:         '10+ years on the road',
    notFoundTitle:      "Haven't been there yet",
    notFoundBody:       "That country isn't on my map. Head back and check the twelve I've actually been to.",
    pendingTitle:       "{country} is still cooking",
    pendingBody:        "I've been, but the guide is still in the works. Join the newsletter and I'll ping you when it's ready — no spam, no fluff.",
    pendingCta:         "Let me know when it's ready",
    pendingBackToMap:   '← See the rest of the map',
    footerCtaIntro:     'Want me to ping you when new ones drop?',
    footerCtaPrimary:   'Yes, send me more guides',
    footerCtaSecondary: 'See all countries',
    thumbAltSuffix:     '— video',
  },
  footer: {
    finalCta: {
      headline:    'Not a member yet?',
      subheadline: 'Every month we send concrete information: accessible destinations, updated requirements, mistakes to avoid. Free, always.',
      cta:         'Join now',
      ctaSubtext:  'Over 2,000 travelers are already inside.',
    },
    footer: {
      tagline: "You don't need to be rich to travel.\nYou need to know how.",
      columns: {
        explore: { title: 'Explore', links: [
          { label: 'Travel map',        href: '/mapa' },
          { label: 'Creator Traveler',  href: 'https://www.youtube.com/watch?v=-XOHTRkBZv8&list=PLjZ30HHREgvqeMNLcj36yBabdMVw_fAwa' },
          { label: 'Travel guide',      href: '/guia' },
        ]},
        community: { title: 'Community', links: [
          { label: 'YouTube',   href: 'https://www.youtube.com/@Exploriando' },
          { label: 'Instagram', href: 'https://www.instagram.com/exploriando/' },
          { label: 'TikTok',    href: 'https://www.tiktok.com/@exploriando_' },
        ]},
        brands: { title: 'For brands', links: [
          { label: 'UGC Content', href: '/marcas' },
          { label: 'Contact',     href: 'mailto:exploriando.info@gmail.com' },
        ]},
      },
      legal:      '© 2026 Exploriando.',
      disclaimer: 'Documentation information is indicative. Always verify with official sources before traveling.',
      madeIn:     'Made from Kaunas, Lithuania · For all of Latin America and Europe',
    },
  },
  a11y: {
    skipLink: 'Skip to main content',
  },
  cookieConsent: {
    message: 'We use analytics cookies to understand which content helps you. They only run if you accept.',
    accept: 'Accept',
    reject: 'Reject',
  },
};

// ─── Português ────────────────────────────────────────────────────────────────

const pt: AppTranslations = {
  nav: {
    links: [
      { label: 'Sobre nós',        href: '#about' },
      { label: 'Viajante Criador', href: '/viajero-creador' },
      { label: 'Marcas',           href: '/marcas' },
      { label: 'Recursos',         href: '#recursos' },
    ],
    cta: 'Entrar na comunidade',
  },
  hero: {
    eyebrow:     'Uma argentina, um lituano e o mundo no meio',
    headlineA:   'Viaje com os olhos,',
    headlineB:   'coma com a alma.',
    subheadline: 'Sou Ori e com meu marido lituano te mostramos como se vive, como se come e o que acontece quando duas culturas se misturam.',
    ctaLive:     'Entrar no ao vivo de hoje',
    ctaGuides:   'Ver guias de destinos',
    socialProof: '+2.000 viajantes · 42 cidades · 9 anos viajando',
  },
  about: {
    sectionLabel: 'Quem somos',
    headline:     'Uma argentina que parou de esperar o momento perfeito.',
    body: [
      'Meu nome é Ori. Há anos decidi que não ia esperar ter mais dinheiro, mais tempo ou mais segurança para viajar. Peguei o que tinha e fui.',
      'Depois meu marido lituano entrou no projeto, e o Exploriando deixou de ser meu para ser dos dois. Eu trago o olhar da latina que enfrentou cada trâmite e cada medo do zero; ele, o do europeu que vive onde, para muitos, a viagem termina. As rotas, os guias e os vídeos — pensamos, viajamos e filmamos juntos.',
    ],
    stats: [
      { value: '42', label: 'cidades percorridas' },
      { value: '9',   label: 'anos viajando em tempo integral' },
      { value: '3',   label: 'continentes do zero' },
    ],
    crossSell:    'O Exploriando fui eu que construí, de ponta a ponta — o site, os guias e até o sistema de IA que opera tudo por trás. Sou criadora de conteúdo e engenheira de software: por isso aqui tudo funciona, se mede e melhora.',
  },
  viajeroCreador: {
    sectionLabel:    'Viajante Criador',
    headline:        'Viajar e criar conteúdo não são dois caminhos diferentes.',
    subheadline:     'Cada vez mais pessoas pagam suas viagens criando conteúdo pelo caminho. Você não precisa de milhões de seguidores. Precisa saber como começar.',
    intro:           'Esta seção é para quem quer mais do que fotos bonitas: quer que viajar seja sustentável. Aqui você vai aprender como transformar sua câmera, sua história e seus destinos em algo que te financia.',
    teaser: {
      headline: 'Viajar e criar conteúdo não são dois caminhos diferentes.',
      text:     'Cada vez mais pessoas pagam suas viagens criando conteúdo pelo caminho. Você não precisa de milhões de seguidores: precisa saber como começar. Tudo o que aprendi em 9 anos, reunido numa página só.',
      cta:      'Entrar',
    },
    hero: {
      sectionLabel: 'VIAJANTE CRIADOR',
      headline:     'Documente suas viagens com critério, não com sorte.',
      text:         'Tudo o que aprendi em 9 anos gravando com o celular: como contar uma viagem para as pessoas ficarem, o que gravar antes que passe, e como editar sem enlouquecer. Primeiro de graça. E quando quiser ir mais fundo, o curso completo.',
      cta:          'Começar pelo que é grátis',
    },
    free: {
      title:    'Aprenda de graça',
      subtitle: 'A playlist completa, em ordem, no YouTube.',
      cta:      'Ver a playlist inteira no YouTube',
    },
    curso: {
      sectionLabel: 'O CURSO',
      title:        'O curso completo está a caminho.',
      text:         'Tudo o que está na playlist, organizado num método: roteiro, gravação com o celular, edição e como distribuir. Com exercícios e os meus modelos. Se inscreva que eu te aviso quando sair.',
      emailLabel:   'Seu e-mail',
      waitlistCta:  'Me avise quando sair',
      note:         'Zero spam. Só o aviso.',
      success:      'Pronto! Te aviso assim que sair.',
      errorEmail:   'Digite um e-mail válido.',
      errorGeneric: 'Algo falhou. Tente de novo.',
      errorRate:    'Tentativas demais. Tente daqui a pouco.',
      // Modo venta (apagado): precio, CTA y bullets ya listos.
      price:        '',
      salesCta:     'Comprar o curso',
      includes: [
        'Roteiro: como se conta uma viagem',
        'Gravação com o celular, sem equipamento extra',
        'Edição: o método rápido',
        'Distribuição: onde e quando publicar',
        'Exercícios e os meus modelos',
      ],
    },
    meta: {
      title:       'Viajante Criador — Aprenda a documentar suas viagens | Exploriando',
      description: 'Como contar uma viagem para as pessoas ficarem, o que gravar e como editar sem enlouquecer. Playlist grátis no YouTube e o curso completo a caminho.',
    },
    topics: [
      { title: 'Como começar do zero',    description: 'Que equipamento você precisa (spoiler: provavelmente já tem), quais plataformas funcionam e como dar o primeiro passo sem audiência.' },
      { title: 'Conteúdo que monetiza',   description: 'A diferença entre postar e construir. Que formatos pagam, que marcas procuram e como não depender de uma única renda.' },
      { title: 'Viajando enquanto cria',  description: 'Como organizar seu tempo para não perder a viagem enquanto a filma. O equilíbrio que ninguém conta nos vídeos de lifestyle.' },
      { title: 'Colaborações com marcas', description: 'Como conseguir sua primeira colaboração, o que pedir, o que evitar e como não trabalhar de graça.' },
    ],
    youtube: {
      badge: 'GRÁTIS NO YOUTUBE',
      text:  'Ensino tudo isso de graça no meu canal. Zero curso pago: é só dar play, se inscrever e começar hoje.',
      cta:   'Ver tudo grátis no YouTube',
    },
    sessions: {
      preTitle:         'Um a um',
      title:            'Como te ajudo com seu plano de viagem',
      sub:              'Uma hora, você e eu, sobre a sua viagem real. Você traz suas dúvidas e sai com um plano concreto e os próximos passos claros — sem enrolação nem teoria.',
      coversTitle:      'O que podemos ver juntas',
      covers: [
        'Montar sua rota e os tempos sem enlouquecer',
        'Documentação e vistos conforme seu passaporte',
        'Voos baratos: como e quando caçá-los',
        'Orçamento realista e como esticá-lo',
        'Como começar a criar conteúdo pelo caminho',
      ],
      session1Name:     'Sessão individual',
      session1Duration: '45 min',
      session2Name:     'Pack 3 sessões',
      session2Duration: '45 min cada',
      session2Badge:    'Sua viagem planejada de ponta a ponta',
      cta:              'Reservar sessão',
      ctaNote:          'Respondo em menos de 48h com disponibilidade.',
    },
  },
  recursos: {
    sectionLabel:  'Recursos gratuitos',
    headline:      'O guia que gostaríamos de ter tido antes da nossa primeira viagem.',
    subheadline:   'Sem enrolação, sem teoria. Apenas o que você realmente precisa saber para organizar sua primeira viagem sem gastar demais.',
    guideTitle:    'Guia para sua primeira viagem',
    videoLabel:    'Veja o guia explicado em vídeo',
    guideContents: [
      'Documentos: o que fotocopiar, onde guardar e as permissões que esquecem',
      'Money e cartões: o cartão sem comissões e apps para controlar gastos',
      'Mala de mão perfeita: o que entra, o que não e o que não pode faltar',
      '5 apps indispensáveis: mapas offline, comunicação e hacks de voo',
      'Revisão final antes de voar: seguros, avisar o banco, último check',
      'Dicas de viajante inteligente: viaje mais seguro, gaste menos, adapte-se rápido',
    ],
    form: {
      emailLabel:       'Seu email',
      emailPlaceholder: 'oi@seuemail.com',
      cta:              'Quero o guia grátis',
      ctaLoading:       'Enviando...',
      privacyNote:      'Zero spam. Você pode cancelar quando quiser.',
    },
    successMessage:    'Pronto! Confira seu email — o guia já está a caminho.',
    alreadySubscribed: 'Você já faz parte da comunidade. Baixe o guia aqui →',
    testimonial: {
      quote:    'Li em uma noite e no dia seguinte já tinha a viagem montada. Não é teoria: é o que você deveria ter sabido antes do seu primeiro voo.',
      author:   'Camila D.',
      location: 'Santiago, Chile',
    },
  },
  ugc: {
    heroBack:    '← Voltar',
    heroLabel:   'UGC & Conteúdo de marca',
    headline:    'Conteúdo real que faz desejar o que você vende.',
    subheadline: 'Reels e fotos de viagem em casal, reais, para marcas de viagem e lifestyle: hotéis, experiências e produtos.',
    sectionLabel: 'Para marcas',
    quienSoy: {
      heading: 'Quem sou',
      body: [
        'Sou a Oriana — criadora argentina de lifestyle e viagens 🇦🇷, morando na Lituânia com meu marido lituano 🇱🇹. Há 9 anos documentamos viagens reais, e nosso conteúdo em casal é o que mais conecta: a escapada romântica, a aventura em família, o lado humano de um lugar.',
      ],
      howTitle:       'Como trabalho:',
      howBody:        'entrego conteúdo pronto para as SUAS redes (UGC) — você é dono(a) dos vídeos e fotos. E se quiser, também compartilho com a minha comunidade.',
    },
    specs: [
      'Conteúdo em espanhol nativo e inglês',
      'Gravação no destino — base na Lituânia',
      '9 anos documentando viagens com o celular',
    ],
    heroCardAlts: [
      'Frame de um vídeo: Oriana na entrada do hotel Parrotel, Sharm el Sheikh',
      'Frame de um vídeo: casal num domo de vidro olhando a floresta',
    ],
    portfolioTitle:    'Portfólio de conteúdo',
    portfolioSubtitle: 'Conteúdo real gravado no destino, não em estúdio. É assim que o estilo que produzo se vê — cada peça linka para o post original.',
    portfolioCategories: {
      hoteleria: {
        label: 'Hotelaria',
        intro: 'Hospedagens gravadas como uma estadia de verdade: a chegada, a primeira entrada, o amanhecer, os detalhes. Não um tour pelos ambientes, e sim a sequência que faz alguém se imaginar lá dentro.',
      },
      gastronomia: {
        label: 'Gastronomia',
        intro: 'Produto em contexto: o que se pede, como chega, como fica na mesa e o que se sente ao provar. Formatos curtos feitos para dar fome, não para catalogar o cardápio.',
      },
      cocina: {
        label: 'Cozinha',
        intro: 'Cozinho ao vivo no YouTube de segunda a sexta, uma hora por dia, respondendo o que vai em cada prato. Um produto que aparece ali é usado de verdade, na frente de gente que pergunta.',
      },
      experiencias: {
        label: 'Experiências',
        intro: 'Experiências contadas de dentro: a expectativa, o momento e a reação. O formato que melhor funciona quando o que se vende é algo que se sente.',
      },
      moda: {
        label: 'Moda',
        intro: 'Produto em uso e em percurso: como fica vestido, como se escolhe, o que se leva. Pensado para lojas e marcas que vendem algo que se experimenta.',
      },
    },
    portfolioEmpty: {
      title: 'Próxima produção',
      note: 'Esta categoria ainda não tem peças publicadas.',
    },
    portfolioPieces: {
      'forest-domes': { title: 'Um dia de descanso na floresta', location: 'Forest Domes · Vilnius, Lituânia' },
      parrotel: { title: 'O resort com tudo', location: 'Resort Paradise · Sharm el Sheikh' },
      'casa-del-lago': { title: 'Casa do lago', location: '3Krantai' },
      'vero-cafe': { title: 'O melhor brunch', location: 'Vero Cafe · Lituânia' },
      'sharm-gastro': { title: 'Experiência gastronômica', location: 'Sharm el Sheikh' },
      cafeteria: { title: 'Cafeteria', location: '' },
      empanadas: { title: 'Empanadas argentinas', location: 'Ao vivo de cozinha · YouTube' },
      'pastel-papa': { title: 'Torta de batata argentina', location: 'Ao vivo de cozinha · YouTube' },
      noquis: { title: 'Nhoque caseiro do dia 29', location: 'Ao vivo de cozinha · YouTube' },
      globo: { title: 'Balão de ar quente', location: 'Luxor, Egito' },
      boxeo: { title: 'Boxe', location: '' },
      'who-win': { title: 'Who win?', location: '' },
      shopping: { title: 'Shopping', location: 'Panamá' },
      unboxing: { title: 'Unboxing', location: '' },
    },
    portfolioLinks: {
      piece: 'Ver «{title}» no Instagram (abre em nova aba)',
      yt: 'Ver no YouTube (abre em nova aba)',
      ig: 'Ver no Instagram (abre em nova aba)',
    },
    servicios: {
      sectionLabel: 'Serviços',
      title: 'Três formas de trabalhar comigo',
      lead: 'Escolha conforme o que precisa: material para os seus canais, presença nos meus, ou as duas coisas.',
      optionsTitle: 'Opções disponíveis',
      expandCta: 'Ver opções',
      collapseCta: 'Ocultar opções',
      items: [
        {
          title: 'Conteúdo UGC',
          para: 'Para hotéis, restaurantes, experiências e produtos',
          body: 'Produzo o material e entrego para você. É seu: usa nas suas redes, no seu site, nas suas fichas de OTA e nos seus anúncios. Minha audiência não entra na conta.',
          bullets: [
            'Vídeos verticais e fotos gravados no destino',
            'Vários hooks para testar qual converte',
            'Em espanhol e em inglês',
          ],
          options: [
            {
              name: 'Vídeo UGC avulso',
              scope: '1 semana',
              body: 'Para testar o formato com uma peça.',
              includes: [
                '1 vídeo vertical de 15-60s, em espanhol ou inglês',
                'Hook e CTA definidos antes de gravar',
                '1 rodada de ajustes e legendas',
              ],
            },
            {
              name: 'Piloto medido',
              scope: '2 semanas + medição 60 dias',
              body: 'Para saber se funciona antes de escalar. É o caminho que recomendo.',
              includes: [
                '3 vídeos verticais com 3 hooks diferentes + 5 fotos, na sua propriedade',
                'Objetivos por escrito antes de gravar — o que você quer que aconteça',
                'Medição de 3 métricas aos 30 e 60 dias, com relatório simples',
                'Se não funcionar, o conteúdo fica para você do mesmo jeito',
              ],
            },
            {
              name: 'Biblioteca de conteúdo',
              scope: '3-4 semanas',
              body: 'Para grupos, redes e operadores com várias propriedades.',
              includes: [
                '6 vídeos verticais + 10 clipes de stories derivados',
                '10 fotos lifestyle para site, redes e OTAs',
                'Set completo de formatos e roteiro incluído',
              ],
            },
          ],
          audienceTitle: '',
          audience: '',
          note: 'Todas as opções incluem licença de uso orgânico por 90 dias. Mídia paga, whitelisting, perpetuidade, material bruto e exclusividade são cotados como linha separada na proposta.',
        },
        {
          title: 'Entretenimento nas redes',
          para: 'Para marcas que querem chegar à minha comunidade do Instagram',
          body: 'Sua marca aparece dentro do meu conteúdo de viagem e lifestyle, publicado nos meus canais. É o mesmo formato pelo qual as pessoas já me seguem, então não se lê como anúncio.',
          bullets: [
            'Reels e stories publicados nos meus canais',
            'Integrado na história, não uma placa',
            'Audiência principalmente latino-americana',
          ],
          options: [
            {
              name: 'Reel publicado',
              scope: '1 peça',
              body: 'Uma aparição no meu feed, integrada ao conteúdo.',
              includes: [
                '1 reel com seu produto ou lugar dentro da história',
                'Roteiro compartilhado antes de gravar',
                'Menção e link no post',
              ],
            },
            {
              name: 'Reel + stories',
              scope: '1 peça + apoio',
              body: 'O reel mais a sequência de stories que o acompanha.',
              includes: [
                '1 reel publicado no feed',
                'Sequência de stories com link direto',
                'Stories salvos nos destaques',
              ],
            },
            {
              name: 'Pacote mensal',
              scope: 'Por mês',
              body: 'Presença sustentada durante todo o mês, não uma aparição solta.',
              includes: [
                'Várias peças distribuídas ao longo do mês',
                'Stories de apoio em cada publicação',
                'Relatório mensal de alcance e comentários',
              ],
            },
          ],
          audienceTitle: 'A quem chega',
          audience: 'Comunidade adulta de 25 a 45 anos, principalmente na Argentina, Panamá, Guatemala, Brasil e República Dominicana. É o serviço indicado se a sua marca vende na América Latina.',
          note: 'Se você também quiser o material para usar nos seus próprios canais, entra como linha separada na proposta.',
        },
        {
          title: 'Entretenimento ao vivo',
          para: 'Para marcas de alimentos, cozinha e consumo',
          body: 'Cozinho ao vivo no YouTube todos os dias úteis, uma hora por dia. Seu produto é usado de verdade na receita, com a comunidade perguntando em tempo real.',
          bullets: [
            'Menção e uso real durante o ao vivo',
            'Perguntas da audiência respondidas no ar',
            'O replay fica publicado com o seu link',
          ],
          options: [
            {
              name: 'Menção ao vivo',
              scope: '1 ao vivo',
              body: 'Para testar o formato com uma única aparição.',
              includes: [
                'Seu produto usado na receita do dia, com o nome dito',
                'Perguntas da audiência respondidas no ar',
                'Link na descrição do ao vivo e do replay',
              ],
            },
            {
              name: 'Plano mensal',
              scope: 'Por mês',
              body: 'Presença repetida, que é onde o formato realmente rende.',
              includes: [
                'Várias aparições ao longo do mês',
                'Peças verticais derivadas dos melhores momentos',
                'Link fixo nas descrições durante todo o mês',
                'Relatório mensal de views e comentários',
              ],
            },
            {
              name: 'Patrocínio de temporada',
              scope: '3 meses no mínimo',
              body: 'Para ficar associado ao formato, não apenas aparecer nele.',
              includes: [
                'Presença sustentada durante toda a temporada',
                'Melhor preço por menção do que a compra avulsa',
                'Relatório mensal de resultados',
              ],
            },
          ],
          audienceTitle: 'A quem chega',
          audience: 'Público adulto de língua espanhola, principalmente nos Estados Unidos, Espanha e México. Muitos são latinos morando fora do seu país — se o seu produto resolve algo dessa vida, é o seu cliente.',
          note: 'Se você também quiser as peças para usar nos seus próprios canais, entram como linha separada na proposta.',
        },
      ],
      custom: {
        title: 'Pacote personalizado',
        body: 'Precisa de uma combinação dos três, ou de algo que não está na lista? Montamos a proposta sob medida: produção e difusão são cotadas separadamente, para você saber exatamente o que está pagando em cada linha.',
        cta: 'Vamos montar o seu',
      },
    },
    portfolioExpandCta: 'Ver mais trabalhos',
    portfolioMoreText: 'Quer ver tudo o que eu produzo?',
    portfolioMoreCta:  'Ver o canal completo →',
    hoteles: {
      title:      'Tem um hotel, uma experiência ou um produto pra mostrar?',
      body:       'Crio o conteúdo que vende o que você oferece como ele realmente é: algo que as pessoas querem viver ou ter. Reels, fotos e stories prontos para as suas redes — com o ângulo casal/família que mais conecta.',
      startTitle: 'Vamos começar fácil:',
      startBody:  'experimente o formato com um vídeo avulso. Se funcionar, escalamos para uma campanha ou um plano mensal.',
    },
    testimonialsTitle: 'O que dizem as marcas com quem trabalhei',
    testimonials: [],
    packagesTitle: 'Pacotes disponíveis',
    packages: [
      {
        badge:    'TESTE PEQUENO',
        name:     'Vídeo UGC Avulso',
        delivery: 'entrega em 1 semana',
        includes: [
          '1 vídeo vertical (15-60s), em espanhol ou inglês',
          'Hook + CTA definidos antes de gravar',
          '1 rodada de ajustes + legendas',
          'Licença de uso orgânico 90 dias · direitos para ads à parte',
        ],
      },
      {
        badge:    'O RECOMENDADO',
        name:     'Piloto Medido',
        delivery: '2 semanas + medição 60 dias',
        includes: [
          '3 vídeos verticais com 3 hooks diferentes para testar + 5 fotos, gravados na sua propriedade',
          'Objetivos por escrito antes de gravar — o que você quer que aconteça',
          'Medição de 3 métricas aos 30 e 60 dias, com relatório simples',
          'Tudo em horizontal e vertical (redes + site/OTAs)',
          'Se funcionar, seguimos. Se não, o conteúdo fica com você do mesmo jeito',
        ],
      },
      {
        badge:    'GRUPOS E OPERADORES',
        name:     'Biblioteca de Conteúdo',
        delivery: '3-4 semanas',
        includes: [
          '6 vídeos verticais + 10 clipes de stories derivados',
          '10 fotos lifestyle para site, redes e OTAs',
          'Set completo de formatos (depoimento, experiência, aspiracional, oferta)',
          'Para grupos, redes e operadores que alimentam várias propriedades',
          'Roteiro e conceito incluídos',
        ],
      },
    ],
    packagesExtra: [
      {
        badge:    'PORTA DE ENTRADA',
        name:     'Auditoria Express',
        price:    '€200',
        delivery: 'entrega em 1 semana',
        includes: [
          'Revisão do seu Instagram e das suas fichas (60-90 min)',
          'Documento com o que está travando o seu conteúdo e o que eu faria primeiro',
          'Descontado integralmente se avançarmos com um piloto ou workshop',
        ],
      },
      {
        badge:    'SÓ LITUÂNIA',
        name:     'Refresh Sazonal',
        delivery: '4 sessões por ano',
        includes: [
          'Uma sessão por temporada: sua propriedade nas 4 estações',
          'Conteúdo fresco para redes, site e OTAs o ano todo',
          'Sem custo de viagem: eu moro aqui',
        ],
      },
      {
        badge:    'REMOTO · SEM VIAGEM',
        name:     'Serviços de Escritório',
        delivery: 'por peça',
        includes: [
          'Edição de material que a sua marca já tem',
          'Localização espanhol↔inglês de conteúdo existente',
          'Pack de 10 roteiros/hooks sem produção',
        ],
      },
    ],
    packagesExpandCta:   'Ver mais serviços (3) ↓',
    packagesCollapseCta: 'Ver menos ↑',
    rightsNote: 'Todos os pacotes incluem licença de uso orgânico por 90 dias. Direitos para publicidade paga, whitelisting, perpetuidade, material bruto e exclusividade são orçados como linha à parte em cada proposta.',
    quote: {
      title: 'Para te orçar preciso de 3 dados',
      items: [
        'O que você quer alcançar com o conteúdo (mais reservas, mais consultas, fichas melhores)',
        'Onde vai usar (orgânico, publicidade paga, site/OTAs)',
        'Sua data ideal',
      ],
      closing: 'Me mande por DM ou e-mail e em 24-48h você tem proposta com preço fechado.',
    },
    // Línea de tiempo del proceso: va entre los servicios y el CTA de cotización.
    proceso: {
      title:    'Como trabalho',
      subtitle: 'Um processo claro de ponta a ponta — para você saber o que acontece, quando, e o que recebe.',
      steps: [
        {
          title: 'Visão criativa',
          items: [
            'Briefing criativo: o que você quer alcançar e para qual canal',
            'Entregáveis, formatos e requisitos definidos',
            'Ideias de conteúdo e hooks propostos antes de gravar',
            'No Piloto Medido: objetivos por escrito, assinados',
          ],
        },
        {
          title: 'Contrato + sinal',
          items: [
            '50% do pagamento na assinatura do contrato',
            'Licença de uso definida por escrito (orgânico 90 dias incluído; ads, whitelisting e perpetuidade como linha à parte)',
            'Data de gravação ou de recebimento do produto',
          ],
        },
        {
          title: 'Produção',
          items: [
            'Gravação no destino, na horizontal e na vertical',
            'Primeiro corte em até 7 dias depois de gravar (ou de receber o produto)',
            'Uma rodada de ajustes incluída',
          ],
        },
        {
          title: 'Entrega',
          items: [
            '50% restante ao aprovar o material final',
            'Arquivos por WeTransfer ou Google Drive, prontos para publicar',
            'No Piloto Medido: medição aos 30 e 60 dias + relatório simples',
          ],
        },
      ],
    },
    // Puente al taller: la página todavía no existe → el bloque está OCULTO.
    taller: {
      title: 'Também ensino isso',
      text:  'Se você prefere que sua equipe aprenda a produzir esse conteúdo internamente, dou um workshop prático de um dia.',
      cta:   'Ver o workshop',
    },
    contact: {
      instagram: 'Me escreva no Instagram',
      mail:      'Ou por e-mail',
      mailFull:  'exploriando.info@gmail.com',
      briefTitle: 'Com estes três dados já consigo te orçar',
      briefItems: [
        'O que você quer mostrar: hospedagem, experiência ou produto.',
        'Onde o conteúdo vai rodar: orgânico, ads, site ou tudo.',
        'Destino e datas, se você já tiver.',
      ],
      briefNote: 'Respondo em 24-48 h · Espanhol e inglês · Sem compromisso',
    },
    finalCta: {
      title: 'Pronto para trabalhar juntos?',
      body:  'Me conte o que você quer mostrar e te mando uma proposta sob medida.',
      sub:   'Sem compromisso — a primeira consulta é grátis',
    },
    cta:       'Vamos falar sobre sua marca',
    ctaSubtext: 'Respondemos em menos de 48hs.',
    meta: {
      title:       'UGC para marcas de viagem — Exploriando',
      description: 'Conteúdo UGC no destino para marcas de hospitalidade e travel-tech. 9 anos na estrada, vídeos reais gravados em rota, entrega em 7-14 dias.',
    },
  },
  enVivo: {
    sectionLabel: 'AO VIVO · DE SEGUNDA A SEXTA',
    headline:     'Todos os dias cozinhamos juntos.',
    text:         'De segunda a sexta eu ligo a câmera e cozinho ao vivo: receitas argentinas com o que dá pra achar na Lituânia. Não é um programa de culinária — é a hora em que a gente conversa, ri da fricção de viver fora e se conecta de verdade. Vem cozinhar comigo.',
    cta:          'Entrar no ao vivo de hoje',
    note:         'Todos os episódios ficam no canal.',
    // Vacíos a propósito: Oriana todavía no definió nombre ni horario exacto.
    programName:  '',
    schedule:     '',
    imageAlt:     'Oriana cozinhando ao vivo da sua cozinha na Lituânia',
  },
  guiasPremium: {
    sectionLabel: 'GUIAS PREMIUM',
    headline:     'Para quando a viagem é séria.',
    text:         'Os guias do mapa são grátis e vão continuar sendo. Estes são outra coisa: o destino inteiro num único PDF — roteiro dia a dia, orçamento real, documentação conforme o seu passaporte e os erros que você não vai precisar cometer. O primeiro está a caminho.',
    emailLabel:   'Seu e-mail',
    waitlistCta:  'Me avise quando sair',
    note:         'Zero spam. Só o aviso quando estiver pronto.',
    success:      'Pronto! Te aviso assim que o primeiro sair.',
    errorEmail:   'Digite um e-mail válido.',
    errorGeneric: 'Algo falhou. Tente de novo.',
    errorRate:    'Tentativas demais. Tente daqui a pouco.',
    price:        'A partir de €12 · download imediato',
    cta:          'Ver os guias',
    guias: [
      {
        title: 'Lituânia e o Báltico em espanhol',
        place: 'Lituânia · Letônia · Estônia',
        price: 'A partir de €12',
        cta:   'Comprar',
        url:   '/guias-premium',
      },
    ],
  },
  marcasTeaser: {
    sectionLabel: 'Você é uma marca?',
    headline:     'Conteúdo que vende a experiência, não uma cena montada.',
    text:         'Faço UGC real no destino para marcas de viagem, beauty e lifestyle. Veja o portfólio e os pacotes.',
    cta:          'Ver portfólio e pacotes',
  },
  latinaConnection: {
    sectionLabel: 'Outro projeto meu',
    headline:     'Latina Connection',
    text:         'Um curso curto de espanhol argentino para homens que querem conhecer uma latina. Dou com meu marido, que foi o primeiro a aprender assim.',
    note:         'As aulas são em inglês.',
    cta:          'Conhecer o curso',
  },
  caminos: {
    sectionLabel: 'O que te trouxe aqui?',
    headline:     'Escolha por onde começar',
    intro:        'Quatro caminhos diferentes. Cada um leva direto ao seu.',
    viajar: {
      title: 'Quero viajar mais',
      body:  '42 cidades com guia, mapa, orçamento real e os erros já cometidos.',
      cta:   'Ver o mapa',
      note:  '',
    },
    crear: {
      title: 'Quero criar conteúdo',
      body:  'A série Viajante Criador e sessões 1 a 1 para começar de verdade.',
      cta:   'Começar aqui',
      note:  '',
    },
    espanol: {
      title: 'I want to learn Spanish',
      body:  'Real Argentine Spanish, taught by someone who actually lives it.',
      cta:   'See the course',
      note:  'Curso em inglês · outra marca minha',
    },
    marca: {
      title: 'Tenho uma marca',
      body:  'Conteúdo no destino para hotelaria e travel-tech, com medição.',
      cta:   'Ver pacotes',
      note:  '',
    },
  },
  mapaTeaser: {
    sectionLabel:   'Isso aqui é pra você',
    headline:       'Dez anos de estrada. Zero teoria.',
    lead:           'Se você vai pra Argentina, México ou Egito, eu já fui. Cada cidade aqui tem seu vídeo, seu guia e os erros que eu já cometi. Te entrego de presente pra você chegar melhor do que eu cheguei.',
    countriesLabel: 'países',
    placesLabel:    'cidades gravadas',
    yearsLabel:     'anos na estrada',
    mapHint:        'Toque em um país pra ver os guias',
    cta:            'Explorar os guias',
    mapAriaLabel:   'Mapa decorativo dos lugares que a Oriana percorreu — navegue pela lista de países',
  },
  mapa: {
    eyebrow:              'Mapa de viagens',
    title:                'Por onde andamos',
    subtitle:             'Cada lugar aqui gravamos, escrevemos e vivemos. Escolha um país e comece.',
    countriesLabel:       'países',
    placesLabel:          'cidades',
    yearsLabel:           'anos na estrada',
    mapHint:              'Toque em um país da lista pra ver os guias',
    mapAriaLabel:         '{cities} cidades em {countries} países visitados',
    markerTooltip:        '{city} · {country}',
    markerAriaLabel:      'Ver guias de {country}',
    countriesNavLabel:    'Países visitados',
    citiesCountSuffix:    'cidades',
    citiesCountSuffixOne: 'cidade',
    crumbMap:             'Mapa',
    bestMonthsLabel:      'Melhor época para visitar',
    loading:              'Carregando guia…',
    moreInCountry:        'Mais cidades em',
    ctaTitle:             'Quer mais guias como o de {city}?',
    ctaBody:              'Inscreva-se na newsletter e enviamos os próximos destinos direto para o seu e-mail. Sem spam, só uma vez por mês.',
    ctaButton:            'Quero entrar',
    notFoundTitle:        'Não encontramos esta cidade',
    notFoundBody:         'Pode ser que o link esteja quebrado ou que ainda não tenhamos publicado. Volte ao mapa para explorar o resto.',
    backToMap:            'Voltar ao mapa',
  },
  countryList: {
    eyebrow:            'Os guias de {country}',
    title:              '{country}',
    subtitle:           'Cada cidade de {country} eu vivi, gravei e escrevi. Te deixo tudo o que sei.',
    backToMap:          '← Voltar ao mapa',
    citiesGridLabel:    'Cidades gravadas em {country}',
    viewOnMapCta:       'Ver {country} no mapa',
    statsCitiesOther:   '{count} cidades gravadas',
    statsCitiesOne:     '{count} cidade gravada',
    statsVideosOther:   '{count} vídeos',
    statsVideosOne:     '{count} vídeo',
    statsYears:         '10+ anos na estrada',
    notFoundTitle:      'Aqui ainda não estive',
    notFoundBody:       'Esse país não está no meu mapa. Volta e dá uma olhada nos doze que eu já percorri.',
    pendingTitle:       '{country} ainda está no forno',
    pendingBody:        'Já estive, mas o guia ainda está em processo. Entra na newsletter e eu te aviso quando estiver pronto — sem spam, sem enrolação.',
    pendingCta:         'Me avisa quando estiver',
    pendingBackToMap:   '← Ver o resto do mapa',
    footerCtaIntro:     'Quer que eu te avise quando publicar mais?',
    footerCtaPrimary:   'Sim, me manda mais guias',
    footerCtaSecondary: 'Ver todos os países',
    thumbAltSuffix:     '— vídeo',
  },
  footer: {
    finalCta: {
      headline:    'Ainda não faz parte?',
      subheadline: 'Todo mês enviamos informações concretas: destinos acessíveis, requisitos atualizados, erros a evitar. Grátis, sempre.',
      cta:         'Entrar agora',
      ctaSubtext:  'Mais de 2.000 viajantes já estão dentro.',
    },
    footer: {
      tagline: 'Você não precisa ser rico para viajar.\nVocê precisa saber como.',
      columns: {
        explore: { title: 'Explorar', links: [
          { label: 'Mapa de viagens',    href: '/mapa' },
          { label: 'Viajante Criador',   href: 'https://www.youtube.com/watch?v=-XOHTRkBZv8&list=PLjZ30HHREgvqeMNLcj36yBabdMVw_fAwa' },
          { label: 'Guia de viagem',     href: '/guia' },
        ]},
        community: { title: 'Comunidade', links: [
          { label: 'YouTube',   href: 'https://www.youtube.com/@Exploriando' },
          { label: 'Instagram', href: 'https://www.instagram.com/exploriando/' },
          { label: 'TikTok',    href: 'https://www.tiktok.com/@exploriando_' },
        ]},
        brands: { title: 'Para marcas', links: [
          { label: 'Conteúdo UGC', href: '/marcas' },
          { label: 'Contato',      href: 'mailto:exploriando.info@gmail.com' },
        ]},
      },
      legal:      '© 2026 Exploriando.',
      disclaimer: 'As informações de documentação são orientativas. Sempre verifique com fontes oficiais antes de viajar.',
      madeIn:     'Feito em Kaunas, Lituânia · Para toda a América Latina e Europa',
    },
  },
  cookieConsent: {
    message: 'Usamos cookies de analytics para entender qual conteúdo te ajuda. Só são ativadas se você aceitar.',
    accept: 'Aceitar',
    reject: 'Recusar',
  },
  a11y: {
    skipLink: 'Ir para o conteúdo principal',
  },
};

// ─── Export ───────────────────────────────────────────────────────────────────

export const TRANSLATIONS: Record<Lang, AppTranslations> = { es, en, pt };
