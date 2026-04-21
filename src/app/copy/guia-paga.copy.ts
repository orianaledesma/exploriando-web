// ─── Sección / Página: Guía paga €9 ──────────────────────────────────────────

export interface GuiaInclude {
  icon:  string;
  title: string;
  desc:  string;
}

export interface GuiaTestimonial {
  quote:    string;
  author:   string;
  location: string;
}

export interface GuiaPagaCopy {
  sectionLabel:   string;
  headline:       string;
  subheadline:    string;
  price:          string;
  priceContext:   string;
  pricePermanent: string;
  includes:       GuiaInclude[];
  vsGratuita:     { free: string[]; paid: string[]; };
  testimonials:   GuiaTestimonial[];
  guarantee:      string;
  cta:            string;
  ctaSubtext:     string;
  socialProof:    string;
}

// ─── Versión A — Hook contraste (mapa vs GPS) ─────────────────────────────────

export const GUIA_PAGA_COPY_A: GuiaPagaCopy = {
  sectionLabel: 'Siguiente nivel',
  headline:     'La guía gratuita te da el mapa.\nEsta te da el GPS.',
  subheadline:
    'La gratuita cubre los conceptos. Esta tiene los números reales: ' +
    'cuánto gasté en cada destino, cuándo comprar cada vuelo, ' +
    'qué aplicaciones uso para pagar la mitad.',
  price:        '€9',
  priceContext: 'Una sola noche de hostel. Un viaje completo mejor planeado.',
  includes: [
    {
      icon:  '✈',
      title: 'Sistema de vuelos baratos',
      desc:  'Cuándo buscar, cuándo comprar, qué días son más baratos y por qué. Con ejemplos de rutas reales desde Latinoamérica.',
    },
    {
      icon:  '🏨',
      title: 'Alojamiento sin pagar de más',
      desc:  'Hostels, Airbnbs, intercambios de casas, couchsurfing: cuándo usar cada uno y cómo encontrar los buenos.',
    },
    {
      icon:  '💸',
      title: 'Presupuestos reales por destino',
      desc:  'No estimaciones. Números de lo que gasté en Europa, Asia y América, semana a semana.',
    },
    {
      icon:  '📋',
      title: 'Checklist de pre-salida',
      desc:  'Lo que revisás 30 días, 7 días y 24 hs antes. Lo que olvidé en mis primeros viajes para que vos no lo olvides.',
    },
    {
      icon:  '🛡',
      title: 'Seguros e imprevistos',
      desc:  'Qué seguro contratar según el viaje, qué cubre realmente y cómo presentar un reclamo si algo sale mal.',
    },
    {
      icon:  '📱',
      title: 'Stack de apps del viajero',
      desc:  'Las 12 aplicaciones que tengo instaladas siempre. Con las configuraciones que nadie cuenta en YouTube.',
    },
  ],
  vsGratuita: {
    free: [
      'Conceptos generales de cómo viajar barato',
      'Checklist básica de documentación',
      'Errores comunes del primerizo',
    ],
    paid: [
      'Sistema paso a paso con fechas y números',
      'Presupuestos reales de destinos concretos',
      'Estrategia de vuelos con capturas de pantalla',
      'Stack completo de herramientas con configuraciones',
      'Actualizaciones incluidas — comprás una vez',
    ],
  },
  testimonials: [
    {
      quote:    'Me ahorré como 10 horas de investigación. Tenía todo claro antes de comprar el vuelo.',
      author:   'Flor M.',
      location: 'Córdoba, Argentina',
    },
    {
      quote:    'Con el sistema de vuelos de la guía encontré pasajes a Europa por la mitad de lo que esperaba pagar.',
      author:   'Lucas P.',
      location: 'Buenos Aires, Argentina',
    },
    {
      quote:    'Nada de teoría vacía. Todo tiene número, fecha, captura. La leí en una noche y ya tenía el plan armado.',
      author:   'Valentina R.',
      location: 'Medellín, Colombia',
    },
  ],
  guarantee:
    'Si la leés y sentís que no valió €9, te devuelvo el dinero. Sin formularios, sin preguntas.',
  cta:            'Descargar la guía — €9',
  ctaSubtext:     'Pago seguro con Hotmart. Descarga inmediata al email.',
  pricePermanent: 'Pagás una vez. Lo tenés para siempre.',
  socialProof:    '★ Lectores de Argentina, México y Colombia ya la aplican.',
};

