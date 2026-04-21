import {
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Directive({ selector: '[appReveal]' })
export class RevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);

  /** Retraso en ms — permite stagger en listas de cards. */
  readonly delay = input<number>(0);

  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    const element = this.el.nativeElement;
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${this.delay()}ms`);

    if (typeof IntersectionObserver === 'undefined') {
      element.classList.add('revealed');
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          element.classList.add('revealed');
          this.observer?.unobserve(element);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
