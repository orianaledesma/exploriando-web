import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { ViajeroCreadorPageComponent } from './viajero-creador-page.component';
import { AnalyticsService } from '../../services/analytics.service';
import { EmailCaptureService } from '../../services/email-capture.service';
import { LanguageService } from '../../services/language.service';
import { TRANSLATIONS } from '../../translations/translations';

const COPY = TRANSLATIONS.es.viajeroCreador;

describe('ViajeroCreadorPageComponent', () => {
  let fixture: ComponentFixture<ViajeroCreadorPageComponent>;
  let compiled: HTMLElement;
  let trackSpy: jasmine.Spy;
  let emailService: EmailCaptureService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViajeroCreadorPageComponent],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    TestBed.inject(LanguageService).set('es');
    trackSpy = spyOn(TestBed.inject(AnalyticsService), 'track');
    emailService = TestBed.inject(EmailCaptureService);

    fixture = TestBed.createComponent(ViajeroCreadorPageComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('crea el componente', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  // ─── Hero ────────────────────────────────────────────────────────────────

  it('renderiza el hero con su h1 y el CTA anclado a la sección gratis', () => {
    expect(compiled.querySelector('.vc-hero h1')?.textContent?.trim())
      .toBe(COPY.hero.headline);
    const cta = compiled.querySelector<HTMLAnchorElement>('.vc-hero a.btn');
    expect(cta?.getAttribute('href')).toBe('#aprende-gratis');
    expect(compiled.querySelector('#aprende-gratis')).not.toBeNull();
  });

  // ─── Aprendé gratis ──────────────────────────────────────────────────────

  it('embebe la playlist en el player, no un video suelto', () => {
    const player = fixture.debugElement.query(By.css('.vc-free__player app-lite-youtube'));
    expect(player).not.toBeNull();
    expect(player.componentInstance.playlistId()).toBe(fixture.componentInstance.playlistId);
    expect(player.componentInstance.videoId()).toBe(fixture.componentInstance.firstVideoId);
  });

  it('renderiza una card por video, linkeada al video dentro de la playlist', () => {
    const cards = compiled.querySelectorAll('.vc-free__card');
    expect(cards.length).toBe(fixture.componentInstance.videos.length);

    const first = fixture.componentInstance.videos[0];
    const link = compiled.querySelector<HTMLAnchorElement>('.vc-free__card-link');
    expect(link?.getAttribute('href'))
      .toBe(`https://www.youtube.com/watch?v=${first.id}&list=${fixture.componentInstance.playlistId}`);
  });

  it('trackea el click a un video de la grilla y a la playlist completa', () => {
    fixture.debugElement.query(By.css('.vc-free__card-link'))
      .triggerEventHandler('click', new MouseEvent('click'));
    expect(trackSpy).toHaveBeenCalledWith('viajero_creador_video_click', {
      video: fixture.componentInstance.videos[0].title,
    });

    fixture.debugElement.query(By.css('.vc-free__cta a.btn'))
      .triggerEventHandler('click', new MouseEvent('click'));
    expect(trackSpy).toHaveBeenCalledWith('viajero_creador_youtube_click');
  });

  // ─── El curso (lista de espera) ──────────────────────────────────────────

  it('publica el curso en modo lista de espera: form visible, sin card de venta', () => {
    expect(fixture.componentInstance.cursoEnVenta).toBeFalse();
    expect(compiled.querySelector('.vc-curso__form')).not.toBeNull();
    expect(compiled.querySelector('.vc-curso__card')).toBeNull();
    expect(compiled.querySelector('.vc-curso__text')?.textContent?.trim())
      .toBe(COPY.curso.text);
  });

  it('da de alta con source curso-creador para poder segmentar la lista', () => {
    const submitSpy = spyOn(emailService, 'submit').and.returnValue(of({}));
    const recordSpy = spyOn(emailService, 'recordSubmission');

    fixture.componentInstance.form.setValue({ email: 'ana@test.com', trap: '' });
    fixture.componentInstance.onSubmit();

    expect(submitSpy).toHaveBeenCalledWith({
      email: 'ana@test.com', source: 'curso-creador', lang: 'es',
    });
    expect(recordSpy).toHaveBeenCalledWith('curso-creador');
    expect(fixture.componentInstance.status()).toBe('success');
  });

  it('muestra el mensaje de éxito y esconde el form tras el alta', () => {
    spyOn(emailService, 'submit').and.returnValue(of({}));
    spyOn(emailService, 'recordSubmission');

    fixture.componentInstance.form.setValue({ email: 'ana@test.com', trap: '' });
    fixture.componentInstance.onSubmit();
    fixture.detectChanges();

    expect(compiled.querySelector('.vc-curso__form')).toBeNull();
    expect(compiled.querySelector('.vc-curso__success')?.textContent?.trim())
      .toBe(COPY.curso.success);
  });

  it('no envía nada si el honeypot viene lleno', () => {
    const submitSpy = spyOn(emailService, 'submit');
    fixture.componentInstance.form.setValue({ email: 'bot@test.com', trap: 'soy un bot' });
    fixture.componentInstance.onSubmit();

    expect(submitSpy).not.toHaveBeenCalled();
    expect(fixture.componentInstance.status()).toBe('success');
  });

  it('marca error cuando falla el alta', () => {
    spyOn(emailService, 'submit').and.returnValue(throwError(() => new Error('nope')));
    fixture.componentInstance.form.setValue({ email: 'ana@test.com', trap: '' });
    fixture.componentInstance.onSubmit();

    expect(fixture.componentInstance.status()).toBe('error');
  });

  it('no envía con email inválido', () => {
    const submitSpy = spyOn(emailService, 'submit');
    fixture.componentInstance.form.setValue({ email: 'no-es-un-mail', trap: '' });
    fixture.componentInstance.onSubmit();

    expect(submitSpy).not.toHaveBeenCalled();
    expect(fixture.componentInstance.status()).toBe('idle');
  });

  // ─── Las asesorías 1:1 se mudaron a la home ──────────────────────────────

  it('ya no rinde las sesiones 1:1: viven en la home', () => {
    expect(compiled.querySelector('.vc-sessions')).toBeNull();
    expect(compiled.querySelectorAll('.vc-session-card').length).toBe(0);
  });
});