// ─── Versión B — Hook precio (el precio más barato del viaje) ─────────────────

export const GUIA_PAGA_COPY_B: GuiaPagaCopy = {
  sectionLabel: 'La guía completa',
  headline:     '€9. Lo más barato que vas a gastar en todo el viaje.',
  subheadline:
    'Tardé 9 años en aprender esto. ' +
    'Lo comprimí en una guía para que vos no tengas que aprenderlo a los golpes.',
  price:        '€9',
  priceContext: 'Menos de lo que cuesta el primer café del aeropuerto.',
  includes: [
    {
      icon:  '✈',
      title: 'Vuelos baratos: el sistema real',
      desc:  'No "buscá en Skyscanner". El método exacto: cuándo, cómo y desde dónde buscar para pagar menos.',
    },
    {
      icon:  '🏨',
      title: 'Dónde dormir sin arruinar el presupuesto',
      desc:  'Hostels que no son una pesadilla, Airbnbs que salen menos que un hotel, y opciones gratuitas que sí existen.',
    },
    {
      icon:  '💸',
      title: 'Plata: cómo llevarla y cómo no perderla',
      desc:  'El error que le costó caro a todos: las comisiones bancarias. Cómo mover dinero en el exterior sin regalarlo.',
    },
    {
      icon:  '📋',
      title: 'La checklist que armé a los golpes',
      desc:  'Todo lo que olvidé, todo lo que pagué de más, todo lo que descubrí tarde. En una lista que podés imprimir.',
    },
    {
      icon:  '🛡',
      title: 'Seguros: cuál contratar y por qué importa',
      desc:  'Una sola emergencia médica sin seguro puede costar miles. Cuál elegir, cuánto pagar y qué preguntar antes.',
    },
    {
      icon:  '📱',
      title: 'Las apps que uso todos los días',
      desc:  'Sin teoría: capturas de pantalla, configuraciones y por qué cada una.',
    },
  ],
  vsGratuita: {
    free: [
      'Introducción a los conceptos de viaje económico',
      'Lista básica de qué revisar',
      'Los errores más comunes',
    ],
    paid: [
      'El sistema completo, paso a paso',
      'Números y presupuestos reales de viajes míos',
      'Estrategias de vuelos con ejemplos concretos',
      'Guía de herramientas con configuraciones',
      'Acceso a futuras actualizaciones',
    ],
  },
  testimonials: [
    {
      quote:    'Me ahorré como 10 horas de investigación. Tenía todo claro antes de comprar el vuelo.',
      author:   'Flor M.',
      location: 'Córdoba, Argentina',
    },
    {
      quote:    'Con el sistema de vuelos de la guía encontré pasajes a Europa por la mitad de lo que esperaba pagar.',
      author:   'Lucas P.',
      location: 'Buenos Aires, Argentina',
    },
    {
      quote:    'Nada de teoría vacía. Todo tiene número, fecha, captura. La leí en una noche y ya tenía el plan armado.',
      author:   'Valentina R.',
      location: 'Medellín, Colombia',
    },
  ],
  guarantee:
    '30 días de garantía. Si no te sirve, te devuelvo los €9. Sin vueltas.',
  cta:            'Descargar la guía — €9',
  ctaSubtext:     'Pago seguro con Hotmart. Descarga inmediata al email.',
  pricePermanent: 'Pagás una vez. Lo tenés para siempre.',
  socialProof:    '★ Lectores de Argentina, México y Colombia ya la aplican.',
};
