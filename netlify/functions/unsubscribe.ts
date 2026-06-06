import type { Handler, HandlerEvent } from '@netlify/functions';

/**
 * Baja de un suscriptor en MailerLite (status → unsubscribed). El token vive
 * SOLO acá (server-side). El link se entrega en el footer del email de
 * bienvenida; la página `/baja` pide CONFIRMACIÓN antes de llamar a esta
 * función, así los prefetchers de los clientes de email no dan de baja solos.
 */
interface RequestBody {
  email?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body: RequestBody;
  try {
    body = JSON.parse(event.body ?? '{}') as RequestBody;
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'JSON inválido' }) };
  }

  const email = (body.email ?? '').trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Email inválido' }) };
  }

  const token = process.env['MAILER_API_TOKEN'];
  if (!token) {
    return { statusCode: 500, body: JSON.stringify({ error: 'MailerLite no configurado' }) };
  }

  try {
    // Upsert con status 'unsubscribed' → da de baja al suscriptor existente.
    // Si no existía, lo crea ya dado de baja (inocuo).
    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, status: 'unsubscribed' }),
    });

    if (res.ok) {
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }

    return {
      statusCode: res.status === 422 ? 400 : 502,
      body: JSON.stringify({ error: 'No se pudo dar de baja' }),
    };
  } catch {
    return { statusCode: 502, body: JSON.stringify({ error: 'MailerLite no respondió' }) };
  }
};

export { handler };
