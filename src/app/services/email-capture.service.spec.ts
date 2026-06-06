import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import emailjs from '@emailjs/browser';
import { EmailCaptureService } from './email-capture.service';
import { AnalyticsService } from './analytics.service';
import { environment } from '../../environments/environment';

describe('EmailCaptureService', () => {
  let svc: EmailCaptureService;
  let trackSpy: jasmine.Spy;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    svc = TestBed.inject(EmailCaptureService);
    trackSpy = spyOn(TestBed.inject(AnalyticsService), 'track');
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => localStorage.clear());

  describe('submit() — tracking', () => {
    it('dispara email_capture_submit con source en éxito', (done) => {
      spyOn(emailjs, 'send').and.returnValue(Promise.resolve({ status: 200, text: 'OK' }));

      svc.submit({ email: 'a@b.com', source: 'hero', lang: 'es' }).subscribe(() => {
        expect(trackSpy).toHaveBeenCalledWith('email_capture_submit', { source: 'hero' });
        done();
      });

      // El alta a MailerLite pasa por la Netlify Function vía /api/subscribe.
      httpMock.expectOne('/api/subscribe').flush({ ok: true });
    });

    it('un fallo de EmailJS es best-effort: el alta igual tiene éxito', (done) => {
      // EmailJS es solo la notificación interna a Oriana. Si falla, el alta a
      // MailerLite (la fuente de verdad) debe seguir adelante sin abortarse.
      spyOn(emailjs, 'send').and.returnValue(Promise.reject(new Error('emailjs down')));

      svc.submit({ email: 'a@b.com', source: 'guia', lang: 'es' }).subscribe({
        next:  () => {
          expect(trackSpy).toHaveBeenCalledWith('email_capture_submit', { source: 'guia' });
          done();
        },
        error: () => done.fail('un fallo de EmailJS no debe romper el alta'),
      });

      // El request a MailerLite NO debe cancelarse por el fallo de EmailJS.
      const req = httpMock.expectOne('/api/subscribe');
      expect(req.cancelled).toBeFalse();
      req.flush({ ok: true });
    });

    it('dispara email_capture_error si falla el alta a MailerLite', (done) => {
      spyOn(emailjs, 'send').and.returnValue(Promise.resolve({ status: 200, text: 'OK' }));

      svc.submit({ email: 'a@b.com', source: 'hero', lang: 'es' }).subscribe({
        next:  () => done.fail('should have errored'),
        error: () => {
          expect(trackSpy).toHaveBeenCalledWith('email_capture_error', { source: 'hero' });
          done();
        },
      });

      httpMock.expectOne('/api/subscribe').flush(
        { error: 'down' },
        { status: 502, statusText: 'Bad Gateway' },
      );
    });

    it('mantiene el contrato — el componente sigue recibiendo el error', (done) => {
      spyOn(emailjs, 'send').and.returnValue(Promise.resolve({ status: 200, text: 'OK' }));

      svc.submit({ email: 'a@b.com', source: 'footer', lang: 'es' }).subscribe({
        next:  () => done.fail('should not emit next'),
        error: (err: { status?: number }) => {
          expect(err.status).toBe(502);
          done();
        },
      });

      httpMock.expectOne('/api/subscribe').flush(
        { error: 'down' },
        { status: 502, statusText: 'Bad Gateway' },
      );
    });

    it('manda la bienvenida (guía gratis) al suscriptor en su idioma y pasa el idioma a MailerLite', (done) => {
      const sendSpy = spyOn(emailjs, 'send').and.returnValue(Promise.resolve({ status: 200, text: 'OK' }));

      svc.submit({ email: 'lead@b.com', source: 'hero', lang: 'en' }).subscribe(() => {
        // El email de bienvenida va al suscriptor (to_email) con el link de la guía…
        const confirmCall = sendSpy.calls.allArgs()
          .find(a => (a[2] as Record<string, unknown>)?.['to_email'] === 'lead@b.com');
        expect(confirmCall).withContext('welcome email to subscriber').toBeTruthy();
        expect((confirmCall![2] as Record<string, unknown>)['gift_url']).toBeTruthy();
        // …con su link de baja (one-click unsubscribe)…
        expect((confirmCall![2] as Record<string, unknown>)['unsubscribe_url']).toBeTruthy();
        // …usando la plantilla EN porque lang === 'en'.
        expect(confirmCall![1]).toBe(environment.emailjs.confirmationTemplate.en);
        done();
      });

      // El idioma viaja a MailerLite para poder segmentar.
      const req = httpMock.expectOne('/api/subscribe');
      expect((req.request.body as { lang?: string }).lang).toBe('en');
      req.flush({ ok: true });
    });
  });

  describe('rate limit + duplicates', () => {
    it('isRateLimited() es false al inicio', () => {
      expect(svc.isRateLimited()).toBeFalse();
    });

    it('hasAlreadySubmitted() es false al inicio', () => {
      expect(svc.hasAlreadySubmitted()).toBeFalse();
      expect(svc.hasAlreadySubmitted('viajero-creador')).toBeFalse();
    });

    it('recordSubmission() marca como submitted y suma al rate-limit window', () => {
      svc.recordSubmission('hero');
      expect(svc.hasAlreadySubmitted('hero')).toBeTrue();
    });
  });

  it('compila', () => expect(svc).toBeTruthy());
});
