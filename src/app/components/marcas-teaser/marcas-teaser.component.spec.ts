import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { MarcasTeaserComponent } from './marcas-teaser.component';
import { LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';
import { TRANSLATIONS } from '../../translations/translations';

const COPY = TRANSLATIONS.es.marcasTeaser;

describe('MarcasTeaserComponent', () => {
  let fixture: ComponentFixture<MarcasTeaserComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcasTeaserComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    TestBed.inject(LanguageService).set('es');

    fixture = TestBed.createComponent(MarcasTeaserComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render section label and headline', () => {
    expect(compiled.querySelector('.section-label')?.textContent?.trim())
      .toBe(COPY.sectionLabel);
    expect(compiled.querySelector('h2')?.textContent?.trim())
      .toBe(COPY.headline);
  });

  it('should render CTA pointing to /marcas', () => {
    const cta = compiled.querySelector<HTMLAnchorElement>('a.btn');
    expect(cta?.getAttribute('href')).toBe('/marcas');
    expect(cta?.textContent?.trim()).toContain(COPY.cta);
  });

  it('should track on CTA click', () => {
    const trackSpy = spyOn(TestBed.inject(AnalyticsService), 'track');
    fixture.debugElement
      .query(By.css('a.btn'))
      .triggerEventHandler('click', new MouseEvent('click'));
    expect(trackSpy).toHaveBeenCalledWith('marcas_teaser_click');
  });

  it('should have id for anchor navigation', () => {
    expect(compiled.querySelector('section')?.id).toBe('marcas-teaser');
  });
});
