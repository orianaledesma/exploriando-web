export interface EmailCaptureData {
  email: string;
  source: 'hero' | 'recursos' | 'footer' | 'viajero-creador' | 'guia';
}

export type EmailCaptureStatus = 'idle' | 'loading' | 'success' | 'error' | 'rateLimit' | 'duplicate';
