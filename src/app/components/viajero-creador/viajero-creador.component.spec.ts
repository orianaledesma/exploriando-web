import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ViajeroCreadorComponent } from './viajero-creador.component';
import { LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';
import { TRANSLATIONS } from '../../translations/translations';

const COPY = TRANSLATIONS.es.viajeroCreador;

describe('ViajeroCreadorComponent', () => {
  let fixture: ComponentFixture<ViajeroCreadorComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViajeroCreadorComponent],
    }).compileComponents();

    TestBed.inject(LanguageService).set('es');

    fixture = TestBed.createComponent(ViajeroCreadorComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render section label, headline and all topics', () => {
    expect(compiled.querySelector('.section-label')?.textContent?.trim())
      .toBe(COPY.sectionLabel);
    expect(compiled.querySelector('h2#vc-title')?.textContent?.trim())
      .toBe(COPY.headline);
    expect(compiled.querySelectorAll('.vc-topic').length)
      .toBe(COPY.topics.length);
  });

  it('should NOT render any waitlist form (model: free content lives on YouTube)', () => {
    expect(compiled.querySelector('form')).toBeNull();
    expect(compiled.querySelector('input[type="email"]')).toBeNull();
  });

  it('primary CTA points to the YouTube channel', () => {
    const cta = compiled.querySelector<HTMLAnchorElement>('.vc-youtube__cta');
    const href = cta?.getAttribute('href') ?? '';
    expect(href).toContain('youtube.com/watch');
    expect(href).toContain('list=PLjZ30HHREgvqeMNLcj36yBabdMVw_fAwa');
    expect(cta?.textContent?.trim()).toContain(COPY.youtube.cta);
  });

  it('session CTAs carry the specific session in the Calendly a1 tag', () => {
    const ctas = compiled.querySelectorAll<HTMLAnchorElement>('.vc-session-card__cta');
    expect(ctas.length).toBe(2);
    const hrefs = Array.from(ctas).map(c => c.getAttribute('href') ?? '');
    hrefs.forEach(href => {
      expect(href).toContain('calendly.com/orianaledesma/asesoria-exploriando?a1=');
      expect(href).toContain(encodeURIComponent('Asesoría 1:1'));
    });
    // cada card lleva su precio para que Ori sepa cuál eligió
    expect(hrefs[0]).toContain(encodeURIComponent('USD 150'));
    expect(hrefs[1]).toContain(encodeURIComponent('USD 400'));
  });

  it('tracks the YouTube click', () => {
    const trackSpy = spyOn(TestBed.inject(AnalyticsService), 'track');
    fixture.debugElement
      .query(By.css('.vc-youtube__cta'))
      .triggerEventHandler('click', new MouseEvent('click'));
    expect(trackSpy).toHaveBeenCalledWith('viajero_creador_youtube_click');
  });

  it('tracks the session click', () => {
    const trackSpy = spyOn(TestBed.inject(AnalyticsService), 'track');
    fixture.debugElement
      .query(By.css('.vc-session-card__cta'))
      .triggerEventHandler('click', new MouseEvent('click'));
    expect(trackSpy).toHaveBeenCalledWith('viajero_creador_session_click');
  });

  it('should have id for anchor navigation', () => {
    expect(compiled.querySelector('section')?.id).toBe('viajero-creador');
  });
});
