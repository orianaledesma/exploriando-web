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
];

// Secretos que SOLO usan las Netlify Functions (server-side) y NUNCA deben
// entrar al bundle del browser. No se inyectan en environment.prod.ts.
const FUNCTIONS_ONLY = ['MAILER_API_TOKEN', 'MAILER_GROUP_ID'];

const missing = required
  .filter(k => !FUNCTIONS_ONLY.includes(k))
  .filter(k => !process.env[k]);

if (missing.length) {
  console.warn(`⚠ Variables de entorno faltantes: ${missing.join(', ')}`);
  console.warn('  El build continuará pero EmailJS no funcionará en producción.');
}

const target = path.resolve(__dirname, '../src/environments/environment.prod.ts');

const content = `// Generado automáticamente por scripts/set-env.js — NO editar a mano.
export const environment = {
  production: true,
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
