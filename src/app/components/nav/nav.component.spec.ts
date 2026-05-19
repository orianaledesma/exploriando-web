import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let fixture: ComponentFixture<NavComponent>;
  let component: NavComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture   = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled  = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ─── Logo ──────────────────────────────────────────────────────────────────

  it('should render the three logo segments', () => {
    const base = compiled.querySelectorAll('.nav__logo-base');
    const ori  = compiled.querySelector('.nav__logo-ori');
    expect(base.length).toBe(2);
    expect(base[0].textContent?.trim()).toBe('Expl');
    expect(base[1].textContent?.trim()).toBe('ando');
    expect(ori?.textContent?.trim()).toBe('ori');
  });

  it('should compose the full brand name in aria-label', () => {
    const logoText = compiled.querySelector('.nav__logo-text');
    expect(logoText?.getAttribute('aria-label')).toBe('Exploriando');
  });

  // ─── Scroll signal ─────────────────────────────────────────────────────────

  it('should start with scrolled as false', () => {
    expect(component.scrolled()).toBe(false);
  });

  it('should not have nav--opaque class initially on home', () => {
    const header = compiled.querySelector('header');
    expect(header?.classList).not.toContain('nav--opaque');
  });

  it('should apply nav--opaque class when scrolled signal is true', () => {
    component.scrolled.set(true);
    fixture.detectChanges();
    const header = compiled.querySelector('header');
    expect(header?.classList).toContain('nav--opaque');
  });

  // ─── Nav links ─────────────────────────────────────────────────────────────

  it('should render all 4 nav links from translations', () => {
    // Translations actuales: Nosotros, Viajero Creador, Marcas, Recursos.
    // (#documentacion fue removido cuando se ocultó la sección IA por costos.)
    const links = compiled.querySelectorAll('.nav__links .nav__link');
    expect(links.length).toBe(4);
  });

  it('should render nav link hrefs from translations', () => {
    // Con <base href="/"> los hashes se serializan como /#about, /#viajero-creador, etc.
    const links = compiled.querySelectorAll<HTMLAnchorElement>('.nav__links .nav__link');
    expect(links[0]?.getAttribute('href')).toBe('/#about');
    expect(links[1]?.getAttribute('href')).toBe('/#viajero-creador');
    expect(links[2]?.getAttribute('href')).toBe('/marcas');
    expect(links[3]?.getAttribute('href')).toBe('/#recursos');
  });

  // ─── Mobile menu ───────────────────────────────────────────────────────────

  it('should start with menu closed', () => {
    expect(component.menuOpen()).toBe(false);
    expect(compiled.querySelector('.nav__mobile')?.classList).not.toContain('nav__mobile--open');
  });

  it('should open menu on toggleMenu()', () => {
    component.toggleMenu();
    fixture.detectChanges();
    expect(component.menuOpen()).toBe(true);
    expect(compiled.querySelector('.nav__mobile')?.classList).toContain('nav__mobile--open');
  });

  it('should close menu on second toggleMenu()', () => {
    component.toggleMenu();
    component.toggleMenu();
    fixture.detectChanges();
    expect(component.menuOpen()).toBe(false);
  });

  it('should close menu on closeMenu()', () => {
    component.toggleMenu();
    component.closeMenu();
    fixture.detectChanges();
    expect(component.menuOpen()).toBe(false);
  });

  it('should update aria-expanded on hamburger', () => {
    const btn = compiled.querySelector<HTMLButtonElement>('.nav__hamburger');
    expect(btn?.getAttribute('aria-expanded')).toBe('false');
    component.toggleMenu();
    fixture.detectChanges();
    expect(btn?.getAttribute('aria-expanded')).toBe('true');
  });

  it('should have desktop CTA pointing to /#comunidad-form fragment', () => {
    // routerLink="/" + fragment="comunidad-form" + <base href="/"> → /#comunidad-form
    const cta = compiled.querySelector<HTMLAnchorElement>('.nav__cta');
    expect(cta?.getAttribute('href')).toBe('/#comunidad-form');
  });
});
