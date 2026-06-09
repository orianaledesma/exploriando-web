import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { MarcasComponent } from './marcas.component';
import { AnalyticsService } from '../../services/analytics.service';
import { LanguageService } from '../../services/language.service';
import { TRANSLATIONS } from '../../translations/translations';

describe('MarcasComponent', () => {
  let fixture: ComponentFixture<MarcasComponent>;
  let trackSpy: jasmine.Spy;
  let lang: LanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcasComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MarcasComponent);
    trackSpy = spyOn(TestBed.inject(AnalyticsService), 'track');
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

    expect(trackSpy).toHaveBeenCalledWith('marcas_form_click', { location: 'hero' });
  });

  it('trackea marcas_form_click con location=final_cta y location=package en sus respectivos botones', () => {
    const finalCtaLink = fixture.debugElement.query(By.css('.marcas-cta a.btn--primary'));
    finalCtaLink.triggerEventHandler('click', new MouseEvent('click'));
    expect(trackSpy).toHaveBeenCalledWith('marcas_form_click', { location: 'final_cta' });

    const packageLink = fixture.debugElement.query(By.css('.ugc__package a.btn--primary'));
    packageLink.triggerEventHandler('click', new MouseEvent('click'));

    const packageCall = trackSpy.calls.allArgs()
      .find(args => args[0] === 'marcas_form_click' && args[1].location === 'package');
    expect(packageCall).toBeTruthy();
    expect(packageCall![1].package).toBeTruthy();
  });

  it('renderiza las secciones nuevas del media-kit (quién soy, hoteles, precios)', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.marcas-about')).withContext('quién soy + audiencia').toBeTruthy();
    expect(compiled.querySelector('.marcas-hoteles')).withContext('hoteles & experiencias').toBeTruthy();
    expect(compiled.querySelector('.ugc__packages')).withContext('grilla de precios').toBeTruthy();
    expect(compiled.querySelectorAll('.ugc__package').length).withContext('3 tiers').toBe(3);
  });

  it('oculta la sección de testimonios mientras no haya items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.marcas-testimonios')).toBeNull();
  });

  // CRÍTICO (brief 04/06): el toggle EN debe traducir el CONTENIDO de /marcas,
  // no sólo el nav. El prospecto LT lee en inglés.
  it('traduce el contenido visible al cambiar el idioma a EN', () => {
    const headline = () =>
      (fixture.nativeElement as HTMLElement).querySelector('.marcas-hero h1')?.textContent?.trim();

    expect(headline()).toBe(TRANSLATIONS.es.ugc.headline);

    lang.set('en');
    fixture.detectChanges();

    expect(headline()).toBe(TRANSLATIONS.en.ugc.headline);
    expect(headline()).not.toBe(TRANSLATIONS.es.ugc.headline);
  });
});
