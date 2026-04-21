import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajeroCreadorComponent } from './viajero-creador.component';
import { VIAJERO_CREADOR_COPY } from '../../copy/viajero-creador.copy';

describe('ViajeroCreadorComponent', () => {
  let fixture: ComponentFixture<ViajeroCreadorComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViajeroCreadorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViajeroCreadorComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render section label', () => {
    const label = compiled.querySelector('.section-label');
    expect(label?.textContent?.trim()).toBe(VIAJERO_CREADOR_COPY.sectionLabel);
  });

  it('should render headline', () => {
    const h2 = compiled.querySelector('h2');
    expect(h2?.textContent?.trim()).toBe(VIAJERO_CREADOR_COPY.headline);
  });

  it('should render all topic cards', () => {
    const cards = compiled.querySelectorAll('.vc-topic');
    expect(cards.length).toBe(VIAJERO_CREADOR_COPY.topics.length);
  });

  it('should render each topic title', () => {
    const titles = compiled.querySelectorAll('.vc-topic__title');
    VIAJERO_CREADOR_COPY.topics.forEach((topic, i) => {
      expect(titles[i]?.textContent).toContain(topic.title);
    });
  });

  it('should render coming soon badge', () => {
    const badge = compiled.querySelector('.badge--coming-soon');
    expect(badge?.textContent?.trim()).toBe(VIAJERO_CREADOR_COPY.comingSoonBadge);
  });

  it('should have CTA linking to #comunidad', () => {
    const cta = compiled.querySelector<HTMLAnchorElement>('.vc-cta a.btn');
    expect(cta?.getAttribute('href')).toBe('#comunidad');
    expect(cta?.textContent?.trim()).toBe(VIAJERO_CREADOR_COPY.cta);
  });

  it('should have id for anchor navigation', () => {
    const section = compiled.querySelector('section');
    expect(section?.id).toBe('viajero-creador');
  });
});
