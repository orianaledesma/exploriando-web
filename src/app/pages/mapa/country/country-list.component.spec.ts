import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { CountryListComponent } from './country-list.component';
import { COUNTRIES, placesOfCountry } from '../../../data/places';

describe('CountryListComponent', () => {
  let fixture: ComponentFixture<CountryListComponent>;
  let component: CountryListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryListComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CountryListComponent);
    component = fixture.componentInstance;
  });

  // ─── Estado 'ok': país válido con ciudades ──────────────────────────────
  describe('estado ok (país válido con ciudades)', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('country', 'argentina');
      fixture.detectChanges();
    });

    it('crea el componente y resuelve el país', () => {
      expect(component).toBeTruthy();
      expect(component.status()).toBe('ok');
      expect(component.meta()?.name).toBe('Argentina');
    });

    it('renderiza header con título igual al nombre del país', () => {
      const title = fixture.debugElement.query(By.css('.country-list__title'));
      expect(title.nativeElement.textContent.trim()).toBe('Argentina');
    });

    it('renderiza una city-card por cada ciudad del país', () => {
      const cards = fixture.debugElement.queryAll(By.css('.city-card'));
      expect(cards.length).toBe(placesOfCountry('ARG').length);
    });

    it('cada card linkea a /mapa/[country]/[city]', () => {
      const first = fixture.debugElement.query(By.css('.city-card'));
      const href = first.nativeElement.getAttribute('href');
      expect(href).toMatch(/^\/mapa\/argentina\/[a-z-]+$/);
    });

    it('breadcrumb "Volver al mapa" linkea a /mapa', () => {
      const back = fixture.debugElement.query(By.css('.country-list__back'));
      expect(back.nativeElement.getAttribute('href')).toBe('/mapa');
    });

    // ─── Stats pills (M2) ─────────────────────────────────────────────────
    it('renderiza 3 stats pills en el header', () => {
      const stats = fixture.debugElement.queryAll(By.css('.country-list__stat'));
      expect(stats.length).toBe(3);
    });

    it('statsCitiesText interpola plural correctamente para 7 ciudades', () => {
      const html = component.statsCitiesText();
      expect(html).toContain('<strong>7</strong>');
      expect(html).toContain('ciudades grabadas');
    });

    it('statsVideosText asume 1 video por place', () => {
      const html = component.statsVideosText();
      expect(html).toContain('<strong>7</strong>');
      expect(html).toContain('videos');
    });

    // ─── Subtitle anclado al país (M4) ────────────────────────────────────
    it('subtitle del header incluye el nombre del país', () => {
      const subtitle = fixture.debugElement.query(By.css('.country-list__subtitle'));
      expect(subtitle.nativeElement.textContent).toContain('Argentina');
    });

    // ─── Thumb fallback (M5) ──────────────────────────────────────────────
    it('cada thumb tiene un span de fallback con la bandera', () => {
      const fallbacks = fixture.debugElement.queryAll(By.css('.city-card__thumb-fallback'));
      expect(fallbacks.length).toBe(placesOfCountry('ARG').length);
      expect(fallbacks[0].nativeElement.textContent.trim()).toBe(COUNTRIES['ARG'].flag);
    });

    it('alt del thumb incluye ciudad y país', () => {
      const img = fixture.debugElement.query(By.css('.city-card__thumb img'));
      const alt = img.nativeElement.getAttribute('alt');
      expect(alt).toContain('Argentina');
    });

    it('onThumbError agrega clase thumb-error al contenedor', () => {
      const thumb = fixture.debugElement.query(By.css('.city-card__thumb'));
      const img = thumb.query(By.css('img'));
      const event = new Event('error');
      Object.defineProperty(event, 'target', { value: img.nativeElement, writable: false });
      component.onThumbError(event);
      expect(thumb.nativeElement.classList).toContain('thumb-error');
    });

    // ─── Footer CTAs (B2) ─────────────────────────────────────────────────
    it('footer CTA primario linkea a /#viajero-creador', () => {
      const links = fixture.debugElement.queryAll(By.css('.country-list__cta a'));
      const primary = links.find(l => l.nativeElement.classList.contains('btn--primary'));
      expect(primary?.nativeElement.getAttribute('href')).toBe('/#viajero-creador');
    });

    it('footer CTA secundario linkea a /mapa', () => {
      const links = fixture.debugElement.queryAll(By.css('.country-list__cta a'));
      const secondary = links.find(l => l.nativeElement.classList.contains('btn--outline'));
      expect(secondary?.nativeElement.getAttribute('href')).toBe('/mapa');
    });
  });

  // ─── Estado 'invalid-slug' ─────────────────────────────────────────────
  describe('estado invalid-slug (país no existe)', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('country', 'narnia');
      fixture.detectChanges();
    });

    it('status retorna invalid-slug', () => {
      expect(component.status()).toBe('invalid-slug');
    });

    it('renderiza el empty state not-found con CTA al mapa', () => {
      const notFound = fixture.debugElement.query(By.css('.country-list--not-found'));
      expect(notFound).toBeTruthy();
      const cta = notFound.query(By.css('.btn--primary'));
      expect(cta?.nativeElement.getAttribute('href')).toBe('/mapa');
    });

    it('NO renderiza city-cards en estado invalid-slug', () => {
      const cards = fixture.debugElement.queryAll(By.css('.city-card'));
      expect(cards.length).toBe(0);
    });
  });

  // ─── Helpers (no dependen del estado) ──────────────────────────────────
  it('thumbnailUrl genera URL mqdefault de YouTube', () => {
    expect(component.thumbnailUrl('abc123')).toBe('https://i.ytimg.com/vi/abc123/mqdefault.jpg');
  });
});
