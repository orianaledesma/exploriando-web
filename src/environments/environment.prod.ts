export const environment = {
  production: true,
  emailjs: {
    serviceId:              '',  // injected via Netlify env vars at build time
    notificationTemplateId: '',  // injected via Netlify env vars at build time
    confirmationTemplate: {       // injected via Netlify env vars at build time
      es: '',
      en: '',
    },
    publicKey:              '',  // injected via Netlify env vars at build time
  },
};
