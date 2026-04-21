import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AfiliadosComponent } from './afiliados.component';
import { AFILIADOS_COPY_A } from '../../copy/afiliados.copy';

describe('AfiliadosComponent', () => {
  let fixture: ComponentFixture<AfiliadosComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfiliadosComponent],
    }).compileComponents();

    fixture  = TestBed.createComponent(AfiliadosComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should render the section headline', () => {
    expect(compiled.querySelector('h2')?.textContent).toContain(AFILIADOS_COPY_A.headlineA);
  });

  it('should render all affiliate cards', () => {
    const cards = compiled.querySelectorAll('.afiliados__card');
    expect(cards.length).toBe(AFILIADOS_COPY_A.cards.length);
  });

  it('should render each card name', () => {
    const names = Array.from(compiled.querySelectorAll('.afiliados__name')).map(el => el.textContent ?? '');
    for (const card of AFILIADOS_COPY_A.cards) {
      expect(names.some(n => n.includes(card.name))).toBeTrue();
    }
  });

  it('should render CTA links with noopener', () => {
    const links = compiled.querySelectorAll<HTMLAnchorElement>('.afiliados__cta');
    links.forEach(link => {
      expect(link.rel).toContain('noopener');
      expect(link.target).toBe('_blank');
    });
  });

  it('should render badge only for cards that have one', () => {
    const badges = compiled.querySelectorAll('.afiliados__badge');
    const cardsWithBadge = AFILIADOS_COPY_A.cards.filter(c => c.badge);
    expect(badges.length).toBe(cardsWithBadge.length);
  });

  it('should render the affiliate disclosure note', () => {
    expect(compiled.querySelector('.afiliados__footer-note')?.textContent)
      .toContain('afiliado');
  });
});
