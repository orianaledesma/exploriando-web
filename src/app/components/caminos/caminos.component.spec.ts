import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  CaminosComponent,
  LATINA_CONNECTION_URL,
  type CaminoId,
} from './caminos.component';
import { AnalyticsService } from '../../services/analytics.service';
import { LanguageService } from '../../services/language.service';
import { TRANSLATIONS } from '../../translations/translations';
import type { Lang } from '../../models/language.model';

describe('CaminosComponent', () => {
  let fixture: ComponentFixture<CaminosComponent>;
  let compiled: HTMLElement;
  let lang: LanguageService;

  const cards = (): HTMLElement[] =>
    Array.from(compiled.querySelectorAll('.caminos__card'));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaminosComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CaminosComponent);
    lang = TestBed.inject(LanguageService);
    lang.set('es');
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('expone el ancla y las cuatro tarjetas', () => {
    expect(compiled.querySelector('#por-donde-empezar')).toBeTruthy();
    expect(cards()).toHaveLength(4);
  });

  it('cada tarjeta lleva a su destino', () => {
    const hrefs = cards().map((c) => c.querySelector('a')?.getAttribute('href'));
    expect(hrefs).toEqual([
      '/mapa',
      '/viajero-creador',
      LATINA_CONNECTION_URL,
      '/marcas',
    ]);
  });

  it('solo el camino externo abre fuera del sitio, y con noopener', () => {
    const anchors = cards().map((c) => c.querySelector('a')!);
    const externos = anchors.filter((a) => a.getAttribute('target') === '_blank');

    expect(externos).toHaveLength(1);
    expect(externos[0].getAttribute('href')).toBe(LATINA_CONNECTION_URL);
    // Sin noopener la página destino puede manipular la nuestra vía window.opener.
    expect(externos[0].rel).toContain('noopener');
  });

  it('marca visualmente el camino que sale a otra marca', () => {
    const marcadas = cards().filter((c) =>
      c.classList.contains('caminos__card--foreign'),
    );
    expect(marcadas).toHaveLength(1);
    expect(marcadas[0].querySelector('a')?.getAttribute('href')).toBe(
      LATINA_CONNECTION_URL,
    );
  });

  it('trackea qué intención eligió el visitante', () => {
    const track = vi.spyOn(TestBed.inject(AnalyticsService), 'track');
    cards()[1].querySelector('a')!.click();
    expect(track).toHaveBeenCalledWith('camino_click', { camino: 'crear' });
  });

  it('traduce las cuatro tarjetas en los tres idiomas', () => {
    const ids: CaminoId[] = ['viajar', 'crear', 'espanol', 'marca'];

    for (const l of ['es', 'en', 'pt'] as Lang[]) {
      lang.set(l);
      fixture.detectChanges();

      const copy = TRANSLATIONS[l].caminos;
      expect(compiled.textContent).toContain(copy.headline);
      for (const id of ids) {
        expect(compiled.textContent, `${l}/${id}`).toContain(copy[id].title);
      }
    }
  });

  it('avisa en ES y PT que el curso de español es en inglés', () => {
    // La tarjeta está escrita en inglés a propósito, pero quien navega en
    // español o portugués necesita la aclaración explícita antes del clic.
    for (const l of ['es', 'pt'] as Lang[]) {
      lang.set(l);
      fixture.detectChanges();

      const note = TRANSLATIONS[l].caminos.espanol.note;
      expect(note.trim().length, l).toBeGreaterThan(0);
      expect(compiled.textContent).toContain(note);
    }
  });
});
