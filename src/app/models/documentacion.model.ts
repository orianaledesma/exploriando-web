export interface DocumentacionRequest {
  nationality: string;
  origin:      string;
  destination: string;
}

export interface DocumentacionResult {
  documents:  string[];
  migration:  string[];
  disclaimer: string;
  sources:    string[];
}

export type DocumentacionStatus =
  | 'idle'
  | 'loading'
  | 'success'
  | 'error'
  | 'no-data'
  | 'offline'
  | 'rateLimit';
