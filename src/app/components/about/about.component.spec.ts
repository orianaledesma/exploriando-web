import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AboutComponent } from './about.component';
import { TRANSLATIONS } from '../../translations/translations';

const COPY = TRANSLATIONS.es.about;

describe('AboutComponent', () => {
  let fixture: ComponentFixture<AboutComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    localStorage.removeItem('exploriando_lang');
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render section label', () => {
    const label = compiled.querySelector('.section-label');
    expect(label?.textContent?.trim()).toBe(COPY.sectionLabel);
  });

  it('should render headline', () => {
    const h2 = compiled.querySelector('h2');
    expect(h2?.textContent?.trim()).toBe(COPY.headline);
  });

  it('should render all body paragraphs', () => {
    const paragraphs = compiled.querySelectorAll(
      '.about__content > p:not(.about__crosslink)',
    );
    expect(paragraphs.length).toBe(COPY.body.length);
  });

  it('should render all stats', () => {
    const stats = compiled.querySelectorAll('.about__stat');
    expect(stats.length).toBe(COPY.stats.length);
  });

  it('should render stat values', () => {
    const values = compiled.querySelectorAll('.about__stat-value');
    COPY.stats.forEach((stat, i) => {
      expect(values[i]?.textContent?.trim()).toBe(stat.value);
    });
  });

  it('should render stat labels', () => {
    const labels = compiled.querySelectorAll('.about__stat-label');
    COPY.stats.forEach((stat, i) => {
      expect(labels[i]?.textContent?.trim()).toBe(stat.label);
    });
  });

  it('should render about image', () => {
    const img = compiled.querySelector<HTMLImageElement>('.about__image img');
    expect(img).toBeTruthy();
  });
});
