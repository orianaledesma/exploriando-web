import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import emailjs from '@emailjs/browser';
import { EmailCaptureService } from './email-capture.service';
import { AnalyticsService } from './analytics.service';

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

      svc.submit({ email: 'a@b.com', source: 'hero' }).subscribe(() => {
        expect(trackSpy).toHaveBeenCalledWith('email_capture_submit', { source: 'hero' });
        done();
      });

      // El alta a MailerLite pasa por la Netlify Function vía /api/subscribe.
      httpMock.expectOne('/api/subscribe').flush({ ok: true });
    });

    it('dispara email_capture_error con source en fallo (emailjs)', (done) => {
      spyOn(emailjs, 'send').and.returnValue(Promise.reject(new Error('emailjs down')));

      svc.submit({ email: 'a@b.com', source: 'guia' }).subscribe({
        next:  () => done.fail('should have errored'),
        error: () => {
          expect(trackSpy).toHaveBeenCalledWith('email_capture_error', { source: 'guia' });
          done();
        },
      });
      // forkJoin cancela el request al errar emailjs; lo drenamos si quedó abierto.
      httpMock.match('/api/subscribe').forEach((r) => !r.cancelled && r.flush({}));
    });

    it('mantiene el contrato — el componente sigue recibiendo el error', (done) => {
      spyOn(emailjs, 'send').and.returnValue(Promise.resolve({ status: 200, text: 'OK' }));

      svc.submit({ email: 'a@b.com', source: 'footer' }).subscribe({
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
