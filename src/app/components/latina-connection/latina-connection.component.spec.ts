import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  LatinaConnectionComponent,
  LATINA_CONNECTION_URL,
} from './latina-connection.component';
import { AnalyticsService } from '../../services/analytics.service';
import { LanguageService } from '../../services/language.service';
import { TRANSLATIONS } from '../../translations/translations';
import type { Lang } from '../../models/language.model';

describe('LatinaConnectionComponent', () => {
  let fixture: ComponentFixture<LatinaConnectionComponent>;
  let compiled: HTMLElement;

  const build = (): void => {
    fixture = TestBed.createComponent(LatinaConnectionComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatinaConnectionComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    build();
  });

  it('expone el ancla que usa la entrada del menú', () => {
    expect(compiled.querySelector('#latina-connection')).toBeTruthy();
  });

  it('el CTA sale a latinaconnection.info de forma segura', () => {
    const cta = compiled.querySelector<HTMLAnchorElement>('.lc-band__cta');
    expect(cta?.getAttribute('href')).toBe(LATINA_CONNECTION_URL);
    expect(cta?.target).toBe('_blank');
    // Sin noopener, la página destino puede manipular la nuestra vía window.opener.
    expect(cta?.rel).toContain('noopener');
  });

  it('registra la salida hacia la otra marca, con el idioma', () => {
    // Explícito: el idioma por defecto se deriva de navigator.language, que en
    // jsdom es en-US — no se puede asumir 'es'.
    TestBed.inject(LanguageService).set('pt');
    fixture.detectChanges();

    const track = vi.spyOn(TestBed.inject(AnalyticsService), 'track');
    compiled.querySelector<HTMLAnchorElement>('.lc-band__cta')!.click();

    expect(track).toHaveBeenCalledWith('latina_connection_click', { lang: 'pt' });
  });

  it('el mark es decorativo: el texto ya nombra la marca', () => {
    expect(compiled.querySelector('.lc-band__mark img')?.getAttribute('alt')).toBe('');
  });

  it('renderiza en los tres idiomas y siempre aclara el formato', () => {
    for (const lang of ['es', 'en', 'pt'] as Lang[]) {
      TestBed.inject(LanguageService).set(lang);
      fixture.detectChanges();

      const copy = TRANSLATIONS[lang].latinaConnection;
      expect(compiled.textContent).toContain(copy.headline);
      expect(compiled.textContent).toContain(copy.cta);
      // El curso se dicta en inglés: la nota no puede faltar en ningún idioma.
      expect(copy.note.trim().length).toBeGreaterThan(0);
      expect(compiled.textContent).toContain(copy.note);
    }
  });
});
