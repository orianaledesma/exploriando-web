import type { Handler, HandlerEvent } from '@netlify/functions';
import Anthropic from '@anthropic-ai/sdk';

interface RequestBody {
  nationality: string;
  origin:      string;
  destination: string;
}

interface DocumentacionResult {
  documents:  string[];
  migration:  string[];
  disclaimer: string;
  sources:    string[];
}

const client = new Anthropic({ apiKey: process.env['ANTHROPIC_API_KEY'] });

const buildPrompt = (body: RequestBody): string => `
Eres un asistente de información de viajes para latinoamericanos.
El usuario es de nacionalidad ${body.nationality}, viaja desde ${body.origin} hacia ${body.destination}.

Respondé ÚNICAMENTE con un JSON válido con esta estructura exacta, sin texto adicional:
{
  "documents": ["lista de documentos necesarios para viajar"],
  "migration": ["requisitos de migración al llegar al destino"],
  "disclaimer": "Verificá esta información con la embajada o consulado oficial antes de viajar.",
  "sources": ["fuentes oficiales recomendadas para verificar"]
}

Reglas:
- Si no tenés información suficiente o confiable para esa combinación, devolvé documents y migration como arrays vacíos y explicalo en el disclaimer.
- Nunca inventes requisitos. La precisión es más importante que la completitud.
- Los textos deben estar en español latinoamericano neutro.
- Cada item de la lista debe ser una oración corta y clara.
- Máximo 8 items por lista.
`;

const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  if (!event.body) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Body requerido' }) };
  }

  let body: RequestBody;
  try {
    body = JSON.parse(event.body) as RequestBody;
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'JSON inválido' }) };
  }

  if (!body.nationality || !body.origin || !body.destination) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Faltan campos requeridos' }) };
  }

  try {
    const message = await client.messages.create({
      model:      'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [{ role: 'user', content: buildPrompt(body) }],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Respuesta inesperada de Claude');
    }

    const result = JSON.parse(content.text) as DocumentacionResult;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    return {
      statusCode: 500,
      body: JSON.stringify({ error: message }),
    };
  }
};

export { handler };
