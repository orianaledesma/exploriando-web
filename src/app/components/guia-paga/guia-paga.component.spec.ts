import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuiaPagaComponent } from './guia-paga.component';
import { GUIA_PAGA_COPY_A } from '../../copy/guia-paga.copy';

describe('GuiaPagaComponent', () => {
  let fixture: ComponentFixture<GuiaPagaComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuiaPagaComponent],
    }).compileComponents();

    fixture  = TestBed.createComponent(GuiaPagaComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should render the price', () => {
    expect(compiled.querySelector('.guia-paga__price')?.textContent)
      .toContain(GUIA_PAGA_COPY_A.price);
  });

  it('should render all includes', () => {
    const items = compiled.querySelectorAll('.guia-paga__item');
    expect(items.length).toBe(GUIA_PAGA_COPY_A.includes.length);
  });

  it('should render the CTA link', () => {
    const cta = compiled.querySelector<HTMLAnchorElement>('.guia-paga__cta');
    expect(cta).toBeTruthy();
    expect(cta?.textContent?.trim()).toBeTruthy();
  });

  it('should render free vs paid comparison items', () => {
    const freeItems = compiled.querySelectorAll('.guia-paga__vs-item--free');
    const paidItems = compiled.querySelectorAll('.guia-paga__vs-item--paid');
    expect(freeItems.length).toBe(GUIA_PAGA_COPY_A.vsGratuita.free.length);
    expect(paidItems.length).toBe(GUIA_PAGA_COPY_A.vsGratuita.paid.length);
  });

  it('should render the guarantee text', () => {
    expect(compiled.querySelector('.guia-paga__guarantee')?.textContent)
      .toContain('devuelvo');
  });

  it('should render the headline', () => {
    expect(compiled.querySelector('h2')?.textContent).toBeTruthy();
  });
});
