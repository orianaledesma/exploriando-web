// Genera environment.prod.ts desde variables de entorno de Netlify.
// Se ejecuta antes del build: "node scripts/set-env.js && ng build ..."
// Las variables se definen en Netlify → Site Settings → Environment Variables.

const fs   = require('fs');
const path = require('path');

const required = [
  'EMAILJS_SERVICE_ID',
  'EMAILJS_NOTIFICATION_TEMPLATE_ID',
  'EMAILJS_CONFIRMATION_TEMPLATE_ID',
  'EMAILJS_PUBLIC_KEY',
  'ANTHROPIC_API_KEY',
];

const missing = required
  .filter(k => k !== 'ANTHROPIC_API_KEY') // solo la usan las Netlify Functions, no el browser bundle
  .filter(k => !process.env[k]);

if (missing.length) {
  console.warn(`⚠ Variables de entorno faltantes: ${missing.join(', ')}`);
  console.warn('  El build continuará pero EmailJS no funcionará en producción.');
}

const target = path.resolve(__dirname, '../src/environments/environment.prod.ts');

const content = `// Generado automáticamente por scripts/set-env.js — NO editar a mano.
export const environment = {
  production: true,
  documentacionApiUrl: '/api/documentacion',
  emailjs: {
    serviceId:              '${process.env['EMAILJS_SERVICE_ID'] ?? ''}',
    notificationTemplateId: '${process.env['EMAILJS_NOTIFICATION_TEMPLATE_ID'] ?? ''}',
    confirmationTemplateId: '${process.env['EMAILJS_CONFIRMATION_TEMPLATE_ID'] ?? ''}',
    publicKey:              '${process.env['EMAILJS_PUBLIC_KEY'] ?? ''}',
  },
};
`;

fs.writeFileSync(target, content, 'utf8');
console.log('✅ environment.prod.ts generado correctamente');
