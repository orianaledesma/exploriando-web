import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroCardsComponent } from './hero-cards.component';

const SOURCES = ['/assets/images/a', '/assets/images/b'];
const ALTS    = ['Frame A', 'Frame B'];

describe('HeroCardsComponent', () => {
  let fixture: ComponentFixture<HeroCardsComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HeroCardsComponent] }).compileComponents();
    fixture = TestBed.createComponent(HeroCardsComponent);
    fixture.componentRef.setInput('sources', SOURCES);
    fixture.componentRef.setInput('alts', ALTS);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('crea el componente', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renderiza un naipe por fuente', () => {
    expect(compiled.querySelectorAll('.hero-card').length).toBe(SOURCES.length);
  });

  it('sirve webp con fallback jpg', () => {
    const source = compiled.querySelector<HTMLSourceElement>('source');
    expect(source?.getAttribute('srcset')).toBe('/assets/images/a.webp');
    expect(source?.type).toBe('image/webp');
    expect(compiled.querySelector('img')?.getAttribute('src')).toBe('/assets/images/a.jpg');
  });

  it('aplica el alt que le corresponde a cada frame', () => {
    const imgs = compiled.querySelectorAll('img');
    expect(imgs[0].alt).toBe('Frame A');
    expect(imgs[1].alt).toBe('Frame B');
  });

  it('numera los naipes para poder escalonarlos', () => {
    const cards = compiled.querySelectorAll('.hero-card');
    expect(cards[0].classList).toContain('hero-card--1');
    expect(cards[1].classList).toContain('hero-card--2');
  });
});
