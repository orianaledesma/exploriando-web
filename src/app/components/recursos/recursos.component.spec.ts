import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RecursosComponent } from './recursos.component';
import { LanguageService } from '../../services/language.service';
import { TRANSLATIONS } from '../../translations/translations';

describe('RecursosComponent', () => {
  let fixture: ComponentFixture<RecursosComponent>;
  let compiled: HTMLElement;

  const t = TRANSLATIONS['es'].recursos;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecursosComponent],
      providers: [LanguageService, provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RecursosComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render section label', () => {
    const label = compiled.querySelector('.section-label');
    expect(label?.textContent?.trim()).toBe(t.sectionLabel);
  });

  it('should render headline', () => {
    const h2 = compiled.querySelector('h2');
    expect(h2?.textContent?.trim()).toBe(t.headline);
  });

  it('should render all guide contents', () => {
    const items = compiled.querySelectorAll('.recursos__contents li');
    expect(items.length).toBe(t.guideContents.length);
  });

  it('should render the CTA pointing to /guia', () => {
    const cta = compiled.querySelector<HTMLAnchorElement>('.recursos__cta-block a');
    expect(cta).toBeTruthy();
    expect(cta?.getAttribute('href')).toBe('/guia');
  });

  it('should render testimonial quote and citation', () => {
    const blockquote = compiled.querySelector('.recursos__testimonial');
    const quote = blockquote?.querySelector('p')?.textContent ?? '';
    const cite = blockquote?.querySelector('cite')?.textContent ?? '';

    expect(blockquote).toBeTruthy();
    expect(quote).toContain(t.testimonial.quote);
    expect(cite).toContain(t.testimonial.author);
    expect(cite).toContain(t.testimonial.location);
  });
});
