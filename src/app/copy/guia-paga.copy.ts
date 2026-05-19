// ─── Sección / Página: Guía completa (gratis con email) ──────────────────────

export type GuiaBlock =
  | { type: 'p';       text: string }
  | { type: 'h3';      text: string }
  | { type: 'ul';      items: string[] }
  | { type: 'callout'; title: string; text: string };

export interface GuiaInclude {
  icon:  string;
  title: string;
  desc:  string;
  body?: GuiaBlock[];   // Contenido detallado del capítulo (solo se renderiza en /guia)
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
  includes:       GuiaInclude[];
  vsGratuita:     { freeLabel: string; paidLabel: string; vsTitle: string; free: string[]; paid: string[]; };
  testimonials:   GuiaTestimonial[];
  cta:            string;
  ctaSubtext:     string;
  socialProof:    string;
}

// ─── Versión A — La guía completa, gratis con email ──────────────────────────

export const GUIA_PAGA_COPY_A: GuiaPagaCopy = {
  sectionLabel: 'La guía completa',
  headline:     'No es una lista de tips. Es el sistema completo.',
  subheadline:
    'Diez años viajando full time, condensados en una guía que podés leer en una noche. ' +
    'Los números, las fechas, las apps reales — sin teoría vacía.',
  includes: [
    {
      icon:  '✈',
      title: 'Sistema de vuelos baratos',
      desc:  'Cuándo buscar, cuándo comprar, qué días son más baratos y por qué. Con ejemplos de rutas reales desde Latinoamérica.',
      body: [
        { type: 'p',  text: 'Lo primero que hay que entender es que el precio de un vuelo no es fijo: cambia varias veces por día según la demanda. Si entendés cómo funciona el sistema, dejás de comprar al primer precio que ves.' },
        { type: 'h3', text: 'Cuándo empezar a buscar' },
        { type: 'p',  text: 'La regla que uso después de 10 años: empezá a mirar precios 3-4 meses antes para vuelos largos (LATAM ↔ Europa o Asia) y 6-8 semanas antes para vuelos cortos dentro de Europa. Comprar con menos de 3 semanas de anticipación casi siempre sale más caro.' },
        { type: 'h3', text: 'Plataformas: cuál usar para qué' },
        { type: 'ul', items: [
          'Google Flights — la mejor para explorar fechas flexibles y ver el calendario completo de precios.',
          'Skyscanner — rastreo de alertas + opción "todos los meses" para encontrar la fecha más barata del año.',
          'Kayak — útil para combinar aerolíneas que otros no muestran.',
          'La web de la aerolínea — para comprar. Las plataformas comparan precios; comprar directo evita comisiones de intermediarios.',
        ]},
        { type: 'callout', title: 'El mito del modo incógnito', text: 'No baja precios. Lo que sí ayuda: limpiar cookies si volvés a buscar la misma ruta varios días, porque algunas aerolíneas suben el precio si detectan que te interesa.' },
        { type: 'h3', text: 'Días y rutas que casi siempre salen menos' },
        { type: 'ul', items: [
          'Salir martes o miércoles, volver martes. Los fines de semana cuestan 20-40% más.',
          'Vuelos con 1 escala vs directos: la escala suele ser 30-50% más barata si tenés tiempo.',
          'Aeropuertos secundarios en Europa (Bruselas Charleroi, Milán Bergamo, París Beauvais) — low-cost despega ahí y son mucho más baratos.',
        ]},
      ],
    },
    {
      icon:  '🏨',
      title: 'Alojamiento sin pagar de más',
      desc:  'Hostels, Airbnbs, intercambios de casas, couchsurfing: cuándo usar cada uno y cómo encontrar los buenos.',
      body: [
        { type: 'p',  text: 'No hay una opción "mejor" — hay una opción mejor para cada momento del viaje. La clave es saber cuándo elegir cada una.' },
        { type: 'h3', text: 'Hostels — cuándo y cómo' },
        { type: 'p',  text: 'Para viajes solo o de presupuesto ajustado, sigue siendo lo más barato y la mejor forma de conocer gente. Mirá siempre el rating en limpieza (no el general). Por debajo de 8.5 en limpieza, pasá al siguiente.' },
        { type: 'h3', text: 'Airbnb — el truco para encontrar buenos precios' },
        { type: 'ul', items: [
          'Filtrá por estancias de 7+ días. Casi todos los hosts tienen descuento semanal del 10-25% que no aparece si buscás 3 noches.',
          'Buscá en barrios un poco fuera del centro. 15 minutos en transporte público pueden ser la mitad del precio.',
          'Mensajes directos antes de reservar — preguntá cualquier cosa. Los hosts que responden rápido son los que cuidan el lugar.',
        ]},
        { type: 'h3', text: 'Couchsurfing e intercambio de casas' },
        { type: 'p',  text: 'Couchsurfing está vivo en Europa del Este, Asia y partes de Latinoamérica. Intercambio de casas (HomeExchange, Trusted Housesitters) requiere construir reputación pero es la opción más barata para viajes largos: dormís gratis a cambio de cuidar casa o mascotas.' },
        { type: 'callout', title: 'Mi regla', text: 'Si voy menos de 4 días a una ciudad: hostel. Entre 4-10 días: Airbnb con descuento semanal. Más de 2 semanas: house-sitting o alquiler de mes.' },
      ],
    },
    {
      icon:  '💸',
      title: 'Presupuestos reales por destino',
      desc:  'No estimaciones. Números de lo que gasté en Europa, Asia y América, semana a semana.',
      body: [
        { type: 'p',  text: 'Estos son los rangos reales que manejo. Asume hostel/Airbnb compartido, comer en mercados o cocinar 2 de 3 comidas, y transporte público.' },
        { type: 'h3', text: 'Por región (USD por día, sin contar vuelos)' },
        { type: 'ul', items: [
          'Europa Occidental (Francia, España, Italia, Alemania): 65-95 USD/día.',
          'Europa del Este (Polonia, Lituania, Hungría, Rumania): 30-50 USD/día.',
          'Sudeste Asiático (Tailandia, Vietnam, Indonesia): 25-45 USD/día.',
          'Latinoamérica (Argentina, México, Colombia, Perú): 20-45 USD/día.',
          'Marruecos / Egipto: 30-50 USD/día.',
        ]},
        { type: 'h3', text: 'Cómo armás tu presupuesto en 5 minutos' },
        { type: 'p',  text: 'Sumá: alojamiento (lo más caro) + comida (15-30 USD/día según región) + transporte (5-15 USD/día) + actividades (variable). Multiplicá por días + 15% de buffer para imprevistos. Ese es tu mínimo realista.' },
        { type: 'callout', title: 'El error más común', text: 'Olvidarse del transporte de aeropuerto al alojamiento. Un Uber al llegar puede ser USD 30-50 en muchas ciudades. Investigá el bus o tren antes de aterrizar.' },
      ],
    },
    {
      icon:  '📋',
      title: 'Checklist de pre-salida',
      desc:  'Lo que revisás 30 días, 7 días y 24 hs antes. Lo que olvidé en mis primeros viajes para que vos no lo olvides.',
      body: [
        { type: 'h3', text: '30 días antes' },
        { type: 'ul', items: [
          'Pasaporte: vigente con al menos 6 meses después de tu vuelta.',
          'Visa o ETIAS si aplica — chequeá los plazos del país de destino.',
          'Vacunas requeridas (algunos destinos piden fiebre amarilla con 10 días de anticipación).',
          'Seguro de viaje contratado.',
          'Permiso de conducir internacional si vas a alquilar auto.',
        ]},
        { type: 'h3', text: '7 días antes' },
        { type: 'ul', items: [
          'Avisá a tu banco que vas a usar la tarjeta afuera (algunos siguen bloqueándolas si no).',
          'Sacá foto de pasaporte, visa, seguro y mandátelos a tu propio email.',
          'Subí copias a Google Drive o Dropbox.',
          'Confirmá vuelos y alojamiento del primer día.',
          'Cargá efectivo en moneda local del primer destino — no esperes al cajero del aeropuerto.',
        ]},
        { type: 'h3', text: '24 horas antes' },
        { type: 'ul', items: [
          'Online check-in. Te ahorra cola y a veces mejor asiento.',
          'Equipaje pesado: revisá los límites exactos de tu aerolínea, no el genérico.',
          'En el bolso de mano: medicamentos, cargador, pasaporte, una muda de ropa por si pierden la maleta.',
          'Captura de pantalla del boarding pass por si te quedás sin internet.',
        ]},
        { type: 'callout', title: 'Lo que se olvida todo el mundo', text: 'Adaptador de enchufe del país al que vas. Lo comprás en el aeropuerto al doble del precio.' },
      ],
    },
    {
      icon:  '🛡',
      title: 'Seguros e imprevistos',
      desc:  'Qué seguro contratar según el viaje, qué cubre realmente y cómo presentar un reclamo si algo sale mal.',
      body: [
        { type: 'p',  text: 'No es paranoia: una emergencia médica sin seguro en EEUU o Europa puede costar miles de dólares. Conozco gente que terminó con deudas de 10k USD por un día en hospital.' },
        { type: 'h3', text: 'Qué tiene que cubrir mínimo' },
        { type: 'ul', items: [
          'Asistencia médica con un mínimo de 60.000 USD (Europa exige 30.000 € para Schengen pero apuntá más alto).',
          'Repatriación sanitaria — esta es la más importante en emergencias serias.',
          'Cobertura de equipaje y vuelos cancelados.',
          'Asistencia 24/7 en español. Si te pasa algo, no querés estar leyendo cláusulas en otro idioma.',
        ]},
        { type: 'h3', text: 'Cómo elegir según el tipo de viaje' },
        { type: 'ul', items: [
          'Viaje corto (menos de 30 días): Heymondo. Ahí abajo te dejo el link con descuento.',
          'Viaje largo (1-12 meses): SafetyWing — se renueva mes a mes y se cancela cuando querés.',
          'Mochilero o aventura (montaña, surf, moto): asegurate de que el plan cubra deportes de aventura — la mayoría no lo hace por default.',
        ]},
        { type: 'callout', title: 'Si tenés que usarlo', text: 'Antes de pagar nada, llamá al número de asistencia. Si pagás de tu bolsillo y después reclamás, te van a pedir 50 papeles. Si llamás primero, ellos coordinan todo y vos sólo firmás.' },
      ],
    },
    {
      icon:  '📱',
      title: 'Stack de apps del viajero',
      desc:  'Las 12 aplicaciones que tengo instaladas siempre. Con las configuraciones que nadie cuenta en YouTube.',
      body: [
        { type: 'p',  text: 'Lo importante no es tener apps; es tenerlas configuradas antes de salir. Una vez que estás en otro país sin internet, descargar y configurar es una pesadilla.' },
        { type: 'h3', text: 'Mapas y navegación' },
        { type: 'ul', items: [
          'Google Maps — descargá los mapas offline de cada ciudad antes de salir. Funciona sin datos.',
          'Maps.me — backup. A veces tiene caminos que Google no.',
          'Citymapper — la mejor para transporte público en ciudades grandes (Londres, París, NY, Madrid).',
        ]},
        { type: 'h3', text: 'Plata y pagos' },
        { type: 'ul', items: [
          'Revolut — cuenta multi-moneda con tipo de cambio real. Cero comisión hasta cierto monto mensual.',
          'Wise — alternativa sólida si Revolut no opera en tu país.',
          'XE Currency — conversor que funciona offline si cargaste las monedas que vas a usar.',
        ]},
        { type: 'h3', text: 'Idioma' },
        { type: 'ul', items: [
          'Google Translate — descargá los idiomas offline. La cámara para leer carteles es lo más útil.',
          'DeepL — traducciones más naturales para textos largos.',
        ]},
        { type: 'h3', text: 'Reservas y descubrimiento' },
        { type: 'ul', items: [
          'Booking — el más usado, pero compará con Hostelworld para hostels.',
          'GetYourGuide — actividades y tours, fácil de cancelar.',
          'Couchsurfing — para hangouts con locales aunque no te quedes a dormir.',
        ]},
        { type: 'callout', title: 'Configuración crítica antes de salir', text: 'Activá WhatsApp con número internacional, instalá una eSIM (Airalo o Holafly) en lugar de buscar SIM física al llegar, y guardá tus contactos de emergencia en favoritos accesibles sin desbloquear.' },
      ],
    },
  ],
  vsGratuita: {
    vsTitle:   'Por qué esta guía es distinta a la mayoría',
    freeLabel: 'Guías genéricas online',
    paidLabel: 'Esta guía',
    free: [
      'Tips genéricos sin contexto latinoamericano',
      'Checklists copiadas sin ejemplos reales',
      'Información desactualizada o de hace 5 años',
    ],
    paid: [
      'Sistema paso a paso para armar tu primer viaje, con ejemplos reales',
      'Stack de apps con las configuraciones que casi nadie te cuenta',
      'Errores típicos del viajero primerizo latino y cómo evitarlos',
      'Escrita por alguien que viajó a 40+ países, no copiada de internet',
      'Acceso a la versión actualizada de la guía',
    ],
  },
  testimonials: [
    {
      quote:    'La leí en una noche y al día siguiente ya tenía el viaje armado. No es teoría: es lo que tendrías que haber sabido antes de tu primer vuelo.',
      author:   'Camila D.',
      location: 'Santiago, Chile',
    },
    {
      quote:    'Tenía mil pestañas abiertas planeando Europa y no avanzaba. La guía me ordenó la cabeza y dejé de sentir que iba a olvidarme de algo importante.',
      author:   'Rodrigo M.',
      location: 'Rosario, Argentina',
    },
    {
      quote:    'Lo que más me sirvió fue el capítulo de seguros y el de plata. Eran las dos cosas que más me trababan y las explica de forma clara, sin tecnicismos.',
      author:   'Paola V.',
      location: 'Ciudad de México, México',
    },
  ],
  cta:            'Leer la guía completa',
  ctaSubtext:     'Gratis. Solo necesitamos tu email para mandártela.',
  socialProof:    '★ Lectores de Argentina, México y Colombia ya la aplican.',
};
