import { Injectable, signal } from '@angular/core';
import { Lang, SUPPORTED_LANGS } from '../models/language.model';

const STORAGE_KEY = 'exploriando_lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly current = signal<Lang>(this.getInitialLang());

  /** Cambia el idioma activo y lo persiste en localStorage. */
  set(lang: Lang): void {
    this.current.set(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch { /* localStorage no disponible */ }
  }

  private getInitialLang(): Lang {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
    } catch { /* localStorage no disponible */ }
    return 'es';
  }
}
