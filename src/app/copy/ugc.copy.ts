export type PortfolioCardStatus = 'available' | 'coming-soon';

export interface PortfolioCard {
  brand:    string;
  type:     string;
  desc:     string;
  status:   PortfolioCardStatus;
  badge:    string;
}

const MONTH_NAMES_ES = [
  'enero','febrero','marzo','abril','mayo','junio',
  'julio','agosto','septiembre','octubre','noviembre','diciembre',
];

export function getPortfolio(): PortfolioCard[] {
  const now = new Date();
  const d1 = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const d2 = new Date(now.getFullYear(), now.getMonth() + 2, 1);
  const m1 = `${MONTH_NAMES_ES[d1.getMonth()]} ${d1.getFullYear()}`;
  const m2 = `${MONTH_NAMES_ES[d2.getMonth()]} ${d2.getFullYear()}`;

  return [
    {
      brand:  'Hotel boutique en Kaunas',
      type:   'HOSPEDAJE · UGC',
      desc:   `Colaboración con hotel boutique en Kaunas. Video case en ${m1}.`,
      status: 'coming-soon',
      badge:  'Próximamente',
    },
    {
      brand:  'Restaurante mediterráneo',
      type:   'GASTRONOMÍA · UGC',
      desc:   `Serie de reels para restaurante mediterráneo. Lanzamiento en ${m2}.`,
      status: 'coming-soon',
      badge:  'Próximamente',
    },
  ];
}

export const UGC_COPY = {

  sectionLabel: 'Para marcas',

  headline: 'Contenido de viaje que convierte, no solo que se ve lindo.',

  subheadline:
    'Creamos contenido auténtico para marcas de turismo, alojamiento, productos de viaje y productos digitales. ' +
    'Nada de escenas armadas: puro viaje real.',

  portfolioTitle: 'Trabajos recientes',

  packages: [
    {
      name: 'Pack Básico',
      price: '€150',
      includes: [
        '3 videos cortos (reels / TikTok)',
        'Entrega en 7 días',
        'Uso ilimitado en redes',
      ],
    },
    {
      name: 'Pack Completo',
      price: '€400',
      includes: [
        '10 videos cortos + 15 fotos',
        'Guión y estrategia incluidos',
        'Entrega en 14 días',
        'Revisión incluida',
      ],
    },
    {
      name: 'Acompañamiento VIP',
      price: '€700',
      includes: [
        'Contenido mensual continuo',
        'Estrategia de contenido',
        'Reportes de rendimiento',
        'Canal directo de comunicación',
      ],
    },
  ],

  cta: 'Hablemos de tu marca',
  ctaSubtext: 'Respondemos en menos de 48hs.',

} as const;
