import { Lang } from './language.model';

export interface EmailCaptureData {
  email: string;
  /**
   * Identifica de dónde vino el alta. Viaja a MailerLite como campo `source`,
   * así que sirve de segmento — 'guias-premium' aísla a la lista de espera.
   */
  source: 'hero' | 'recursos' | 'footer' | 'viajero-creador' | 'guia' | 'guias-premium' | 'curso-creador';
  /** Idioma activo del visitante → decide la plantilla EmailJS (ES/EN) de bienvenida. */
  lang: Lang;
}

export type EmailCaptureStatus = 'idle' | 'loading' | 'success' | 'error' | 'rateLimit' | 'duplicate';
