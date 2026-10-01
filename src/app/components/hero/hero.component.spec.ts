import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { HeroComponent } from './hero.component';
import { AnalyticsService } from '../../services/analytics.service';
import { LanguageService } from '../../services/language.service';
import { YOUTUBE_LIVE_URL } from '../../data/links';
import { TRANSLATIONS } from '../../translations/translations';
import type { Lang } from '../../models/language.model';

describe('HeroComponent', () => {
  let fixture: ComponentFixture<HeroComponent>;
  let compiled: HTMLElement;
  let lang: LanguageService;

  const el = <T extends HTMLElement>(sel: string): T | null =>
    compiled.querySelector<T>(sel);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    lang = TestBed.inject(LanguageService);
    lang.set('es');
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('ya no captura email: eso vive en el footer y en /guia', () => {
    // El formulario se removió del hero el 2026-10-01. Si alguien lo repone
    // acá, este test avisa que hay dos capturas compitiendo en la misma página.
    expect(el('form')).toBeNull();
    expect(el('input')).toBeNull();
  });

  it('rinde el titular partido, con la segunda mitad destacada', () => {
    const copy = TRANSLATIONS.es.hero;
    const h1 = el('h1')!;

    expect(h1.textContent).toContain(copy.headlineA);
    // La segunda mitad va en <em> para que la itálica y el acento no dependan
    // de un <span> suelto sin semántica.
    expect(h1.querySelector('em')?.textContent?.trim()).toBe(copy.headlineB);
  });

  it('muestra kicker y descripción', () => {
    const copy = TRANSLATIONS.es.hero;
    expect(compiled.textContent).toContain(copy.eyebrow);
    expect(el('.hero__subheadline')?.textContent?.trim()).toBe(copy.subheadline);
  });

  it('el CTA principal sale al vivo de YouTube de forma segura', () => {
    const live = el<HTMLAnchorElement>('[data-testid="hero-live"]')!;
    expect(live.getAttribute('href')).toBe(YOUTUBE_LIVE_URL);
    expect(live.target).toBe('_blank');
    expect(live.rel).toContain('noopener');
    expect(live.textContent?.trim()).toBe(TRANSLATIONS.es.hero.ctaLive);
  });

  it('el CTA secundario lleva al mapa, dentro del sitio', () => {
    const guides = el<HTMLAnchorElement>('[data-testid="hero-guides"]')!;
    expect(guides.getAttribute('href')).toBe('/mapa');
    expect(guides.getAttribute('target')).toBeNull();
  });

  it('distingue de dónde salió el click al vivo', () => {
    const track = vi.spyOn(TestBed.inject(AnalyticsService), 'track');
    el<HTMLAnchorElement>('[data-testid="hero-live"]')!.click();
    // en-vivo dispara el mismo evento con location=section.
    expect(track).toHaveBeenCalledWith('en_vivo_click', { location: 'hero' });
  });

  it('la prueba social dice 42 ciudades, que es lo que hay en los datos', () => {
    for (const l of ['es', 'en', 'pt'] as Lang[]) {
      expect(TRANSLATIONS[l].hero.socialProof, l).toContain('42');
      expect(TRANSLATIONS[l].hero.socialProof, l).not.toContain('54');
    }
  });

  it('traduce el hero completo en los tres idiomas', () => {
    for (const l of ['es', 'en', 'pt'] as Lang[]) {
      lang.set(l);
      fixture.detectChanges();

      const copy = TRANSLATIONS[l].hero;
      for (const txt of [copy.eyebrow, copy.headlineA, copy.headlineB, copy.ctaLive, copy.ctaGuides]) {
        expect(compiled.textContent, `${l}: ${txt}`).toContain(txt);
      }
    }
  });
});
