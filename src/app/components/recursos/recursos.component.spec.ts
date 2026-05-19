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

    // Karma comparte localStorage entre specs; forzamos 'es' para que el
    // componente renderice el mismo idioma contra el que asertamos.
    TestBed.inject(LanguageService).set('es');

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

  it('should render the real guide preview screen (es)', () => {
    const img = compiled.querySelector<HTMLImageElement>('.recursos__preview img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe('/assets/content/guias/guia_screen_es.png');
  });

  it('renders the guide value list from translations', () => {
    const items = compiled.querySelectorAll('.recursos__list li');
    expect(items.length).toBe(t.guideContents.length);
    expect(items[0]?.textContent?.trim()).toBe(t.guideContents[0]);
  });

  it('CTA is a button that scrolls to the hero form (single capture point)', () => {
    const cta = compiled.querySelector<HTMLButtonElement>('.recursos__cta-block button');
    expect(cta).toBeTruthy();
    expect(cta?.getAttribute('type')).toBe('button');

    const target = jasmine.createSpyObj('input', ['scrollIntoView', 'focus']);
    spyOn(document, 'getElementById').and.returnValue(target as unknown as HTMLElement);
    cta!.click();
    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' });
    expect(target.focus).toHaveBeenCalled();
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
