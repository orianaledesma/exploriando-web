import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { ABOUT_COPY } from '../../copy/about.copy';

describe('AboutComponent', () => {
  let fixture: ComponentFixture<AboutComponent>;
  let compiled: HTMLElement;

  const copy = ABOUT_COPY.versionA;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
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
    expect(label?.textContent?.trim()).toBe(ABOUT_COPY.sectionLabel);
  });

  it('should render headline', () => {
    const h2 = compiled.querySelector('h2');
    expect(h2?.textContent?.trim()).toBe(copy.headline);
  });

  it('should render all body paragraphs', () => {
    const paragraphs = compiled.querySelectorAll('.about__content p');
    expect(paragraphs.length).toBe(copy.body.length);
  });

  it('should render all stats', () => {
    const stats = compiled.querySelectorAll('.about__stat');
    expect(stats.length).toBe(copy.stats.length);
  });

  it('should render stat values', () => {
    const values = compiled.querySelectorAll('.about__stat-value');
    copy.stats.forEach((stat, i) => {
      expect(values[i]?.textContent?.trim()).toBe(stat.value);
    });
  });

  it('should render stat labels', () => {
    const labels = compiled.querySelectorAll('.about__stat-label');
    copy.stats.forEach((stat, i) => {
      expect(labels[i]?.textContent?.trim()).toBe(stat.label);
    });
  });

  it('should render about image', () => {
    const img = compiled.querySelector<HTMLImageElement>('.about__image img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('loading')).toBe('lazy');
  });
});
