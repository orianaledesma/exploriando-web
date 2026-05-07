import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { MapaTeaserComponent } from './mapa-teaser.component';
import { AnalyticsService } from '../../services/analytics.service';
import { visitedCountries } from '../../data/places';

describe('MapaTeaserComponent', () => {
  let fixture: ComponentFixture<MapaTeaserComponent>;
  let component: MapaTeaserComponent;
  let trackSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaTeaserComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MapaTeaserComponent);
    component = fixture.componentInstance;
    trackSpy = spyOn(TestBed.inject(AnalyticsService), 'track');
    fixture.detectChanges();
  });

  it('crea el componente', () => {
    expect(component).toBeTruthy();
  });

  it('renderiza una card por país visitado', () => {
    const cards = fixture.debugElement.queryAll(By.css('.mapa-teaser__card'));
    expect(cards.length).toBe(visitedCountries().length);
  });

  it('cada card linkea a /mapa/[country-slug]', () => {
    const first = fixture.debugElement.query(By.css('.mapa-teaser__card'));
    const href = first.nativeElement.getAttribute('href');
    expect(href).toMatch(/^\/mapa\/[a-z-]+$/);
  });

  it('cada card muestra bandera, nombre y count', () => {
    const cards = fixture.debugElement.queryAll(By.css('.mapa-teaser__card'));
    const arg = cards.find(c => c.nativeElement.textContent.includes('Argentina'));
    expect(arg).toBeTruthy();
    expect(arg!.nativeElement.textContent).toContain('🇦🇷');
    expect(arg!.nativeElement.textContent).toContain('7');
  });

  it('aria-label completo en la card', () => {
    const first = fixture.debugElement.query(By.css('.mapa-teaser__card'));
    const aria = first.nativeElement.getAttribute('aria-label');
    expect(aria).toContain('Ver guías');
  });

  it('muestra el conteo de países y ciudades en stats', () => {
    const values = fixture.debugElement.queryAll(By.css('.mapa-teaser__stat-value'));
    expect(values[0].nativeElement.textContent.trim()).toBe(String(component.stats().countries));
    expect(values[1].nativeElement.textContent.trim()).toBe(String(component.stats().places));
  });

  it('CTA principal linkea a /mapa', () => {
    const cta = fixture.debugElement.query(By.css('.mapa-teaser__copy .btn--primary'));
    expect(cta.nativeElement.getAttribute('href')).toBe('/mapa');
  });

  it('citySuffix devuelve singular para count=1', () => {
    expect(component.citySuffix(1)).toBe('ciudad');
    expect(component.citySuffix(7)).toBe('ciudades');
  });

  it('trackea country_card_click al clickear una card', () => {
    const card = fixture.debugElement.query(By.css('.mapa-teaser__card'));
    const country = visitedCountries()[0];
    card.triggerEventHandler('click', new MouseEvent('click'));

    expect(trackSpy).toHaveBeenCalledWith('country_card_click', {
      country_code: country.code,
      country_slug: country.slug,
    });
  });

  it('trackea mapa_cta_click al clickear el CTA principal', () => {
    const cta = fixture.debugElement.query(By.css('.mapa-teaser__copy .btn--primary'));
    cta.triggerEventHandler('click', new MouseEvent('click'));

    expect(trackSpy).toHaveBeenCalledWith('mapa_cta_click');
  });
});
