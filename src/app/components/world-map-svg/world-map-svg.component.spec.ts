import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { WorldMapSvgComponent } from './world-map-svg.component';
import { PLACES } from '../../data/places';

describe('WorldMapSvgComponent', () => {
  let fixture: ComponentFixture<WorldMapSvgComponent>;
  let component: WorldMapSvgComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorldMapSvgComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(WorldMapSvgComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('places', PLACES);
    fixture.detectChanges();
  });

  it('crea el componente', () => {
    expect(component).toBeTruthy();
  });

  it('renderiza un path por cada continente', () => {
    const paths = fixture.debugElement.queryAll(By.css('.world-map__continents path'));
    expect(paths.length).toBe(component.continentPaths.length);
  });

  it('renderiza un marker por cada Place con coords', () => {
    const placesWithCoords = PLACES.filter(p => p.coords !== undefined);
    const markers = fixture.debugElement.queryAll(By.css('.world-map__marker'));
    expect(markers.length).toBe(placesWithCoords.length);
  });

  it('cada marker es un <a> que linkea a /mapa/[country] (no a la ciudad)', () => {
    const firstMarker = fixture.debugElement.queryAll(By.css('.world-map__marker'))[0];
    expect(firstMarker.nativeElement.tagName.toLowerCase()).toBe('a');
    const href = firstMarker.nativeElement.getAttribute('href');
    expect(href).toMatch(/^\/mapa\/[a-z-]+$/);
  });

  it('cada marker tiene aria-label apuntando al país (consistencia con el destino)', () => {
    const firstMarker = fixture.debugElement.queryAll(By.css('.world-map__marker'))[0];
    const aria = firstMarker.nativeElement.getAttribute('aria-label') ?? '';
    expect(aria.length).toBeGreaterThan(0);
    expect(aria).toMatch(/Argentina/i);  // primer place es Mendoza, Argentina
    expect(aria).not.toMatch(/Mendoza/i); // ya no menciona la ciudad
  });

  it('cada marker incluye <title> con el tooltip', () => {
    const firstTitle = fixture.debugElement.query(By.css('.world-map__marker title'));
    expect(firstTitle?.nativeElement.textContent).toContain('Mendoza');
    expect(firstTitle?.nativeElement.textContent).toContain('Argentina');
  });

  it('SVG tiene role="img" y aria-label', () => {
    const svg = fixture.debugElement.query(By.css('svg.world-map'));
    expect(svg.nativeElement.getAttribute('role')).toBe('img');
    expect(svg.nativeElement.getAttribute('aria-label')).toBeTruthy();
  });

  it('cuando activeCountryCode está seteado, los markers de otros países reciben clase --inactive', () => {
    fixture.componentRef.setInput('activeCountryCode', 'ARG');
    fixture.detectChanges();
    const inactive = fixture.debugElement.queryAll(By.css('.world-map__marker--inactive'));
    const argMarkers = PLACES.filter(p => p.coords && p.countryCode === 'ARG').length;
    const totalMarkers = PLACES.filter(p => p.coords).length;
    expect(inactive.length).toBe(totalMarkers - argMarkers);
  });

  it('compact prop aplica clase modificadora al SVG raíz', () => {
    fixture.componentRef.setInput('compact', true);
    fixture.detectChanges();
    const svg = fixture.debugElement.query(By.css('svg.world-map'));
    expect(svg.nativeElement.classList).toContain('world-map--compact');
  });

  it('markers de Europa + Egipto reciben clase --region-europe', () => {
    const europeans = ['NLD', 'DEU', 'ESP', 'FRA', 'ITA', 'EGY'];
    const europeanMarkers = fixture.debugElement.queryAll(By.css('.world-map__marker--region-europe'));
    const expected = PLACES.filter(p => p.coords && europeans.includes(p.countryCode)).length;
    expect(europeanMarkers.length).toBe(expected);
  });
});
