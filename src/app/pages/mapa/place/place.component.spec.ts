import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { PlaceComponent } from './place.component';

describe('PlaceComponent', () => {
  let fixture: ComponentFixture<PlaceComponent>;
  let component: PlaceComponent;
  let http: HttpTestingController;
  let paramMap$: BehaviorSubject<ReturnType<typeof convertToParamMap>>;

  beforeEach(async () => {
    paramMap$ = new BehaviorSubject(convertToParamMap({ country: 'argentina', city: 'mendoza' }));

    await TestBed.configureTestingModule({
      imports: [PlaceComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { paramMap: paramMap$.asObservable() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => http.verify());

  it('crea el componente y resuelve el lugar desde la URL', () => {
    expect(component.place()).toBeDefined();
    expect(component.place()!.city).toBe('Mendoza');
    expect(component.country()!.name).toBe('Argentina');
    http.expectOne('/assets/content/places/argentina/mendoza.md').flush('');
  });

  it('hace request al .md correspondiente', () => {
    const req = http.expectOne('/assets/content/places/argentina/mendoza.md');
    expect(req.request.method).toBe('GET');
    req.flush('---\ncity: Mendoza\n---\n\n# Mendoza\n\nTexto.');
  });

  it('renderiza el HTML del .md una vez cargado', () => {
    http.expectOne('/assets/content/places/argentina/mendoza.md')
      .flush('---\ncity: Mendoza\n---\n\nContenido **rico**.');
    fixture.detectChanges();

    const prose = fixture.debugElement.query(By.css('.prose'));
    expect(prose.nativeElement.innerHTML).toContain('<strong>rico</strong>');
  });

  it('siblingPlaces excluye el lugar actual y devuelve otros del mismo país', () => {
    const siblings = component.siblingPlaces();
    expect(siblings.length).toBeGreaterThan(0);
    expect(siblings.find(s => s.slug === 'mendoza')).toBeUndefined();
    expect(siblings.every(s => s.countryCode === 'ARG')).toBe(true);
    http.expectOne('/assets/content/places/argentina/mendoza.md').flush('');
  });

  it('notFound es true cuando los slugs no matchean ningún lugar', () => {
    http.expectOne('/assets/content/places/argentina/mendoza.md').flush('');
    paramMap$.next(convertToParamMap({ country: 'xxx', city: 'yyy' }));
    fixture.detectChanges();
    expect(component.notFound()).toBe(true);
  });

  it('breadcrumb tiene 2 links: /mapa y /mapa/[country] (sin queryParams)', () => {
    http.expectOne('/assets/content/places/argentina/mendoza.md').flush('---\ncity: Mendoza\n---\n');
    fixture.detectChanges();

    const links = fixture.debugElement.queryAll(By.css('.place__crumbs a'));
    expect(links.length).toBe(2);
    expect(links[0].nativeElement.getAttribute('href')).toBe('/mapa');
    expect(links[1].nativeElement.getAttribute('href')).toBe('/mapa/argentina');
  });
});
