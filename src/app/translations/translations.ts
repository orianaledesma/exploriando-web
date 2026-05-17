import { Lang } from '../models/language.model';

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavLink        { label: string; href: string; }
interface FooterLink     { label: string; href: string; }
interface Stat           { value: string; label: string; }
interface Topic          { title: string; description: string; }
interface Package        { name: string; price: string; includes: string[]; }
interface ComunidadItem  { icon: string; title: string; desc: string; }

interface AppTranslations {
  nav: { links: NavLink[]; cta: string; workWithMe: { label: string; href: string; }; };
  hero: { eyebrow: string; headline: string; subheadline: string; cta: string; ctaSubtext: string; socialProof: string; };
  comunidad: { sectionLabel: string; headline: string; items: ComunidadItem[]; cta: string; };
  about: { sectionLabel: string; headline: string; body: string[]; stats: Stat[]; crossSell: string; crossSellCta: string; };
  viajeroCreador: {
    sectionLabel: string; headline: string; subheadline: string; intro: string;
    topics: Topic[]; cta: string; ctaSubtext: string; comingSoonBadge: string; comingSoonText: string;
    waitlistSuccess: string; waitlistDuplicate: string;
    sessions: {
      preTitle: string; title: string; sub: string;
      session1Name: string; session1Duration: string;
      session2Name: string; session2Duration: string; session2Badge: string;
      cta: string; ctaNote: string;
    };
  };
  documentacion: {
    sectionLabel: string; headline: string; subheadline: string;
    form: { title: string; nationalityLabel: string; nationalityPlaceholder: string; originLabel: string; originPlaceholder: string; destinationLabel: string; destinationPlaceholder: string; submitBtn: string; submitBtnLoading: string; };
    result: { documentsTitle: string; migrationTitle: string; disclaimer: string; disclaimerLinkText: string; };
    postResultCta: { text: string; subtext: string; cta: string; };
    errors: { apiError: string; noData: string; offline: string; rateLimit: string; retry: string; };
  };
  recursos: {
    sectionLabel: string; headline: string; subheadline: string; guideTitle: string;
    guideContents: string[];
    form: { emailLabel: string; emailPlaceholder: string; cta: string; ctaLoading: string; privacyNote: string; };
    successMessage: string; alreadySubscribed: string;
    testimonial: { quote: string; author: string; location: string; };
  };
  ugc: {
    sectionLabel: string; headline: string; subheadline: string;
    packages: Package[]; cta: string; ctaSubtext: string;
    meta: { title: string; description: string; };
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
    headline:    'No necesitás más plata. Necesitás saber cómo hacerlo.',
    subheadline: 'Dejé Argentina con lo justo y llevo 9 años viajando full time. Lo que aprendí lo estoy poniendo acá, gratis, para que vos puedas hacer lo mismo.',
    cta:         'Mandame la guía gratis',
    ctaSubtext:  'Sin costo. Sin spam. Solo información que funciona.',
    socialProof: '+2.000 viajeros · 54 ciudades · 9 años viajando',
  },
  comunidad: {
    sectionLabel: 'La comunidad',
    headline:     'Qué ganás sumándote',
    items: [
      { icon: '📺', title: 'Videos semanales',    desc: 'Cada semana un video nuevo en YouTube: un destino, cómo viajar con presupuesto ajustado o cómo crear contenido en el camino.' },
      { icon: '📥', title: 'Guía de bienvenida',  desc: 'Al dejar tu correo recibís la guía básica del viajero: documentos, apps, dinero y tips de quién ya lo vivió.' },
      { icon: '🎥', title: 'Lives mensuales',     desc: 'El primer domingo de cada mes, en vivo a las 9PM (hora de Lituania). Preguntas, respuestas y novedades de Exploriando.' },
      { icon: '🤝', title: 'Comunidad activa',    desc: 'Miles de latinos viajando y compartiendo en YouTube e Instagram. Puro contenido útil, sin grupos de Facebook.' },
    ],
    cta: 'Quiero estar adentro →',
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
    crossSell:    '¿Querés que tu proyecto tenga presencia digital profesional?',
    crossSellCta: 'Conocé los servicios de diseño web →',
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
    cta:              'Anotarme a la lista de espera',
    ctaSubtext:       '',
    comingSoonBadge:  'LISTA DE ESPERA ABIERTA',
    comingSoonText:   'Cupos limitados. Descuento early-bird para los primeros.',
    waitlistSuccess:  '¡Anotada! Te avisamos antes que nadie cuando abra.',
    waitlistDuplicate: 'Ya estás en la lista. ¡Nos vemos adentro!',
    sessions: {
      preTitle:         '¿No querés esperar al programa?',
      title:            'Sesiones 1:1 conmigo',
      sub:              'Una hora directo conmigo para resolver lo que tengas trabado: documentación, plan de ruta, vuelos baratos, presupuesto, o cómo arrancar a crear contenido en el camino.',
      session1Name:     'Sesión individual',
      session1Duration: '45 min',
      session2Name:     'Pack 3 sesiones',
      session2Duration: '45 min cada una',
      session2Badge:    'Ahorrás USD 50',
      cta:              'Reservar sesión',
      ctaNote:          'Te respondo en menos de 48hs con disponibilidad.',
    },
  },
  documentacion: {
    sectionLabel: 'Documentación de viaje',
    headline:     'Sabé exactamente qué necesitás antes de hacer las valijas.',
    subheadline:  'Burocracia, visas, formularios de migración: lo más aburrido del viaje, resuelto en segundos. Contanos de dónde sos, a dónde vas, y te decimos todo.',
    form: {
      title:                    '¿Qué necesito para viajar?',
      nationalityLabel:         'Tu nacionalidad',
      nationalityPlaceholder:   'Ej: Argentina',
      originLabel:              'País de origen del viaje',
      originPlaceholder:        'Ej: México',
      destinationLabel:         'Destino',
      destinationPlaceholder:   'Ej: Portugal',
      submitBtn:                'Ver qué necesito',
      submitBtnLoading:         'Consultando requisitos...',
    },
    result: {
      documentsTitle:     'Documentos para viajar',
      migrationTitle:     'Qué te van a pedir al llegar',
      disclaimer:         '⚠ Esta información es orientativa. Siempre verificá con la embajada o consulado correspondiente antes de viajar, ya que los requisitos pueden cambiar sin previo aviso.',
      disclaimerLinkText: 'Fuentes oficiales de cancillería',
    },
    postResultCta: {
      text:    '¿Querés más recursos como este?',
      subtext: 'En la comunidad tenemos guías de más de 30 destinos, consejos de viajeros y actualizaciones de requisitos.',
      cta:     'Unirme gratis',
    },
    errors: {
      apiError:  'No pudimos consultar los requisitos en este momento. Intentá de nuevo o escribinos a la comunidad y te ayudamos.',
      noData:    'No tenemos información suficiente sobre esta combinación todavía. Unite a la comunidad y te respondemos directamente.',
      offline:   'Parece que no tenés conexión. Revisá tu internet e intentá de nuevo.',
      rateLimit: 'Hiciste varias consultas seguidas. Esperá unos minutos e intentá de nuevo.',
      retry:     'Intentar de nuevo',
    },
  },
  recursos: {
    sectionLabel:  'Recursos gratuitos',
    headline:      'La guía que hubiéramos querido tener antes de nuestro primer viaje.',
    subheadline:   'Sin relleno, sin teoría. Solo lo que realmente necesitás saber para organizar tu primer viaje sin gastar de más.',
    guideTitle:    'Guía para tu primer viaje',
    guideContents: [
      'Documentos y pasaporte: qué llevar y cómo guardarlo en la nube',
      'Dinero, tarjetas y seguro médico: lo básico que no puede faltar',
      'Qué meter en el bolso de mano si tu maleta facturada se pierde',
      'Apps imprescindibles de traducción, transporte y pagos digitales',
      'Checklist final: alojamiento, vuelos y reservas antes de salir',
      'Consejos de viajero inteligente: equipaje, clima y programas de millas',
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
    sectionLabel: 'Para marcas',
    headline:     'Contenido que vende la experiencia, no una escena armada.',
    subheadline:  'Video real que frena el scroll para marcas de viaje, beauty y lifestyle. Del que la gente cree porque no parece un anuncio.',
    packages: [
      { name: 'Pack Básico',  price: '€150',     includes: ['3 reels/TikToks listos para publicar', '3 aperturas por video para frenar el scroll', 'Entrega en 7 días · uso ilimitado en tus redes'] },
      { name: 'Pack Completo', price: '€400',    includes: ['Campaña de 5 videos pensada para UN objetivo (lanzamiento, venta o awareness)', 'Guión y estrategia: yo defino el ángulo, vos publicás', '1 ronda de ajustes · entrega en 14 días'] },
      { name: 'VIP Mensual',   price: '€700/mes', includes: ['8 videos al mes + estrategia de contenido continua', 'Calendario de publicación + reporte mensual', 'Hasta 2 rondas/mes · canal directo acordado'] },
    ],
    cta:       'Hablemos de tu marca',
    ctaSubtext: 'Respondemos en menos de 48hs.',
    meta: {
      title:       'UGC para marcas de viaje — Exploriando',
      description: 'Contenido UGC en destino para hospitality y travel-tech. 9 años recorriendo, videos reales grabados en ruta, entrega en 7-14 días.',
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
    mapAriaLabel:   '54 ciudades en 16 países que recorrió Oriana — mapa decorativo, navegá por la lista',
  },
  mapa: {
    eyebrow:              'Mapa de viajes',
    title:                'Por dónde anduvimos',
    subtitle:             'Cada lugar acá lo grabamos, lo escribimos y lo vivimos. Elegí un país y empezá.',
    countriesLabel:       'países',
    placesLabel:          'ciudades',
    yearsLabel:           'años en la ruta',
    mapHint:              'Tocá un país de la lista para ver sus guías',
    mapAriaLabel:         '54 ciudades en 16 países visitados',
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
          { label: 'YouTube',            href: 'https://www.youtube.com/@Exploriando' },
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
    headline:    "You don't need more money. You need to know how.",
    subheadline: "I left Argentina with just enough and have been traveling full time for 9 years. What I've learned, I'm sharing here — free — so you can do the same.",
    cta:         'Send me the free guide',
    ctaSubtext:  'Free. No spam. Just information that works.',
    socialProof: '+2,000 travelers · 54 cities · 9 years traveling',
  },
  comunidad: {
    sectionLabel: 'The community',
    headline:     'What you gain by joining',
    items: [
      { icon: '📺', title: 'Weekly videos',        desc: 'A new YouTube video every week: a destination, how to travel on a budget, or how to create content on the road.' },
      { icon: '📥', title: 'Welcome guide',        desc: "Leave your email and get the traveler's starter guide: documents, apps, money and tips from someone who's already done it." },
      { icon: '🎥', title: 'Monthly live sessions', desc: 'Every first Sunday of the month, live at 9PM (Lithuania time). Q&A and Exploriando updates.' },
      { icon: '🤝', title: 'Active community',     desc: 'Thousands of Latinos traveling and sharing on YouTube and Instagram. Useful content only — no Facebook groups.' },
    ],
    cta: 'I want in →',
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
    crossSell:    'Looking for professional web design for your project?',
    crossSellCta: 'Explore web design services →',
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
    cta:               'Join the waitlist',
    ctaSubtext:        '',
    comingSoonBadge:   'WAITLIST OPEN',
    comingSoonText:    'Limited spots. Early-bird discount for the first ones in.',
    waitlistSuccess:   "You're on the list! We'll notify you before anyone else when it opens.",
    waitlistDuplicate: "You're already on the list. See you inside!",
    sessions: {
      preTitle:         "Don't want to wait for the program?",
      title:            '1:1 sessions with me',
      sub:              "An hour directly with me to unblock whatever's stuck: paperwork, route planning, cheap flights, budgeting, or how to start creating content on the road.",
      session1Name:     'Single session',
      session1Duration: '45 min',
      session2Name:     'Pack of 3 sessions',
      session2Duration: '45 min each',
      session2Badge:    'Save USD 50',
      cta:              'Book a session',
      ctaNote:          'I reply in under 48h with availability.',
    },
  },
  documentacion: {
    sectionLabel: 'Travel documentation',
    headline:     'Know exactly what you need before packing your bags.',
    subheadline:  'Bureaucracy, visas, migration forms: the most boring part of travel, solved in seconds. Tell us where you\'re from, where you\'re going, and we\'ll tell you everything.',
    form: {
      title:                  'What do I need to travel?',
      nationalityLabel:       'Your nationality',
      nationalityPlaceholder: 'e.g. Argentina',
      originLabel:            'Country of origin',
      originPlaceholder:      'e.g. Mexico',
      destinationLabel:       'Destination',
      destinationPlaceholder: 'e.g. Portugal',
      submitBtn:              'See what I need',
      submitBtnLoading:       'Checking requirements...',
    },
    result: {
      documentsTitle:     'Documents to travel',
      migrationTitle:     "What they'll ask you upon arrival",
      disclaimer:         '⚠ This information is for guidance only. Always verify with the corresponding embassy or consulate before traveling, as requirements may change without notice.',
      disclaimerLinkText: 'Official government sources',
    },
    postResultCta: {
      text:    'Want more resources like this?',
      subtext: 'In the community we have guides for over 30 destinations, traveler tips, and updated requirements.',
      cta:     'Join for free',
    },
    errors: {
      apiError:  "We couldn't check the requirements at this time. Try again or write to the community and we'll help you.",
      noData:    "We don't have enough information about this combination yet. Join the community and we'll answer directly.",
      offline:   "It seems you don't have a connection. Check your internet and try again.",
      rateLimit: "You've made several queries in a row. Wait a few minutes and try again.",
      retry:     'Try again',
    },
  },
  recursos: {
    sectionLabel:  'Free resources',
    headline:      "The guide we wish we'd had before our first trip.",
    subheadline:   "No fluff, no theory. Just what you really need to know to organize your first trip without overspending.",
    guideTitle:    'Guide for your first trip',
    guideContents: [
      'Documents and passport: what to carry and how to back it up online',
      'Money, cards and travel insurance: the basics you cannot skip',
      'What to pack in your carry-on in case your checked bag is lost',
      'Must-have apps for translation, transport and digital payments',
      'Final checklist: accommodation, flights and reservations before you go',
      'Smart traveler tips: luggage, weather and frequent flyer programs',
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
    sectionLabel: 'For brands',
    headline:     'Content that sells the experience — not a staged set.',
    subheadline:  "Real, scroll-stopping video for travel, beauty and lifestyle brands. The kind people trust because it doesn't look like an ad.",
    packages: [
      { name: 'Basic Pack',    price: '€150',     includes: ['3 ready-to-post reels/TikToks', '3 hooks per video to stop the scroll', 'Delivered in 7 days · unlimited use on your socials'] },
      { name: 'Complete Pack', price: '€400',     includes: ['A 5-video campaign built for ONE goal (launch, sale or awareness)', 'Script & strategy: I set the angle, you post', '1 round of revisions · delivered in 14 days'] },
      { name: 'VIP Monthly',   price: '€700/mo',  includes: ['8 videos a month + ongoing content strategy', 'Publishing calendar + monthly performance report', 'Up to 2 revision rounds/mo · direct channel'] },
    ],
    cta:       "Let's talk about your brand",
    ctaSubtext: 'We respond in less than 48hs.',
    meta: {
      title:       'Travel UGC for brands — Exploriando',
      description: 'On-location UGC for hospitality and travel-tech brands. 9 years on the road, real videos shot on the way, 7-14 day delivery.',
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
    mapAriaLabel:   '54 cities across 16 countries Oriana traveled — decorative map, navigate via the list',
  },
  mapa: {
    eyebrow:              'Travel map',
    title:                'Where we have been',
    subtitle:             "Every place here we filmed, wrote and lived. Pick a country and let's go.",
    countriesLabel:       'countries',
    placesLabel:          'cities',
    yearsLabel:           'years on the road',
    mapHint:              'Tap a country in the list to see its guides',
    mapAriaLabel:         '54 cities across 16 countries visited',
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
          { label: 'YouTube',           href: 'https://www.youtube.com/@Exploriando' },
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
    headline:    'Você não precisa de mais dinheiro. Você precisa saber como.',
    subheadline: 'Deixei a Argentina com o mínimo e já viajei em tempo integral por 9 anos. O que aprendi estou compartilhando aqui, de graça, para você poder fazer o mesmo.',
    cta:         'Me envie o guia grátis',
    ctaSubtext:  'Grátis. Sem spam. Apenas informação que funciona.',
    socialProof: '+2.000 viajantes · 54 cidades · 9 anos viajando',
  },
  comunidad: {
    sectionLabel: 'A comunidade',
    headline:     'O que você ganha entrando',
    items: [
      { icon: '📺', title: 'Vídeos semanais',       desc: 'Um vídeo novo no YouTube toda semana: um destino, como viajar com orçamento ajustado ou como criar conteúdo pelo caminho.' },
      { icon: '📥', title: 'Guia de boas-vindas',   desc: 'Ao deixar seu email você recebe o guia básico do viajante: documentos, apps, dinheiro e dicas de quem já viveu isso.' },
      { icon: '🎥', title: 'Lives mensais',         desc: 'Todo primeiro domingo do mês, ao vivo às 21h (horário da Lituânia). Perguntas, respostas e novidades do Exploriando.' },
      { icon: '🤝', title: 'Comunidade ativa',      desc: 'Milhares de latinos viajando e compartilhando no YouTube e Instagram. Conteúdo útil, sem grupos de Facebook.' },
    ],
    cta: 'Quero entrar →',
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
    crossSell:    'Quer que seu projeto tenha presença digital profissional?',
    crossSellCta: 'Conheça os serviços de design web →',
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
    cta:               'Entrar na lista de espera',
    ctaSubtext:        '',
    comingSoonBadge:   'LISTA DE ESPERA ABERTA',
    comingSoonText:    'Vagas limitadas. Desconto early-bird para os primeiros.',
    waitlistSuccess:   'Anotada! Avisamos você antes de qualquer um quando abrir.',
    waitlistDuplicate: 'Você já está na lista. Nos vemos dentro!',
    sessions: {
      preTitle:         'Não quer esperar pelo programa?',
      title:            'Sessões 1:1 comigo',
      sub:              'Uma hora direto comigo para resolver o que estiver travado: documentação, planejamento da rota, voos baratos, orçamento ou como começar a criar conteúdo pelo caminho.',
      session1Name:     'Sessão individual',
      session1Duration: '45 min',
      session2Name:     'Pack 3 sessões',
      session2Duration: '45 min cada',
      session2Badge:    'Economize USD 50',
      cta:              'Reservar sessão',
      ctaNote:          'Respondo em menos de 48h com disponibilidade.',
    },
  },
  documentacion: {
    sectionLabel: 'Documentação de viagem',
    headline:     'Saiba exatamente o que você precisa antes de fazer as malas.',
    subheadline:  'Burocracia, vistos, formulários de migração: a parte mais chata da viagem, resolvida em segundos. Nos diga de onde você é, para onde vai, e te dizemos tudo.',
    form: {
      title:                  'O que preciso para viajar?',
      nationalityLabel:       'Sua nacionalidade',
      nationalityPlaceholder: 'Ex: Argentina',
      originLabel:            'País de origem da viagem',
      originPlaceholder:      'Ex: México',
      destinationLabel:       'Destino',
      destinationPlaceholder: 'Ex: Portugal',
      submitBtn:              'Ver o que preciso',
      submitBtnLoading:       'Consultando requisitos...',
    },
    result: {
      documentsTitle:     'Documentos para viajar',
      migrationTitle:     'O que vão pedir ao chegar',
      disclaimer:         '⚠ Esta informação é orientativa. Sempre verifique com a embaixada ou consulado correspondente antes de viajar, pois os requisitos podem mudar sem aviso prévio.',
      disclaimerLinkText: 'Fontes oficiais do governo',
    },
    postResultCta: {
      text:    'Quer mais recursos como este?',
      subtext: 'Na comunidade temos guias de mais de 30 destinos, dicas de viajantes e atualizações de requisitos.',
      cta:     'Entrar de graça',
    },
    errors: {
      apiError:  'Não pudemos consultar os requisitos no momento. Tente novamente ou escreva para a comunidade e te ajudamos.',
      noData:    'Não temos informação suficiente sobre essa combinação ainda. Entre na comunidade e te respondemos diretamente.',
      offline:   'Parece que você não tem conexão. Verifique sua internet e tente novamente.',
      rateLimit: 'Você fez várias consultas seguidas. Espere alguns minutos e tente novamente.',
      retry:     'Tentar novamente',
    },
  },
  recursos: {
    sectionLabel:  'Recursos gratuitos',
    headline:      'O guia que gostaríamos de ter tido antes da nossa primeira viagem.',
    subheadline:   'Sem enrolação, sem teoria. Apenas o que você realmente precisa saber para organizar sua primeira viagem sem gastar demais.',
    guideTitle:    'Guia para sua primeira viagem',
    guideContents: [
      'Documentos e passaporte: o que levar e como guardá-los na nuvem',
      'Dinheiro, cartões e seguro de viagem: o básico que não pode faltar',
      'O que colocar na mala de mão se a mala despachada se perder',
      'Apps indispensáveis de tradução, transporte e pagamentos digitais',
      'Checklist final: hospedagem, voos e reservas antes de partir',
      'Dicas de viajante inteligente: bagagem, clima e programas de milhas',
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
    sectionLabel: 'Para marcas',
    headline:     'Conteúdo que vende a experiência, não uma cena montada.',
    subheadline:  'Vídeo real que freia o scroll para marcas de viagem, beauty e lifestyle. Do tipo em que as pessoas confiam porque não parece um anúncio.',
    packages: [
      { name: 'Pack Básico',  price: '€150',      includes: ['3 reels/TikToks prontos para publicar', '3 aberturas por vídeo para frear o scroll', 'Entrega em 7 dias · uso ilimitado nas suas redes'] },
      { name: 'Pack Completo', price: '€400',     includes: ['Uma campanha de 5 vídeos para UM objetivo (lançamento, venda ou awareness)', 'Roteiro e estratégia: eu defino o ângulo, você publica', '1 rodada de ajustes · entrega em 14 dias'] },
      { name: 'VIP Mensal',    price: '€700/mês', includes: ['8 vídeos por mês + estratégia de conteúdo contínua', 'Calendário de publicação + relatório mensal', 'Até 2 rodadas/mês · canal direto combinado'] },
    ],
    cta:       'Vamos falar sobre sua marca',
    ctaSubtext: 'Respondemos em menos de 48hs.',
    meta: {
      title:       'UGC para marcas de viagem — Exploriando',
      description: 'Conteúdo UGC no destino para marcas de hospitalidade e travel-tech. 9 anos na estrada, vídeos reais gravados em rota, entrega em 7-14 dias.',
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
    mapAriaLabel:   '54 cidades em 16 países que a Oriana percorreu — mapa decorativo, navegue pela lista',
  },
  mapa: {
    eyebrow:              'Mapa de viagens',
    title:                'Por onde andamos',
    subtitle:             'Cada lugar aqui gravamos, escrevemos e vivemos. Escolha um país e comece.',
    countriesLabel:       'países',
    placesLabel:          'cidades',
    yearsLabel:           'anos na estrada',
    mapHint:              'Toque em um país da lista pra ver os guias',
    mapAriaLabel:         '54 cidades em 16 países visitados',
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
          { label: 'YouTube',            href: 'https://www.youtube.com/@Exploriando' },
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
