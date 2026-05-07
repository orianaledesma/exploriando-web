import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { CountryNavListComponent } from './country-nav-list.component';
import { AnalyticsService } from '../../services/analytics.service';
import { COUNTRIES, cityCountByCountry, visitedCountries } from '../../data/places';

describe('CountryNavListComponent', () => {
  let fixture: ComponentFixture<CountryNavListComponent>;
  let component: CountryNavListComponent;
  let trackSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryNavListComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CountryNavListComponent);
    component = fixture.componentInstance;
    trackSpy = spyOn(TestBed.inject(AnalyticsService), 'track');
    fixture.componentRef.setInput('countries', visitedCountries());
    fixture.componentRef.setInput('cityCounts', cityCountByCountry());
    fixture.detectChanges();
  });

  it('crea el componente', () => {
    expect(component).toBeTruthy();
  });

  it('renderiza un item por país visitado', () => {
    const items = fixture.debugElement.queryAll(By.css('.country-nav__item'));
    expect(items.length).toBe(visitedCountries().length);
  });

  it('cada item tiene un link a /mapa/[slug]', () => {
    const links = fixture.debugElement.queryAll(By.css('.country-nav__link'));
    const first = links[0].nativeElement as HTMLAnchorElement;
    expect(first.getAttribute('href')).toMatch(/^\/mapa\/[a-z-]+$/);
  });

  it('cada link muestra bandera, nombre y count', () => {
    const links = fixture.debugElement.queryAll(By.css('.country-nav__link'));
    const arg = links.find(l => l.nativeElement.textContent.includes('Argentina'));
    expect(arg).toBeTruthy();
    expect(arg!.nativeElement.textContent).toContain(COUNTRIES['ARG'].flag);
    expect(arg!.nativeElement.textContent).toContain('7');
  });

  it('cada link tiene aria-label', () => {
    const link = fixture.debugElement.query(By.css('.country-nav__link')).nativeElement as HTMLAnchorElement;
    expect(link.getAttribute('aria-label')?.length).toBeGreaterThan(0);
  });

  it('nav tiene aria-label "Países visitados"', () => {
    const nav = fixture.debugElement.query(By.css('nav.country-nav'));
    expect(nav.nativeElement.getAttribute('aria-label')).toBeTruthy();
  });

  it('countOf devuelve 0 para país no presente en cityCounts', () => {
    expect(component.countOf('XXX')).toBe(0);
  });

  it('trackea country_list_click al clickear un link', () => {
    const link = fixture.debugElement.query(By.css('.country-nav__link'));
    const country = visitedCountries()[0];
    link.triggerEventHandler('click', new MouseEvent('click'));

    expect(trackSpy).toHaveBeenCalledWith('country_list_click', {
      country_code: country.code,
      country_slug: country.slug,
    });
  });
});
