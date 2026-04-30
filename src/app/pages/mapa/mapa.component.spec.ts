import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { MapaComponent } from './mapa.component';

describe('MapaComponent', () => {
  let fixture: ComponentFixture<MapaComponent>;
  let component: MapaComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crea el componente y muestra el título', () => {
    expect(component).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.mapa__title'))).toBeTruthy();
  });

  it('expone titleEl viewChild para focus management', () => {
    // El template debe tener `<h1 #pageTitle>` para que afterNextRender
    // pueda mover el focus al cambiar de ruta (a11y).
    expect(component.titleEl).toBeDefined();
  });

  it('expone stats reales basados en los lugares cargados', () => {
    const s = component.stats();
    expect(s.countries).toBeGreaterThan(0);
    expect(s.places).toBeGreaterThanOrEqual(s.countries);
  });

  it('renderiza el SVG mediante WorldMapSvgComponent', () => {
    const svg = fixture.debugElement.query(By.css('app-world-map-svg svg'));
    expect(svg).toBeTruthy();
  });

  it('renderiza el sidebar con la lista de países', () => {
    const nav = fixture.debugElement.query(By.css('app-country-nav-list nav'));
    expect(nav).toBeTruthy();
  });

  it('renderiza el hint que apunta a la lista', () => {
    const hint = fixture.debugElement.query(By.css('.mapa__hint'));
    expect(hint.nativeElement.textContent.trim().length).toBeGreaterThan(0);
  });

  it('cityCounts agrupa correctamente por país', () => {
    const counts = component.cityCounts();
    expect(counts['ARG']).toBe(7);
    expect(counts['NLD']).toBe(1);
  });
});
