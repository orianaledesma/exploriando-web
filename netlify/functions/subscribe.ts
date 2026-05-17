import type { Handler, HandlerEvent } from '@netlify/functions';

/**
 * Alta de suscriptor en MailerLite. El token vive SOLO acá (server-side,
 * env de Netlify) — nunca en el bundle del browser. MailerLite maneja el
 * doble opt-in / email de bienvenida si está activado en la cuenta/grupo.
 */
interface RequestBody {
  email?: string;
  /** Honeypot — si viene con valor, es un bot. */
  website?: string;
  source?: string;
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

  // Honeypot lleno → fingimos éxito para no darle señal al bot.
  if (body.website) {
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  }

  const email = (body.email ?? '').trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Email inválido' }) };
  }

  const token = process.env['MAILER_API_TOKEN'];
  const groupId = process.env['MAILER_GROUP_ID'];
  if (!token || !groupId) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'MailerLite no configurado' }),
    };
  }

  try {
    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
        groups: [groupId],
        fields: { source: body.source ?? 'web' },
      }),
    });

    // MailerLite: 200/201 alta ok, 200 también si ya existía.
    if (res.ok) {
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }

    // No filtramos el cuerpo de MailerLite (puede traer detalles internos).
    return {
      statusCode: res.status === 422 ? 400 : 502,
      body: JSON.stringify({ error: 'No se pudo suscribir' }),
    };
  } catch {
    return { statusCode: 502, body: JSON.stringify({ error: 'MailerLite no respondió' }) };
  }
};

export { handler };
