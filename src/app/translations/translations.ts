import { Lang } from '../models/language.model';

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavLink        { label: string; href: string; }
interface FooterLink     { label: string; href: string; }
interface Stat           { value: string; label: string; }
interface Topic          { title: string; description: string; }
interface Package        { badge: string; name: string; desc: string; price: string; delivery: string; includes: string[]; }
interface Testimonial    { quote: string; author: string; }

interface AppTranslations {
  nav: { links: NavLink[]; cta: string; workWithMe: { label: string; href: string; }; };
  hero: { eyebrow: string; headline: string; subheadline: string; cta: string; ctaSubtext: string; socialProof: string; };
  about: { sectionLabel: string; headline: string; body: string[]; stats: Stat[]; crossSell: string; crossSellCta: string; };
  viajeroCreador: {
    sectionLabel: string; headline: string; subheadline: string; intro: string;
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
    headline: string; subheadline: string; heroCta: string;
    sectionLabel: string;
    // ─── Quién soy + audiencia ─────────────────────────────────────────
    quienSoy: {
      /** Título de la sección (visually-hidden, landmark a11y). */
      heading: string;
      /** Párrafo(s) de presentación. */
      body: string[];
      howTitle: string; howBody: string;
      communityTitle: string; community: string;
    };
    // ─── Portfolio (antes hardcodeado en el HTML) ──────────────────────
    portfolioTitle: string; portfolioSubtitle: string;
    portfolioMoreText: string; portfolioMoreCta: string;
    // ─── Hoteles & experiencias (entrada de baja fricción) ─────────────
    hoteles: {
      title: string; body: string;
      startTitle: string; startBody: string; cta: string;
    };
    // ─── Testimonios (la sección se oculta si `testimonials` está vacío) ─
    testimonialsTitle: string; testimonials: Testimonial[];
    // ─── Precios: tarjeta de entrada + 3 tiers ─────────────────────────
    packagesTitle: string; packageCta: string;
    packages: Package[];
    // ─── CTA final (antes hardcodeado en el HTML) ──────────────────────
    finalCta: { title: string; body: string; cta: string; sub: string; };
    cta: string; ctaSubtext: string;
    meta: { title: string; description: string; };
  };
  marcasTeaser: { sectionLabel: string; headline: string; text: string; cta: string; };
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
        work:      { title: string; links: FooterLink[]; };
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
      { label: 'Viajero Creador', href: '#viajero-creador' },
      { label: 'Marcas',          href: '/marcas' },
      { label: 'Recursos',        href: '#recursos' },
    ],
    cta: 'Unirme a la comunidad',
    workWithMe: { label: 'Trabajá conmigo ↗', href: 'https://orianaledesma.dev' },
  },
  hero: {
    eyebrow:     'Comunidad de viajeros latinos',
    headline:    'Lo mejor que vas a hacer en tu vida es viajar.',
    subheadline: '9 años viajando me enseñaron que ninguna cosa que comprés rinde como una experiencia. Acá te muestro dónde poner la plata para que cada viaje valga.',
    cta:         'Mandame la guía gratis',
    ctaSubtext:  'Sin costo. Sin spam. Solo información que funciona.',
    socialProof: '+2.000 viajeros · 54 ciudades · 9 años viajando',
  },
  about: {
    sectionLabel: 'Quiénes somos',
    headline:     'Una argentina que dejó de esperar el momento perfecto.',
    body: [
      'Me llamo Ori. Hace años decidí que no iba a esperar tener más dinero, más tiempo o más seguridad para viajar. Agarré lo que tenía y me fui.',
      'Lo que descubrí es que la mayoría de los obstáculos que creía reales eran, en realidad, falta de información. Visas, vuelos baratos, documentación, destinos accesibles — todo tiene un cómo.',
      'Después se sumó Mindaugas, mi marido lituano, y Exploriando dejó de ser un proyecto mío para ser de los dos. Yo pongo la mirada de la latina que se enfrentó a cada trámite y cada miedo desde cero; él, la del europeo que vive donde para muchos es destino. Las rutas, las guías y los videos los pensamos, los viajamos y los grabamos juntos.',
    ],
    stats: [
      { value: '54', label: 'ciudades recorridas' },
      { value: '9',   label: 'años viajando full time' },
      { value: '3',   label: 'continentes desde cero' },
    ],
    crossSell:    'Exploriando lo construí yo, de punta a punta. Si tu proyecto necesita una web propia, eso también lo hago.',
    crossSellCta: 'orianaledesma.dev →',
  },
  viajeroCreador: {
    sectionLabel:    'Viajero Creador',
    headline:        'Viajar y crear contenido no son dos caminos distintos.',
    subheadline:     'Cada vez más personas pagan sus viajes creando contenido en el camino. No necesitás millones de seguidores. Necesitás saber cómo empezar.',
    intro:           'Esta sección es para los que quieren más que fotos lindas: quieren que viajar sea sostenible. Acá vas a aprender cómo convertir tu cámara, tu historia y tus destinos en algo que te financie.',
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
      session2Badge:    'Ahorrás USD 50',
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
    heroCta:     'Hablemos de tu proyecto ✈',
    sectionLabel: 'Para marcas',
    quienSoy: {
      heading: 'Quién soy',
      body: [
        'Soy Oriana — creadora de viajes argentina 🇦🇷, viviendo en Lituania con mi marido lituano 🇱🇹. Hace 9 años documentamos viajes reales, y nuestro contenido en pareja es lo que más conecta: la escapada romántica, la aventura en familia, el lado humano de un lugar.',
      ],
      howTitle:       'Cómo trabajo:',
      howBody:        'te entrego contenido listo para TUS redes (UGC) — vos sos dueño/a de los videos y fotos. Y si querés, lo comparto también con mi comunidad.',
      communityTitle: 'Mi comunidad:',
      community:      '4.400 Instagram · 1.880 YouTube · 800 TikTok · viajeros LATAM (25-40) que reservan lo que recomiendo, no solo lo miran.',
    },
    portfolioTitle:    'Portafolio de contenido',
    portfolioSubtitle: 'Contenido real grabado en destino, no en set. Así performa el estilo que produzco — números públicos de cada pieza.',
    portfolioMoreText: '¿Querés ver más trabajos?',
    portfolioMoreCta:  'Ver canal completo →',
    hoteles: {
      title:      '¿Tenés un hotel, una experiencia o un producto que mostrar?',
      body:       'Creo el contenido que vende lo que ofrecés como lo que es: algo que la gente quiere vivir o tener. Reels, fotos y stories listos para tus redes — con el ángulo pareja/familia que más conecta.',
      startTitle: 'Empecemos fácil:',
      startBody:  'probá con un pack chico desde €120, o una colaboración por canje (estadía o producto). Si funciona, escalamos a un plan mensual.',
      cta:        'Escribime 📩 · Agendá 15 min',
    },
    testimonialsTitle: 'Lo que dicen las marcas con las que trabajé',
    testimonials: [],
    packagesTitle: 'Paquetes disponibles',
    packageCta:    'Agendá una llamada de 20 min',
    packages: [
      {
        badge:    'Para empezar',
        name:     'Video UGC suelto',
        desc:     'Para marcas que quieren probar el formato con una pieza pensada para frenar el scroll.',
        price:    'desde €200',
        delivery: 'listo en 1 semana',
        includes: [
          '1 video vertical (15-60s) listo para Reels, TikTok y Shorts',
          'Hook que frena el scroll + CTA claro — para convertir, no solo verse lindo',
          'Grabado por mí, en destino, con tu producto o experiencia',
          '1 ronda de ajustes + subtítulos incluidos',
          'Licencia de uso orgánico (90 días) · derechos para ads a medida',
        ],
      },
      {
        badge:    'El más pedido',
        name:     'Pack Campaña',
        desc:     'Para marcas que necesitan contenido para una campaña completa, no una sola pieza.',
        price:    'desde €650',
        delivery: 'listo en 2 semanas',
        includes: [
          '3 videos verticales + 5 fotos lifestyle',
          'Distintos ángulos y hooks para testear qué convierte (A/B)',
          'Mezcla de testimonial a cámara + plano aspiracional de destino',
          'Pensado para el recorrido del cliente: del "soñar el viaje" al "reservar"',
          '1 ronda de ajustes por pieza + subtítulos',
          'Licencia orgánica (90 días) · derechos para ads y material en crudo a medida',
        ],
      },
      {
        badge:    'Máximo impacto',
        name:     'Librería de contenido',
        desc:     'Para marcas que quieren alimentar sus redes y ads por meses con una sola producción.',
        price:    'desde €1.400',
        delivery: 'listo en 3-4 semanas',
        includes: [
          '5 videos verticales + 10 fotos',
          'Material suficiente para remixar por temporadas y campañas',
          'Set completo de formatos: testimonial, experiencia, aspiracional y oferta',
          'Hooks y CTAs variados listos para paid social',
          'Guion y concepto incluidos si no traés brief',
          '1 ronda de ajustes + subtítulos en todas las piezas',
          'Licencia orgánica (6 meses) · derechos para ads, perpetuidad y raw a medida',
        ],
      },
    ],
    finalCta: {
      title: '¿Listo para trabajar juntos?',
      body:  'Agendá 15 min conmigo y armamos la propuesta a medida en la llamada.',
      cta:   'Agendar 15 min',
      sub:   'Sin compromiso — la primera consulta es gratis',
    },
    cta:       'Hablemos de tu marca',
    ctaSubtext: 'Respondemos en menos de 48hs.',
    meta: {
      title:       'UGC para marcas de viaje — Exploriando',
      description: 'Contenido UGC en destino para hospitality y travel-tech. 9 años recorriendo, videos reales grabados en ruta, entrega en 7-14 días.',
    },
  },
  marcasTeaser: {
    sectionLabel: '¿Sos una marca?',
    headline:     'Contenido que vende la experiencia, no una escena armada.',
    text:         'Hago UGC real en destino para marcas de viaje, beauty y lifestyle. Mirá el portafolio y los paquetes.',
    cta:          'Ver portafolio y paquetes',
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
        work: { title: 'Diseño web', links: [
          { label: 'Portfolio',            href: 'https://orianaledesma.dev/#work' },
          { label: 'Servicios',            href: 'https://orianaledesma.dev/#services' },
          { label: 'orianaledesma.dev ↗',  href: 'https://orianaledesma.dev' },
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
      { label: 'Creator Traveler', href: '#viajero-creador' },
      { label: 'Brands',           href: '/marcas' },
      { label: 'Resources',        href: '#recursos' },
    ],
    cta: 'Join the community',
    workWithMe: { label: 'Work with me ↗', href: 'https://orianaledesma.dev' },
  },
  hero: {
    eyebrow:     'Latin traveler community',
    headline:    "The best thing you'll do in your life is travel.",
    subheadline: "9 years on the road taught me that nothing you buy pays off like an experience. Here's where to put your money so every trip is worth it.",
    cta:         'Send me the free guide',
    ctaSubtext:  'Free. No spam. Just information that works.',
    socialProof: '+2,000 travelers · 54 cities · 9 years traveling',
  },
  about: {
    sectionLabel: 'Who we are',
    headline:     'An Argentine woman who stopped waiting for the perfect moment.',
    body: [
      "My name is Ori. Years ago I decided I wasn't going to wait until I had more money, more time, or more security to travel. I grabbed what I had and left.",
      "What I discovered is that most of the obstacles I thought were real were, in reality, a lack of information. Visas, cheap flights, documentation, accessible destinations — everything has a how.",
      "Then Mindaugas, my Lithuanian husband, joined the project — and Exploriando stopped being mine and became ours. I bring the perspective of a Latina who faced every form, every visa and every fear from scratch; he brings the side of the European who lives where, for many, the trip ends. The routes, the guides and the videos — we think them, travel them and film them together.",
    ],
    stats: [
      { value: '54', label: 'cities visited' },
      { value: '9',   label: 'years traveling full time' },
      { value: '3',   label: 'continents from scratch' },
    ],
    crossSell:    'I built Exploriando end to end myself. If your project needs its own website, I do that too.',
    crossSellCta: 'orianaledesma.dev →',
  },
  viajeroCreador: {
    sectionLabel:    'Creator Traveler',
    headline:        "Traveling and creating content aren't two different paths.",
    subheadline:     "More and more people pay for their trips by creating content along the way. You don't need millions of followers. You need to know how to start.",
    intro:           "This section is for those who want more than pretty photos: they want travel to be sustainable. Here you'll learn how to turn your camera, your story, and your destinations into something that funds you.",
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
      session2Badge:    'Save USD 50',
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
    heroCta:     "Let's talk about your project ✈",
    sectionLabel: 'For brands',
    quienSoy: {
      heading: 'Who I am',
      body: [
        "I'm Oriana — an Argentine travel creator 🇦🇷 living in Lithuania with my Lithuanian husband 🇱🇹. For 9 years we've documented real trips, and our couple content is what connects most: the romantic getaway, the family adventure, the human side of a place.",
      ],
      howTitle:       'How I work:',
      howBody:        "I deliver content ready for YOUR channels (UGC) — you own the videos and photos. And if you'd like, I also share it with my community.",
      communityTitle: 'My community:',
      community:      '4,400 Instagram · 1,880 YouTube · 800 TikTok · LATAM travelers (25-40) who book what I recommend, not just watch it.',
    },
    portfolioTitle:    'Content portfolio',
    portfolioSubtitle: 'Real content shot on location, not on a set. This is how the style I produce performs — public numbers for every piece.',
    portfolioMoreText: 'Want to see more work?',
    portfolioMoreCta:  'See the full channel →',
    hoteles: {
      title:      'Got a hotel, an experience or a product to show?',
      body:       'I create the content that sells what you offer as what it really is: something people want to live or own. Reels, photos and stories ready for your channels — with the couple/family angle that connects.',
      startTitle: "Let's start easy:",
      startBody:  'try a small pack from €120, or a content barter (a stay or your product). If it works, we scale to a monthly plan.',
      cta:        'DM me 📩 · Book a 15-min call',
    },
    testimonialsTitle: "What the brands I've worked with say",
    testimonials: [],
    packagesTitle: 'Available packages',
    packageCta:    'Book a 20-min call',
    packages: [
      {
        badge:    'To start',
        name:     'Single UGC video',
        desc:     'For brands that want to test the format with one scroll-stopping piece.',
        price:    'from €200',
        delivery: 'ready in 1 week',
        includes: [
          '1 vertical video (15-60s) ready for Reels, TikTok and Shorts',
          'Scroll-stopping hook + clear CTA — built to convert, not just look pretty',
          'Shot by me, on location, with your product or experience',
          '1 round of revisions + subtitles included',
          'Organic usage license (90 days) · custom ad rights available',
        ],
      },
      {
        badge:    'Most requested',
        name:     'Campaign Pack',
        desc:     'For brands that need content for a full campaign, not a single piece.',
        price:    'from €650',
        delivery: 'ready in 2 weeks',
        includes: [
          '3 vertical videos + 5 lifestyle photos',
          'Different angles and hooks to test what converts (A/B)',
          'A mix of to-camera testimonial + aspirational destination shots',
          "Built for the customer journey: from 'dreaming the trip' to 'booking'",
          '1 round of revisions per piece + subtitles',
          'Organic license (90 days) · custom ad + raw footage rights available',
        ],
      },
      {
        badge:    'Maximum impact',
        name:     'Content Library',
        desc:     'For brands that want to feed their socials and ads for months from one shoot.',
        price:    'from €1,400',
        delivery: 'ready in 3-4 weeks',
        includes: [
          '5 vertical videos + 10 photos',
          'Enough material to remix across seasons and campaigns',
          'Full set of formats: testimonial, experience, aspirational and offer',
          'Varied hooks and CTAs ready for paid social',
          "Script and concept included if you don't bring a brief",
          '1 round of revisions + subtitles on every piece',
          'Organic license (6 months) · custom ad, perpetuity + raw rights available',
        ],
      },
    ],
    finalCta: {
      title: 'Ready to work together?',
      body:  "Book 15 min with me and we'll shape a tailored proposal together on the call.",
      cta:   'Book 15 min',
      sub:   'No commitment — the first call is free',
    },
    cta:       "Let's talk about your brand",
    ctaSubtext: 'We respond in less than 48hs.',
    meta: {
      title:       'Travel UGC for brands — Exploriando',
      description: 'On-location UGC for hospitality and travel-tech brands. 9 years on the road, real videos shot on the way, 7-14 day delivery.',
    },
  },
  marcasTeaser: {
    sectionLabel: 'Are you a brand?',
    headline:     'Content that sells the experience — not a staged set.',
    text:         'I make real on-location UGC for travel, beauty and lifestyle brands. Check the portfolio and packages.',
    cta:          'See portfolio and packages',
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
        work: { title: 'Web design', links: [
          { label: 'Portfolio',            href: 'https://orianaledesma.dev/#work' },
          { label: 'Services',             href: 'https://orianaledesma.dev/#services' },
          { label: 'orianaledesma.dev ↗',  href: 'https://orianaledesma.dev' },
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
      { label: 'Viajante Criador', href: '#viajero-creador' },
      { label: 'Marcas',           href: '/marcas' },
      { label: 'Recursos',         href: '#recursos' },
    ],
    cta: 'Entrar na comunidade',
    workWithMe: { label: 'Trabalhe comigo ↗', href: 'https://orianaledesma.dev' },
  },
  hero: {
    eyebrow:     'Comunidade de viajantes latinos',
    headline:    'A melhor coisa que você vai fazer na vida é viajar.',
    subheadline: 'Os 9 anos na estrada me ensinaram que nada que você compra rende como uma experiência. Aqui te mostro onde colocar o dinheiro para que cada viagem valha a pena.',
    cta:         'Me envie o guia grátis',
    ctaSubtext:  'Grátis. Sem spam. Apenas informação que funciona.',
    socialProof: '+2.000 viajantes · 54 cidades · 9 anos viajando',
  },
  about: {
    sectionLabel: 'Quem somos',
    headline:     'Uma argentina que parou de esperar o momento perfeito.',
    body: [
      'Meu nome é Ori. Há anos decidi que não ia esperar ter mais dinheiro, mais tempo ou mais segurança para viajar. Peguei o que tinha e fui.',
      'O que descobri é que a maioria dos obstáculos que achava que eram reais eram, na verdade, falta de informação. Vistos, voos baratos, documentação, destinos acessíveis — tudo tem um como.',
      'Depois o Mindaugas, meu marido lituano, entrou no projeto, e o Exploriando deixou de ser meu para ser dos dois. Eu trago o olhar da latina que enfrentou cada trâmite e cada medo do zero; ele, o do europeu que vive onde, para muitos, a viagem termina. As rotas, os guias e os vídeos — pensamos, viajamos e filmamos juntos.',
    ],
    stats: [
      { value: '54', label: 'cidades percorridas' },
      { value: '9',   label: 'anos viajando em tempo integral' },
      { value: '3',   label: 'continentes do zero' },
    ],
    crossSell:    'Eu construí o Exploriando inteiro, de ponta a ponta. Se o seu projeto precisa de um site próprio, isso também faço eu.',
    crossSellCta: 'orianaledesma.dev →',
  },
  viajeroCreador: {
    sectionLabel:    'Viajante Criador',
    headline:        'Viajar e criar conteúdo não são dois caminhos diferentes.',
    subheadline:     'Cada vez mais pessoas pagam suas viagens criando conteúdo pelo caminho. Você não precisa de milhões de seguidores. Precisa saber como começar.',
    intro:           'Esta seção é para quem quer mais do que fotos bonitas: quer que viajar seja sustentável. Aqui você vai aprender como transformar sua câmera, sua história e seus destinos em algo que te financia.',
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
      session2Badge:    'Economize USD 50',
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
    heroCta:     'Vamos falar do seu projeto ✈',
    sectionLabel: 'Para marcas',
    quienSoy: {
      heading: 'Quem sou',
      body: [
        'Sou a Oriana — criadora de viagens argentina 🇦🇷, morando na Lituânia com meu marido lituano 🇱🇹. Há 9 anos documentamos viagens reais, e nosso conteúdo em casal é o que mais conecta: a escapada romântica, a aventura em família, o lado humano de um lugar.',
      ],
      howTitle:       'Como trabalho:',
      howBody:        'entrego conteúdo pronto para as SUAS redes (UGC) — você é dono(a) dos vídeos e fotos. E se quiser, também compartilho com a minha comunidade.',
      communityTitle: 'Minha comunidade:',
      community:      '4.400 Instagram · 1.880 YouTube · 800 TikTok · viajantes LATAM (25-40) que reservam o que eu recomendo, não só assistem.',
    },
    portfolioTitle:    'Portfólio de conteúdo',
    portfolioSubtitle: 'Conteúdo real gravado no destino, não em estúdio. É assim que o estilo que produzo performa — números públicos de cada peça.',
    portfolioMoreText: 'Quer ver mais trabalhos?',
    portfolioMoreCta:  'Ver o canal completo →',
    hoteles: {
      title:      'Tem um hotel, uma experiência ou um produto pra mostrar?',
      body:       'Crio o conteúdo que vende o que você oferece como ele realmente é: algo que as pessoas querem viver ou ter. Reels, fotos e stories prontos para as suas redes — com o ângulo casal/família que mais conecta.',
      startTitle: 'Vamos começar fácil:',
      startBody:  'experimente um pacote pequeno a partir de €120, ou uma colaboração por permuta (estadia ou produto). Se funcionar, escalamos para um plano mensal.',
      cta:        'Me escreva 📩 · Agende 15 min',
    },
    testimonialsTitle: 'O que dizem as marcas com quem trabalhei',
    testimonials: [],
    packagesTitle: 'Pacotes disponíveis',
    packageCta:    'Agende uma ligação de 20 min',
    packages: [
      {
        badge:    'Para começar',
        name:     'Vídeo UGC avulso',
        desc:     'Para marcas que querem testar o formato com uma peça pensada para frear o scroll.',
        price:    'a partir de €200',
        delivery: 'pronto em 1 semana',
        includes: [
          '1 vídeo vertical (15-60s) pronto para Reels, TikTok e Shorts',
          'Hook que freia o scroll + CTA claro — para converter, não só ficar bonito',
          'Gravado por mim, no destino, com seu produto ou experiência',
          '1 rodada de ajustes + legendas incluídas',
          'Licença de uso orgânico (90 dias) · direitos para ads sob medida',
        ],
      },
      {
        badge:    'O mais pedido',
        name:     'Pack Campanha',
        desc:     'Para marcas que precisam de conteúdo para uma campanha completa, não uma só peça.',
        price:    'a partir de €650',
        delivery: 'pronto em 2 semanas',
        includes: [
          '3 vídeos verticais + 5 fotos lifestyle',
          'Diferentes ângulos e hooks para testar o que converte (A/B)',
          'Mistura de depoimento à câmera + plano aspiracional de destino',
          'Pensado para a jornada do cliente: do "sonhar a viagem" ao "reservar"',
          '1 rodada de ajustes por peça + legendas',
          'Licença orgânica (90 dias) · direitos para ads e material bruto sob medida',
        ],
      },
      {
        badge:    'Máximo impacto',
        name:     'Biblioteca de conteúdo',
        desc:     'Para marcas que querem alimentar suas redes e ads por meses com uma só produção.',
        price:    'a partir de €1.400',
        delivery: 'pronto em 3-4 semanas',
        includes: [
          '5 vídeos verticais + 10 fotos',
          'Material suficiente para remixar por temporadas e campanhas',
          'Set completo de formatos: depoimento, experiência, aspiracional e oferta',
          'Hooks e CTAs variados prontos para paid social',
          'Roteiro e conceito incluídos se você não trouxer brief',
          '1 rodada de ajustes + legendas em todas as peças',
          'Licença orgânica (6 meses) · direitos para ads, perpetuidade e bruto sob medida',
        ],
      },
    ],
    finalCta: {
      title: 'Pronto para trabalhar juntos?',
      body:  'Agende 15 min comigo e montamos a proposta sob medida na chamada.',
      cta:   'Agendar 15 min',
      sub:   'Sem compromisso — a primeira consulta é grátis',
    },
    cta:       'Vamos falar sobre sua marca',
    ctaSubtext: 'Respondemos em menos de 48hs.',
    meta: {
      title:       'UGC para marcas de viagem — Exploriando',
      description: 'Conteúdo UGC no destino para marcas de hospitalidade e travel-tech. 9 anos na estrada, vídeos reais gravados em rota, entrega em 7-14 dias.',
    },
  },
  marcasTeaser: {
    sectionLabel: 'Você é uma marca?',
    headline:     'Conteúdo que vende a experiência, não uma cena montada.',
    text:         'Faço UGC real no destino para marcas de viagem, beauty e lifestyle. Veja o portfólio e os pacotes.',
    cta:          'Ver portfólio e pacotes',
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
        work: { title: 'Design web', links: [
          { label: 'Portfólio',            href: 'https://orianaledesma.dev/#work' },
          { label: 'Serviços',             href: 'https://orianaledesma.dev/#services' },
          { label: 'orianaledesma.dev ↗',  href: 'https://orianaledesma.dev' },
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
