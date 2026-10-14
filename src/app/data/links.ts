/**
 * URLs salientes que usa más de un componente.
 *
 * El link al vivo estaba duplicado en en-vivo y hacía falta también en el
 * hero: dos copias del mismo string es cómo una queda vieja cuando el canal
 * cambia de handle.
 */

/** Pestaña "en vivo" del canal. Si no hay transmisión, YouTube cae al canal. */
export const YOUTUBE_LIVE_URL = 'https://www.youtube.com/@Exploriando/live';

/** Home del canal. */
export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@Exploriando';

/**
 * Apoyo al proyecto (/apoyo). Las dos cuentas usan el usuario `exploriando`.
 * PayPal es el botón de cada tarjeta (sirve desde cualquier país); Cafecito
 * cobra con Mercado Pago en pesos, así que va aparte como opción para
 * Argentina.
 */
export const PAYPAL_URL = 'https://paypal.me/exploriando';
export const CAFECITO_URL = 'https://cafecito.app/exploriando';
