import { Lang } from './language.model';

export interface EmailCaptureData {
  email: string;
  source: 'hero' | 'recursos' | 'footer' | 'viajero-creador' | 'guia';
  /** Idioma activo del visitante → decide la plantilla EmailJS (ES/EN) de bienvenida. */
  lang: Lang;
}

export type EmailCaptureStatus = 'idle' | 'loading' | 'success' | 'error' | 'rateLimit' | 'duplicate';
