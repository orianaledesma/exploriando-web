import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PlaceContentService } from './place-content.service';

describe('PlaceContentService', () => {
  let svc: PlaceContentService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    svc  = TestBed.inject(PlaceContentService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  describe('parse()', () => {
    it('devuelve frontmatter vacío y body parseado si no hay frontmatter', () => {
      const out = svc.parse('# Hello\n\nWorld');
      expect(out.frontmatter.city).toBe('');
      expect(out.bodyHtml).toContain('<h1>Hello</h1>');
      expect(out.bodyHtml).toContain('<p>World</p>');
    });

    it('parsea frontmatter YAML simple en strings', () => {
      const md = [
        '---',
        'city: Mendoza',
        'slug: mendoza',
        'country: Argentina',
        'youtubeId: abc123',
        '---',
        '',
        '## Sobre este destino',
        '',
        'Texto.',
      ].join('\n');

      const out = svc.parse(md);
      expect(out.frontmatter.city).toBe('Mendoza');
      expect(out.frontmatter.slug).toBe('mendoza');
      expect(out.frontmatter.country).toBe('Argentina');
      expect(out.frontmatter.youtubeId).toBe('abc123');
      expect(out.bodyHtml).toContain('Sobre este destino');
    });

    it('respeta strings con comillas dobles', () => {
      const md = '---\nyoutubeTitle: "Hola: con dos puntos"\n---\n\n';
      const out = svc.parse(md);
      expect(out.frontmatter.youtubeTitle).toBe('Hola: con dos puntos');
    });

    it('parsea array de meses', () => {
      const md = '---\nbestMonths: [3, 4, 5, 9, 10]\n---\n';
      const out = svc.parse(md);
      expect(out.frontmatter.bestMonths).toEqual([3, 4, 5, 9, 10]);
    });

    it('soporta array vacío con comentario inline', () => {
      const md = '---\nbestMonths: []  # 1=Ene, 12=Dic\n---\n';
      const out = svc.parse(md);
      expect(out.frontmatter.bestMonths).toEqual([]);
    });

    it('ignora líneas sin colon', () => {
      const md = '---\nlinea suelta\ncity: Roma\n---\n';
      const out = svc.parse(md);
      expect(out.frontmatter.city).toBe('Roma');
    });
  });

  describe('load()', () => {
    it('hace GET a /assets/content/places/[country]/[city].md y parsea', (done) => {
      svc.load('argentina', 'mendoza').subscribe(content => {
        expect(content).not.toBeNull();
        expect(content!.frontmatter.city).toBe('Mendoza');
        done();
      });

      const req = http.expectOne('/assets/content/places/argentina/mendoza.md');
      expect(req.request.method).toBe('GET');
      req.flush('---\ncity: Mendoza\n---\n\n# Mendoza');
    });

    it('devuelve null si el .md no existe (404)', (done) => {
      svc.load('argentina', 'inexistente').subscribe(content => {
        expect(content).toBeNull();
        done();
      });

      http.expectOne('/assets/content/places/argentina/inexistente.md')
        .flush('Not found', { status: 404, statusText: 'Not Found' });
    });

    it('cachea el observable y no repite la request en cargas exitosas', (done) => {
      svc.load('argentina', 'mendoza').subscribe(() => {
        // Segunda carga del mismo recurso — no debería disparar nueva request
        svc.load('argentina', 'mendoza').subscribe(c => {
          expect(c?.frontmatter.city).toBe('Mendoza');
          done();
        });
      });

      const req = http.expectOne('/assets/content/places/argentina/mendoza.md');
      req.flush('---\ncity: Mendoza\n---\n\n');
      // Si cachea, expectOne pasaría — si volviera a pedir, http.verify() en afterEach fallaría
    });
  });
});
