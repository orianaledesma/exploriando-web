import type { Mock } from "vitest";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { MarcasComponent } from './marcas.component';
import { AnalyticsService } from '../../services/analytics.service';
import { LanguageService } from '../../services/language.service';
import { TRANSLATIONS } from '../../translations/translations';

describe('MarcasComponent', () => {
    let fixture: ComponentFixture<MarcasComponent>;
    let trackSpy: Mock;
    let lang: LanguageService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MarcasComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(MarcasComponent);
        trackSpy = vi.spyOn(TestBed.inject(AnalyticsService), 'track').mockReturnValue(undefined);
        lang = TestBed.inject(LanguageService);
        lang.set('es');
        fixture.detectChanges();
    });

    it('crea el componente', () => {
        expect(fixture.componentInstance).toBeTruthy();
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

    it('renderiza las secciones nuevas del media-kit (quién soy, hoteles, precios)', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.marcas-about'), 'quién soy + audiencia').toBeTruthy();
        expect(compiled.querySelector('.marcas-hoteles'), 'hoteles & experiencias').toBeTruthy();
        expect(compiled.querySelector('.ugc__packages'), 'grilla de precios').toBeTruthy();
        // 3 servicios visibles + 3 que se despliegan con "Ver más servicios".
        expect(compiled.querySelectorAll('.ugc__package').length, '6 servicios').toBe(6);
        expect(compiled.querySelector('#servicios-extra')?.hasAttribute('hidden'), 'los extra arrancan ocultos').toBe(true);
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

    it('no expone piezas que todavía no tienen con qué dibujarse', () => {
        // Una pieza sólo de Instagram sin frame propio armaría `<img src=".jpg">`.
        // El filtro `renderable` las deja fuera hasta que llegue la imagen.
        const componente = fixture.componentInstance;
        const todas = [...componente.portfolioFeatured, ...componente.portfolioRest];

        expect(todas.length).toBeGreaterThan(0);
        for (const piece of todas) {
            expect(piece.id || piece.thumb, piece.title).toBeTruthy();
        }
    });

    it('ninguna tarjeta del portafolio apunta a una imagen vacía', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const roto = Array.from(
            compiled.querySelectorAll<HTMLImageElement>('.marcas-video-card img'),
        ).filter((img) => (img.getAttribute('src') ?? '').startsWith('.'));

        expect(roto).toHaveLength(0);
    });

});
