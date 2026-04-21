export const DOCUMENTACION_COPY = {

  sectionLabel: 'Documentación de viaje',

  headline: 'Sabé exactamente qué necesitás antes de hacer las valijas.',

  subheadline:
    'Burocracia, visas, formularios de migración: lo más aburrido del viaje, ' +
    'resuelto en segundos. Contanos de dónde sos, a dónde vas, y te decimos todo.',

  form: {
    title: '¿Qué necesito para viajar?',
    nationalityLabel: 'Tu nacionalidad',
    nationalityPlaceholder: 'Ej: Argentina',
    originLabel: 'País de origen del viaje',
    originPlaceholder: 'Ej: México',
    destinationLabel: 'Destino',
    destinationPlaceholder: 'Ej: Portugal',
    submitBtn: 'Ver qué necesito',
    submitBtnLoading: 'Consultando requisitos...',
  },

  result: {
    documentsTitle: 'Documentos para viajar',
    migrationTitle: 'Qué te van a pedir al llegar',
    disclaimer:
      '⚠ Esta información es orientativa. Siempre verificá con la embajada o ' +
      'consulado correspondiente antes de viajar, ya que los requisitos pueden ' +
      'cambiar sin previo aviso.',
    disclaimerLinkText: 'Fuentes oficiales de cancillería',
  },

  postResultCta: {
    text: '¿Querés más recursos como este?',
    subtext: 'En la comunidad tenemos guías de más de 30 destinos, ' +
             'consejos de viajeros y actualizaciones de requisitos.',
    cta: 'Unirme gratis',
  },

  errors: {
    apiError:
      'No pudimos consultar los requisitos en este momento. ' +
      'Intentá de nuevo o escribinos a la comunidad y te ayudamos.',
    noData:
      'No tenemos información suficiente sobre esta combinación todavía. ' +
      'Unite a la comunidad y te respondemos directamente.',
    offline:
      'Parece que no tenés conexión. Revisá tu internet e intentá de nuevo.',
    rateLimit:
      'Hiciste varias consultas seguidas. Esperá unos minutos e intentá de nuevo.',
    retry: 'Intentar de nuevo',
  },

} as const;
