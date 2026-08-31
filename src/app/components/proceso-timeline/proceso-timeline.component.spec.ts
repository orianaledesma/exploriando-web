import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcesoTimelineComponent, ProcesoStep } from './proceso-timeline.component';

const STEPS: ProcesoStep[] = [
  { title: 'Visión creativa', items: ['Brief creativo', 'Entregables definidos'] },
  { title: 'Contrato + seña', items: ['50% al firmar'] },
  { title: 'Producción',      items: ['Grabación en destino'] },
  { title: 'Entrega',         items: ['50% restante'] },
];

describe('ProcesoTimelineComponent', () => {
  let fixture: ComponentFixture<ProcesoTimelineComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcesoTimelineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcesoTimelineComponent);
    fixture.componentRef.setInput('title', 'Cómo trabajo');
    fixture.componentRef.setInput('subtitle', 'Un proceso claro de punta a punta.');
    fixture.componentRef.setInput('steps', STEPS);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render title and subtitle', () => {
    expect(compiled.querySelector('.marcas-proceso__title')?.textContent?.trim())
      .toBe('Cómo trabajo');
    expect(compiled.querySelector('.marcas-proceso__subtitle')?.textContent?.trim())
      .toBe('Un proceso claro de punta a punta.');
  });

  it('should render one step per input entry, in an ordered list', () => {
    expect(compiled.querySelector('ol.marcas-proceso__steps')).not.toBeNull();
    const steps = compiled.querySelectorAll('.marcas-proceso__step');
    expect(steps.length).toBe(STEPS.length);
  });

  it('should number the dots starting at 1', () => {
    const dots = compiled.querySelectorAll('.marcas-proceso__dot');
    expect(Array.from(dots).map(d => d.textContent?.trim())).toEqual(['1', '2', '3', '4']);
  });

  it('should render every bullet of every step', () => {
    const bullets = compiled.querySelectorAll('.marcas-proceso__step-list li');
    expect(bullets.length).toBe(STEPS.reduce((n, s) => n + s.items.length, 0));
    expect(bullets[0]?.textContent?.trim()).toBe('Brief creativo');
  });

  it('should hide the decorative dots from screen readers', () => {
    const dot = compiled.querySelector('.marcas-proceso__dot');
    expect(dot?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should apply the title id so the container can label the block', () => {
    fixture.componentRef.setInput('titleId', 'proceso-custom');
    fixture.detectChanges();
    expect(compiled.querySelector('.marcas-proceso__title')?.id).toBe('proceso-custom');
  });
});
