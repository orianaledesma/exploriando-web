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
        '3 reels/TikToks listos para publicar',
        '3 aperturas por video para frenar el scroll',
        'Entrega en 7 días · uso ilimitado en tus redes',
      ],
    },
    {
      name: 'Pack Completo',
      price: '€400',
      includes: [
        'Campaña de 5 videos pensada para UN objetivo (lanzamiento, venta o awareness)',
        'Guión y estrategia: yo defino el ángulo, vos publicás',
        '1 ronda de ajustes · entrega en 14 días',
      ],
    },
    {
      name: 'VIP Mensual',
      price: '€700/mes',
      includes: [
        '8 videos al mes + estrategia de contenido continua',
        'Calendario de publicación + reporte mensual',
        'Hasta 2 rondas/mes · canal directo acordado',
      ],
    },
  ],

  cta: 'Hablemos de tu marca',
  ctaSubtext: 'Respondemos en menos de 48hs.',

} as const;
