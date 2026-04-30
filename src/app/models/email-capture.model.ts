export interface EmailCaptureData {
  email: string;
  source: 'hero' | 'recursos' | 'footer' | 'post-documentacion' | 'viajero-creador' | 'guia';
}

export type EmailCaptureStatus = 'idle' | 'loading' | 'success' | 'error' | 'rateLimit' | 'duplicate';
