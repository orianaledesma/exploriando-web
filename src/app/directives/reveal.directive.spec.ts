import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RevealDirective } from './reveal.directive';

@Component({
  template: `
    <div appReveal>Elemento base</div>
    <div [appReveal] [delay]="200">Elemento con delay</div>
  `,
  imports: [RevealDirective],
})
class TestHostComponent {}

describe('RevealDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture  = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should add the reveal class on init', () => {
    const el = compiled.querySelector<HTMLElement>('div');
    expect(el?.classList).toContain('reveal');
  });

  it('should set --reveal-delay to 0ms by default', () => {
    const el = compiled.querySelector<HTMLElement>('div');
    expect(el?.style.getPropertyValue('--reveal-delay')).toBe('0ms');
  });

  it('should set --reveal-delay from input', () => {
    const els = compiled.querySelectorAll<HTMLElement>('div');
    expect(els[1]?.style.getPropertyValue('--reveal-delay')).toBe('200ms');
  });

  it('should add revealed class immediately when IntersectionObserver is unavailable', () => {
    // JSDOM no implementa IntersectionObserver → el directive lo detecta y añade revealed directamente
    const el = compiled.querySelector<HTMLElement>('div');
    expect(el?.classList).toContain('revealed');
  });
});
