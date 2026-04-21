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
  };
  ugc: {
    sectionLabel: string; headline: string; subheadline: string;
    packages: Package[]; cta: string; ctaSubtext: string;
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
}

// ─── Español ──────────────────────────────────────────────────────────────────

const es: AppTranslations = {
  nav: {
    links: [
      { label: 'Nosotros',        href: '#about' },
      { label: 'Viajero Creador', href: '#viajero-creador' },
      { label: 'Documentación',   href: '#documentacion' },
      { label: 'Marcas',          href: '/marcas' },
      { label: 'Recursos',        href: '#recursos' },
    ],
    cta: 'Unirme a la comunidad',
    workWithMe: { label: 'Trabajá conmigo ↗', href: 'https://orianaledesma.dev' },
  },
  hero: {
    eyebrow:     'Comunidad de viajeros latinos',
    headline:    'No necesitás más plata.\nNecesitás saber cómo hacerlo.',
    subheadline: 'Dejé Argentina con lo justo y llevo 10 años viajando full time. Lo que aprendí lo estoy poniendo acá, gratis, para que vos puedas hacer lo mismo.',
    cta:         'Unirme a la comunidad',
    ctaSubtext:  'Sin costo. Sin spam. Solo información que funciona.',
    socialProof: '+2.000 viajeros · 40+ ciudades · 10 años viajando',
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
      'Creé Exploriando para demostrar que cualquier persona puede hacer lo mismo. Lo cuento junto a Mindaugas, mi esposo — viajamos y grabamos juntos. La parte informativa, las guías y lo más trabajado es mío; él empezó a aparecer en los videos este último año, mostrando el lado cotidiano del viaje en pareja.',
    ],
    stats: [
      { value: '40+', label: 'ciudades recorridas' },
      { value: '10+', label: 'años viajando full time' },
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
  },
  ugc: {
    sectionLabel: 'Para marcas',
    headline:     'Contenido de viaje que convierte, no solo que se ve lindo.',
    subheadline:  'Creamos contenido auténtico para marcas de turismo, alojamiento, productos de viaje y productos digitales. Nada de escenas armadas: puro viaje real.',
    packages: [
      { name: 'Pack Básico',          price: '€150', includes: ['3 videos cortos (reels / TikTok)', 'Entrega en 7 días', 'Uso ilimitado en redes'] },
      { name: 'Pack Completo',        price: '€400', includes: ['10 videos cortos + 15 fotos', 'Guión y estrategia incluidos', 'Entrega en 14 días', 'Revisión incluida'] },
      { name: 'Acompañamiento VIP',   price: '€700', includes: ['Contenido mensual continuo', 'Estrategia de contenido', 'Reportes de rendimiento', 'Canal directo de comunicación'] },
    ],
    cta:       'Hablemos de tu marca',
    ctaSubtext: 'Respondemos en menos de 48hs.',
  },
  footer: {
    finalCta: {
      headline:    '¿Todavía no sos parte?',
      subheadline: 'Cada semana mandamos información concreta: destinos accesibles, requisitos actualizados, errores que evitar. Gratis, siempre.',
      cta:         'Unirme ahora',
      ctaSubtext:  'Ya son más de 2.000 viajeros adentro.',
    },
    footer: {
      tagline: 'No necesitás ser rico para viajar.\nNecesitás saber cómo hacerlo.',
      columns: {
        explore: { title: 'Explorar', links: [
          { label: 'Blog',               href: '/' },
          { label: 'Viajero Creador',    href: 'https://www.youtube.com/watch?v=-XOHTRkBZv8&list=PLjZ30HHREgvqeMNLcj36yBabdMVw_fAwa' },
          { label: 'Documentación',      href: '#documentacion' },
          { label: 'Recursos gratuitos', href: '#recursos' },
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
};

// ─── English ──────────────────────────────────────────────────────────────────

const en: AppTranslations = {
  nav: {
    links: [
      { label: 'About',            href: '#about' },
      { label: 'Creator Traveler', href: '#viajero-creador' },
      { label: 'Documentation',    href: '#documentacion' },
      { label: 'Brands',           href: '/marcas' },
      { label: 'Resources',        href: '#recursos' },
    ],
    cta: 'Join the community',
    workWithMe: { label: 'Work with me ↗', href: 'https://orianaledesma.dev' },
  },
  hero: {
    eyebrow:     'Latin traveler community',
    headline:    "You don't need more money.\nYou need to know how.",
    subheadline: "I left Argentina with just enough and have been traveling full time for 10 years. What I've learned, I'm sharing here — free — so you can do the same.",
    cta:         'Join the community',
    ctaSubtext:  'Free. No spam. Just information that works.',
    socialProof: '+2,000 travelers · 40+ cities · 10 years traveling',
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
      "I created Exploriando to show that anyone can do the same. I share it alongside Mindaugas, my husband — we travel and film together. The informational side, the guides and the more in-depth content is mine; he started appearing in the videos this past year, showing the everyday side of traveling as a couple.",
    ],
    stats: [
      { value: '40+', label: 'cities visited' },
      { value: '10+', label: 'years traveling full time' },
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
  },
  ugc: {
    sectionLabel: 'For brands',
    headline:     'Travel content that converts, not just looks good.',
    subheadline:  'We create authentic content for tourism, accommodation, travel product and digital product brands. Nothing staged: pure real travel.',
    packages: [
      { name: 'Basic Pack',         price: '€150', includes: ['3 short videos (reels / TikTok)', 'Delivery in 7 days', 'Unlimited use on social media'] },
      { name: 'Complete Pack',      price: '€400', includes: ['10 short videos + 15 photos', 'Script and strategy included', 'Delivery in 14 days', 'Revision included'] },
      { name: 'VIP Accompaniment',  price: '€700', includes: ['Ongoing monthly content', 'Content strategy', 'Performance reports', 'Direct communication channel'] },
    ],
    cta:       "Let's talk about your brand",
    ctaSubtext: 'We respond in less than 48hs.',
  },
  footer: {
    finalCta: {
      headline:    'Not a member yet?',
      subheadline: 'Every week we send concrete information: accessible destinations, updated requirements, mistakes to avoid. Free, always.',
      cta:         'Join now',
      ctaSubtext:  'Over 2,000 travelers are already inside.',
    },
    footer: {
      tagline: "You don't need to be rich to travel.\nYou need to know how.",
      columns: {
        explore: { title: 'Explore', links: [
          { label: 'Blog',              href: '/' },
          { label: 'Creator Traveler',  href: 'https://www.youtube.com/watch?v=-XOHTRkBZv8&list=PLjZ30HHREgvqeMNLcj36yBabdMVw_fAwa' },
          { label: 'Documentation',     href: '#documentacion' },
          { label: 'Free resources',    href: '#recursos' },
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
};

// ─── Português ────────────────────────────────────────────────────────────────

const pt: AppTranslations = {
  nav: {
    links: [
      { label: 'Sobre nós',        href: '#about' },
      { label: 'Viajante Criador', href: '#viajero-creador' },
      { label: 'Documentação',     href: '#documentacion' },
      { label: 'Marcas',           href: '/marcas' },
      { label: 'Recursos',         href: '#recursos' },
    ],
    cta: 'Entrar na comunidade',
    workWithMe: { label: 'Trabalhe comigo ↗', href: 'https://orianaledesma.dev' },
  },
  hero: {
    eyebrow:     'Comunidade de viajantes latinos',
    headline:    'Você não precisa de mais dinheiro.\nVocê precisa saber como.',
    subheadline: 'Deixei a Argentina com o mínimo e já viajei em tempo integral por 10 anos. O que aprendi estou compartilhando aqui, de graça, para você poder fazer o mesmo.',
    cta:         'Entrar na comunidade',
    ctaSubtext:  'Grátis. Sem spam. Apenas informação que funciona.',
    socialProof: '+2.000 viajantes · 40+ cidades · 10 anos viajando',
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
      'Criei o Exploriando para mostrar que qualquer pessoa pode fazer o mesmo. Conto com Mindaugas, meu marido — viajamos e filmamos juntos. A parte informativa, os guias e o conteúdo mais elaborado é de minha parte; ele começou a aparecer nos vídeos neste último ano, mostrando o lado cotidiano de viajar em casal.',
    ],
    stats: [
      { value: '40+', label: 'cidades percorridas' },
      { value: '10+', label: 'anos viajando em tempo integral' },
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
  },
  ugc: {
    sectionLabel: 'Para marcas',
    headline:     'Conteúdo de viagem que converte, não apenas que fica bonito.',
    subheadline:  'Criamos conteúdo autêntico para marcas de turismo, hospedagem, produtos de viagem e produtos digitais. Nada encenado: pura viagem real.',
    packages: [
      { name: 'Pack Básico',          price: '€150', includes: ['3 vídeos curtos (reels / TikTok)', 'Entrega em 7 dias', 'Uso ilimitado nas redes'] },
      { name: 'Pack Completo',        price: '€400', includes: ['10 vídeos curtos + 15 fotos', 'Roteiro e estratégia incluídos', 'Entrega em 14 dias', 'Revisão incluída'] },
      { name: 'Acompanhamento VIP',   price: '€700', includes: ['Conteúdo mensal contínuo', 'Estratégia de conteúdo', 'Relatórios de desempenho', 'Canal direto de comunicação'] },
    ],
    cta:       'Vamos falar sobre sua marca',
    ctaSubtext: 'Respondemos em menos de 48hs.',
  },
  footer: {
    finalCta: {
      headline:    'Ainda não faz parte?',
      subheadline: 'Toda semana enviamos informações concretas: destinos acessíveis, requisitos atualizados, erros a evitar. Grátis, sempre.',
      cta:         'Entrar agora',
      ctaSubtext:  'Mais de 2.000 viajantes já estão dentro.',
    },
    footer: {
      tagline: 'Você não precisa ser rico para viajar.\nVocê precisa saber como.',
      columns: {
        explore: { title: 'Explorar', links: [
          { label: 'Blog',               href: '/' },
          { label: 'Viajante Criador',   href: 'https://www.youtube.com/watch?v=-XOHTRkBZv8&list=PLjZ30HHREgvqeMNLcj36yBabdMVw_fAwa' },
          { label: 'Documentação',       href: '#documentacion' },
          { label: 'Recursos gratuitos', href: '#recursos' },
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
};

// ─── Export ───────────────────────────────────────────────────────────────────

export const TRANSLATIONS: Record<Lang, AppTranslations> = { es, en, pt };
