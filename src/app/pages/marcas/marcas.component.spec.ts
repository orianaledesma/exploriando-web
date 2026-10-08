import type { Mock } from "vitest";
import { provideTestRouter } from '../../testing/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { MarcasComponent } from './marcas.component';
import { AnalyticsService } from '../../services/analytics.service';
import { LanguageService } from '../../services/language.service';
import { TRANSLATIONS } from '../../translations/translations';

describe('MarcasComponent', () => {
    let fixture: ComponentFixture<MarcasComponent>;
    let compiled: HTMLElement;
    let trackSpy: Mock;
    let lang: LanguageService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MarcasComponent],
            providers: [provideTestRouter()],
        }).compileComponents();

        fixture = TestBed.createComponent(MarcasComponent);
        trackSpy = vi.spyOn(TestBed.inject(AnalyticsService), 'track').mockReturnValue(undefined);
        lang = TestBed.inject(LanguageService);
        lang.set('es');
        fixture.detectChanges();
        compiled = fixture.nativeElement as HTMLElement;
    });

    it('crea el componente', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('declara su propio canonical, no el de la home', () => {
        // index.html trae un canonical estático a la portada. Si la página no lo
        // sobreescribe, Google lee /marcas como un duplicado de la home.
        const canonical = document.head
            .querySelector<HTMLLinkElement>('link[rel="canonical"]')
            ?.getAttribute('href');

        expect(canonical).toBe('https://exploriando.page/marcas');
    });

    describe('traducción de las piezas del portafolio', () => {
        /**
         * Hay una sola URL de /marcas y el idioma se cambia en el cliente, así
         * que el prerender sólo prueba el español. Estos casos son la única
         * cobertura de inglés y portugués.
         */
        const titulosEsperados = {
            es: 'Un día de relax en el bosque',
            en: 'A quiet day in the forest',
            pt: 'Um dia de descanso na floresta',
        } as const;

        for (const [idioma, titulo] of Object.entries(titulosEsperados)) {
            it(`muestra los títulos en ${idioma}`, () => {
                lang.set(idioma as 'es' | 'en' | 'pt');
                fixture.detectChanges();

                const titulos = Array.from(
                    compiled.querySelectorAll('.marcas-video-card__title'),
                ).map((el) => el.textContent?.trim());

                expect(titulos).toContain(titulo);
            });
        }

        it('traduce el aria-label del frame, con el título interpolado', () => {
            lang.set('en');
            fixture.detectChanges();

            const frame = compiled.querySelector('.marcas-video-card__player--link');
            const etiqueta = frame?.getAttribute('aria-label') ?? '';

            expect(etiqueta).toContain('opens in a new tab');
            expect(etiqueta).toContain('A quiet day in the forest');
            // El wrapper no puede quedar en español mientras el título se traduce.
            expect(etiqueta).not.toContain('pestaña');
        });

        it('traduce los aria-label de los links de plataforma', () => {
            lang.set('pt');
            fixture.detectChanges();

            const etiquetas = Array.from(compiled.querySelectorAll('.marcas-video-card__links a'))
                .map((a) => a.getAttribute('aria-label') ?? '');

            expect(etiquetas.some((e) => e.includes('abre em nova aba'))).toBe(true);
            expect(etiquetas.every((e) => !e.includes('pestaña'))).toBe(true);
        });

        it('cada pieza tiene texto en los tres idiomas', () => {
            const piezas = fixture.componentInstance.piecesByCategory();
            const claves = Object.values(piezas).flat().map((p) => p.key);

            expect(claves.length).toBeGreaterThan(0);
            for (const idioma of ['es', 'en', 'pt'] as const) {
                const copy = TRANSLATIONS[idioma].ugc.portfolioPieces;
                for (const clave of claves) {
                    // El título es obligatorio; lugar y descripción pueden faltar.
                    expect(copy[clave]?.title, `${clave} en ${idioma}`).toBeTruthy();
                }
            }
        });
    });

    it('trackea marcas_form_click con location=hero al clickear el CTA del hero', () => {
        const heroLink = fixture.debugElement.query(By.css('.marcas-hero a.btn--primary'));
        heroLink.triggerEventHandler('click', new MouseEvent('click'));

        expect(trackSpy).toHaveBeenCalledWith('marcas_form_click', { location: 'hero', channel: 'instagram' });
    });

    it('trackea marcas_form_click con location=final_cta y location=package en sus respectivos botones', () => {
        const finalCtaLink = fixture.debugElement.query(By.css('.marcas-cta a.btn--primary'));
        finalCtaLink.triggerEventHandler('click', new MouseEvent('click'));
        expect(trackSpy).toHaveBeenCalledWith('marcas_form_click', { location: 'final_cta', channel: 'instagram' });

        const packageLink = fixture.debugElement.query(By.css('.marcas-quote a.btn--primary'));
        packageLink.triggerEventHandler('click', new MouseEvent('click'));

        // Ya no hay botón por tarjeta: el contacto de servicios vive en el bloque
        // de cotización, así que se trackea sin nombre de paquete.
        const packageCall = vi.mocked(trackSpy).mock.calls.find(args => args[0] === 'marcas_form_click' && args[1].location === 'package');
        expect(packageCall).toBeTruthy();
        expect(packageCall![1].channel).toBe('instagram');
    });

    it('renderiza las secciones del media-kit', () => {
        expect(compiled.querySelector('.marcas-about'), 'quién soy + audiencia').toBeTruthy();
        expect(compiled.querySelector('.marcas-hoteles'), 'hoteles & experiencias').toBeTruthy();
        expect(compiled.querySelector('.marcas-servicios'), 'servicios').toBeTruthy();
    });

    // ─── Servicios ────────────────────────────────────────────────────────────

    it('rinde los tres servicios más la tarjeta a medida', () => {
        const esperados = TRANSLATIONS.es.ugc.servicios.items.length;
        expect(compiled.querySelectorAll('.marcas-serv').length).toBe(esperados + 1);
        expect(compiled.querySelector('.marcas-serv--custom')).toBeTruthy();
    });

    it('las opciones arrancan cerradas pero están en el HTML', () => {
        // `hidden` y no @if: así quedan prerenderizadas para Google, pero fuera
        // del tabulador y del lector de pantalla mientras están cerradas.
        const detalles = Array.from(
            compiled.querySelectorAll<HTMLElement>('.marcas-serv__detalle'),
        );
        expect(detalles.length).toBeGreaterThan(0);
        for (const d of detalles) {
            expect(d.hasAttribute('hidden')).toBe(true);
            expect(d.textContent?.trim().length).toBeGreaterThan(0);
        }
    });

    it('desplegar un servicio no abre los demás', () => {
        const componente = fixture.componentInstance;
        componente.toggleService(1);
        fixture.detectChanges();

        expect(componente.isServiceOpen(1)).toBe(true);
        expect(componente.isServiceOpen(0)).toBe(false);
        expect(componente.isServiceOpen(2)).toBe(false);

        const detalles = compiled.querySelectorAll<HTMLElement>('.marcas-serv__detalle');
        expect(detalles[1].hasAttribute('hidden')).toBe(false);
        expect(detalles[0].hasAttribute('hidden')).toBe(true);
    });

    it('mantiene el Piloto Medido entre las opciones de UGC', () => {
        // Es la opción que ofrece medición a 60 días: la maqueta la eliminaba
        // y la decisión fue conservarla.
        const ugc = TRANSLATIONS.es.ugc.servicios.items[0];
        expect(ugc.options.map((o) => o.name)).toContain('Piloto Medido');
    });

    it('cada servicio tiene opciones y letra chica en los tres idiomas', () => {
        for (const lang of ['es', 'en', 'pt'] as const) {
            for (const serv of TRANSLATIONS[lang].ugc.servicios.items) {
                expect(serv.options.length, `${lang}/${serv.title}`).toBeGreaterThan(0);
                expect(serv.note.trim().length, `${lang}/${serv.title}`).toBeGreaterThan(0);
            }
        }
    });

    it('oculta la sección de testimonios mientras no haya items', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.marcas-testimonios')).toBeNull();
    });

    // CRÍTICO (brief 04/06): el toggle EN debe traducir el CONTENIDO de /marcas,
    // no sólo el nav. El prospecto LT lee en inglés.
    it('traduce el contenido visible al cambiar el idioma a EN', () => {
        const headline = () => (fixture.nativeElement as HTMLElement).querySelector('.marcas-hero h1')?.textContent?.trim();

        expect(headline()).toBe(TRANSLATIONS.es.ugc.headline);

        lang.set('en');
        fixture.detectChanges();

        expect(headline()).toBe(TRANSLATIONS.en.ugc.headline);
        expect(headline()).not.toBe(TRANSLATIONS.es.ugc.headline);
    });

    // ─── Portafolio: piezas sin frame ──────────────────────────────────────────

    it('toda pieza visible lleva a algún lado', () => {
        // Una pieza sin frame se dibuja con un bloque neutro, pero sigue
        // teniendo que llevar al reel o al video: una tarjeta sin destino no
        // es portafolio, es relleno.
        const componente = fixture.componentInstance;

        let total = 0;
        for (const cat of componente.categories) {
            componente.selectCategory(cat);
            for (const piece of componente.visiblePieces()) {
                expect(piece.yt || piece.ig || piece.id, piece.title).toBeTruthy();
                total++;
            }
        }
        expect(total).toBeGreaterThan(0);
    });

    // ─── Portafolio por categorías ────────────────────────────────────────────

    it('rinde una pestaña por categoría, con una sola en el tabulador', () => {
        const tabs = Array.from(
            compiled.querySelectorAll<HTMLButtonElement>('.marcas-portfolio__tab'),
        );
        expect(tabs).toHaveLength(fixture.componentInstance.categories.length);

        const enTabulador = tabs.filter((t) => t.tabIndex === 0);
        expect(enTabulador).toHaveLength(1);
    });

    it('cambiar de pestaña cambia las piezas que se muestran', () => {
        const componente = fixture.componentInstance;
        componente.selectCategory('hoteleria');
        fixture.detectChanges();
        const hoteleria = componente.visiblePieces().map((p) => p.title);

        componente.selectCategory('experiencias');
        fixture.detectChanges();
        const experiencias = componente.visiblePieces().map((p) => p.title);

        expect(hoteleria.length).toBeGreaterThan(0);
        expect(experiencias.length).toBeGreaterThan(0);
        expect(hoteleria).not.toEqual(experiencias);
    });

    it('hoy ninguna categoría está vacía, y el estado vacío sigue listo', () => {
        // Las seis tienen piezas. El bloque de vacío queda escrito y traducido
        // para la próxima categoría que se abra (Tecnología, por ejemplo).
        const componente = fixture.componentInstance;
        for (const cat of componente.categories) {
            componente.selectCategory(cat);
            expect(componente.visiblePieces().length, cat).toBeGreaterThan(0);
        }

        for (const lang of ['es', 'en', 'pt'] as const) {
            const vacio = TRANSLATIONS[lang].ugc.portfolioEmpty;
            expect(vacio.title.trim().length, lang).toBeGreaterThan(0);
            expect(vacio.note.trim().length, lang).toBeGreaterThan(0);
        }
    });

    it('trackea qué categoría eligió el visitante', () => {
        fixture.componentInstance.selectCategory('experiencias');
        expect(trackSpy).toHaveBeenCalledWith('portfolio_category_click', {
            category: 'experiencias',
        });
    });

    it('ninguna tarjeta del portafolio apunta a una imagen vacía', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const roto = Array.from(
            compiled.querySelectorAll<HTMLImageElement>('.marcas-video-card img'),
        ).filter((img) => (img.getAttribute('src') ?? '').startsWith('.'));

        expect(roto).toHaveLength(0);
    });

});
