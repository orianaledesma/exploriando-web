import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AsesoriasComponent } from './asesorias.component';
import { LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';
import { TRANSLATIONS } from '../../translations/translations';

const COPY = TRANSLATIONS.es.viajeroCreador.sessions;

describe('AsesoriasComponent', () => {
  let fixture: ComponentFixture<AsesoriasComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AsesoriasComponent] }).compileComponents();
    TestBed.inject(LanguageService).set('es');
    fixture = TestBed.createComponent(AsesoriasComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('crea el componente', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renderiza el título y la lista de temas', () => {
    expect(compiled.querySelector('h2')?.textContent?.trim()).toBe(COPY.title);
    expect(compiled.querySelectorAll('.vc-sessions__covers-list li').length)
      .toBe(COPY.covers.length);
  });

  it('renderiza las dos sesiones, con el pack destacado', () => {
    const cards = compiled.querySelectorAll('.vc-session-card');
    expect(cards.length).toBe(2);
    expect(cards[1].classList).toContain('vc-session-card--featured');
    expect(compiled.querySelector('.vc-session-card__badge')?.textContent?.trim())
      .toBe(COPY.session2Badge);
  });

  it('lleva a Calendly con el tag a1 de la sesión elegida', () => {
    const links = compiled.querySelectorAll<HTMLAnchorElement>('.vc-session-card a.btn');
    expect(links[0].href)
      .toContain(encodeURIComponent(`Asesoría 1:1 — ${COPY.session1Name} (USD 150)`));
    expect(links[1].href)
      .toContain(encodeURIComponent(`Asesoría 1:1 — ${COPY.session2Name} (USD 400)`));
  });

  it('trackea la reserva de sesión', () => {
    const trackSpy = spyOn(TestBed.inject(AnalyticsService), 'track');
    fixture.debugElement.query(By.css('.vc-session-card a.btn'))
      .triggerEventHandler('click', new MouseEvent('click'));
    expect(trackSpy).toHaveBeenCalledWith('viajero_creador_session_click');
  });

  it('tiene id para navegación por ancla', () => {
    expect(compiled.querySelector('section')?.id).toBe('asesorias');
  });
});
