import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ComunidadComponent } from './comunidad.component';
import { LanguageService } from '../../services/language.service';
import { signal } from '@angular/core';

const mockLangService = {
  current: signal('es' as const),
  set: jasmine.createSpy('set'),
};

describe('ComunidadComponent', () => {
  let fixture: ComponentFixture<ComunidadComponent>;
  let component: ComunidadComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunidadComponent],
      providers: [
        { provide: LanguageService, useValue: mockLangService },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ComunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 community items', () => {
    const items = fixture.nativeElement.querySelectorAll('.comunidad__item');
    expect(items.length).toBe(4);
  });

  it('should render the headline', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).toContain('Qué te llevás al sumarte');
  });

  it('should have section aria-labelledby pointing to heading id', () => {
    const section = fixture.nativeElement.querySelector('section');
    const heading = fixture.nativeElement.querySelector('#comunidad-title');
    expect(section.getAttribute('aria-labelledby')).toBe('comunidad-title');
    expect(heading).toBeTruthy();
  });

  it('should call scrollIntoView when scrollToHero is called and element exists', () => {
    const mockInput = jasmine.createSpyObj('input', ['scrollIntoView', 'focus']);
    spyOn(document, 'getElementById').and.returnValue(mockInput as unknown as HTMLElement);

    component.scrollToHero();

    expect(mockInput.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' });
    expect(mockInput.focus).toHaveBeenCalled();
  });

  it('should do nothing when hero input is not found', () => {
    spyOn(document, 'getElementById').and.returnValue(null);
    expect(() => component.scrollToHero()).not.toThrow();
  });

  it('should render all icons as aria-hidden', () => {
    const icons = fixture.nativeElement.querySelectorAll('.comunidad__item-icon');
    (Array.from(icons) as Element[]).forEach((icon) => {
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });
  });
});
