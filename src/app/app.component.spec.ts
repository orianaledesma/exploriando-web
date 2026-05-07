import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { LanguageService } from './services/language.service';
import { TRANSLATIONS } from './translations/translations';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render nav', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-nav')).toBeTruthy();
  });

  it('should render main with skip link target', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#main-content')).toBeTruthy();
  });

  it('skip link apunta a #main-content y usa el texto traducido', () => {
    TestBed.inject(LanguageService).set('es');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector<HTMLAnchorElement>('a.skip-link');
    expect(link).toBeTruthy();
    expect(link!.getAttribute('href')).toBe('#main-content');
    expect(link!.textContent?.trim()).toBe(TRANSLATIONS.es.a11y.skipLink);
  });

  it('skip link cambia de texto al cambiar el idioma', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    TestBed.inject(LanguageService).set('en');
    fixture.detectChanges();

    const link = compiled.querySelector<HTMLAnchorElement>('a.skip-link');
    expect(link!.textContent?.trim()).toBe(TRANSLATIONS.en.a11y.skipLink);
  });
});
