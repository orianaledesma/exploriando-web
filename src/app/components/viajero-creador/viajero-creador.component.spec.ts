import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { ViajeroCreadorComponent } from './viajero-creador.component';
import { LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';
import { TRANSLATIONS } from '../../translations/translations';

const COPY = TRANSLATIONS.es.viajeroCreador;

describe('ViajeroCreadorComponent (teaser)', () => {
  let fixture: ComponentFixture<ViajeroCreadorComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViajeroCreadorComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    TestBed.inject(LanguageService).set('es');

    fixture = TestBed.createComponent(ViajeroCreadorComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render section label and teaser headline', () => {
    expect(compiled.querySelector('.section-label')?.textContent?.trim())
      .toBe(COPY.sectionLabel);
    expect(compiled.querySelector('h2')?.textContent?.trim())
      .toBe(COPY.teaser.headline);
  });

  it('should render a single teaser paragraph', () => {
    const paragraphs = compiled.querySelectorAll('p');
    expect(paragraphs.length).toBe(1);
    expect(paragraphs[0]?.textContent?.trim()).toBe(COPY.teaser.text);
  });

  it('should NOT render the full content, which now lives on the page', () => {
    expect(compiled.querySelector('.vc-topics')).toBeNull();
    expect(compiled.querySelector('.vc-sessions')).toBeNull();
  });

  it('should render CTA pointing to /viajero-creador', () => {
    const cta = compiled.querySelector<HTMLAnchorElement>('a.btn');
    expect(cta?.getAttribute('href')).toBe('/viajero-creador');
    expect(cta?.textContent?.trim()).toContain(COPY.teaser.cta);
  });

  it('should track on CTA click', () => {
    const trackSpy = spyOn(TestBed.inject(AnalyticsService), 'track');
    fixture.debugElement
      .query(By.css('a.btn'))
      .triggerEventHandler('click', new MouseEvent('click'));
    expect(trackSpy).toHaveBeenCalledWith('viajero_creador_teaser_click');
  });

  it('should have id for anchor navigation', () => {
    expect(compiled.querySelector('section')?.id).toBe('viajero-creador');
  });
});
