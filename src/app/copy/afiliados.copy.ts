// ─── Sección: Herramientas recomendadas (afiliados) ──────────────────────────

export interface AfiliadoCard {
  id:          string;
  logo:        string;   // emoji o inicial hasta tener asset
  name:        string;
  tagline:     string;
  body:        string;
  disclaimer:  string;
  cta:         string;
  ctaUrl:      string;   // reemplazar con link de afiliado real
  badge?:      string;
}

export interface AfiliadosCopy {
  sectionLabel: string;
  headlineA:    string;
  headlineB:    string;
  intro:        string;
  cards:        AfiliadoCard[];
  footerNote:   string;
}

// ─── Versión A — Tono personal, recomendación de amigo ───────────────────────

export const AFILIADOS_COPY_A: AfiliadosCopy = {
  sectionLabel: 'Herramientas que uso yo',
  headlineA:    'Tres cosas sin las que no salgo de casa.',
  headlineB:    'No son sponsors. Son las apps que tengo abiertas.',
  intro:
    'Años viajando me enseñaron a no tocar nada hasta probarlo. ' +
    'Estas tres las uso hace tiempo, las recomiendo a cualquiera que me pregunta, ' +
    'y sí — tengo un link de afiliado. Pero las usaría igual.',
  cards: [
    {
      id:         'heymondo',
      logo:       '🛡',
      name:       'Heymondo',
      tagline:    'El seguro que sí responde.',
      body:
        'Cuando me pasó algo en Tailandia no quería leer cláusulas: quería que alguien me ayude. ' +
        'Heymondo tiene chat 24/7 en la app, cobertura real y sin letra chica disfrazada. ' +
        'Es el que le recomiendo a cualquiera que viaja por primera vez.',
      disclaimer: 'Cobertura desde €35 por viaje.',
      cta:        'Conseguir descuento',
      ctaUrl:     'https://heymondo.com/es?utm_medium=Afiliado&utm_source=EXPLORIANDO&utm_campaign=PRINCIPAL&cod_descuento=EXPLORIANDO&ag_campaign=EXPLORINADO&agencia=RXGocXNhwlEf9dfvWARvzOR3PxgEf1EDpXKFUVJa&redirect=TEMPORAL',
      badge:      'El que yo uso',
    },
    // SafetyWing oculto (auditoría 2026-05-18): sin link de afiliado real.
    // Reactivar este card cuando haya afiliación confirmada.
    {
      id:         'revolut',
      logo:       '💳',
      name:       'Revolut',
      tagline:    'Sacá plata en el exterior sin regalar el 30%.',
      body:
        'Cada vez que usás un banco latinoamericano en el exterior perdés plata en comisiones. ' +
        'Revolut te da el tipo de cambio real, sin recargo. ' +
        'En mi primer año de uso me ahorré cientos de euros. La cuenta es gratis.',
      disclaimer: 'Cuenta gratuita. Sin costos de apertura.',
      cta:        'Abrir cuenta gratis',
      ctaUrl:     'https://revolut.com/referral/?referral-code=oriledesma!MAY2-26-AR-H2-RNDM&geo-redirect',
      badge:      'Gratis',
    },
  ],
  footerNote:
    'Algunos links son de afiliado. Solo recomiendo lo que uso yo. ' +
    'Si comprás, ganás vos (descuento) y yo (comisión).',
};

// ─── Versión B — Tono más directo, orientado al ahorro ───────────────────────

export const AFILIADOS_COPY_B: AfiliadosCopy = {
  sectionLabel: 'Kit del viajero inteligente',
  headlineA:    'Lo que te ahorra tiempo, dinero y dolores de cabeza.',
  headlineB:    'Probado. No curado de internet.',
  intro:
    'No hay viaje sin seguro, no hay seguro sin comparar, y no hay banco latinoamericano ' +
    'que no te cobre de más afuera. Estas son las soluciones que encontré después de años buscando.',
  cards: [
    {
      id:         'heymondo',
      logo:       '🛡',
      name:       'Heymondo',
      tagline:    'Seguro de viaje con soporte humano real.',
      body:
        'La mayoría de los seguros de viaje funcionan bien hasta que los necesitás. ' +
        'Heymondo tiene app con chat en vivo para emergencias. ' +
        'Lo usé, funcionó. Es el primero que contrato antes de cada viaje.',
      disclaimer: 'Cobertura desde €35 por viaje.',
      cta:        'Ver coberturas',
      ctaUrl:     'https://heymondo.com/es?utm_medium=Afiliado&utm_source=EXPLORIANDO&utm_campaign=PRINCIPAL&cod_descuento=EXPLORIANDO&ag_campaign=EXPLORINADO&agencia=RXGocXNhwlEf9dfvWARvzOR3PxgEf1EDpXKFUVJa&redirect=TEMPORAL',
      badge:      'Recomendado',
    },
    // SafetyWing oculto (auditoría 2026-05-18): sin link de afiliado real.
    {
      id:         'revolut',
      logo:       '💳',
      name:       'Revolut',
      tagline:    'El banco que no te cobra por existir afuera.',
      body:
        'Tipo de cambio real. Sin comisiones ocultas. Sin llamar al banco antes de viajar. ' +
        'Abrís la cuenta en 5 minutos desde el teléfono y la usás en cualquier parte del mundo.',
      disclaimer: 'Plan gratuito disponible.',
      cta:        'Abrir mi cuenta',
      ctaUrl:     'https://revolut.com/referral/?referral-code=oriledesma!MAY2-26-AR-H2-RNDM&geo-redirect',
      badge:      'Gratis',
    },
  ],
  footerNote:
    'Algunos links son de afiliado. Solo recomiendo lo que uso yo. ' +
    'Si comprás, ganás vos (descuento) y yo (comisión).',
};
