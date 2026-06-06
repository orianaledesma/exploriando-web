export const environment = {
  production: false,
  emailjs: {
    serviceId:              'service_qxt6hzt',
    notificationTemplateId: 'template_8j6e714',  // template_XXXXXXX — aviso a Oriana
    // Bienvenida + guía gratis al suscriptor, una plantilla por idioma.
    // pt cae en la plantilla ES (mismo público LATAM). TODO: reemplazar el id EN
    // por el template inglés real cuando esté creado en EmailJS.
    confirmationTemplate: {
      es: 'template_bhepn8b',
      en: 'template_bhepn8b',
    },
    publicKey:              'qKKiCPdAJG3NB9vW0',
  },
};
