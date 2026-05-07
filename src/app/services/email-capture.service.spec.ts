import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import emailjs from '@emailjs/browser';
import { EmailCaptureService } from './email-capture.service';
import { AnalyticsService } from './analytics.service';

describe('EmailCaptureService', () => {
  let svc: EmailCaptureService;
  let trackSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    svc = TestBed.inject(EmailCaptureService);
    trackSpy = spyOn(TestBed.inject(AnalyticsService), 'track');
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
    });

    it('dispara email_capture_error con source en fallo', (done) => {
      spyOn(emailjs, 'send').and.returnValue(Promise.reject(new Error('emailjs down')));

      svc.submit({ email: 'a@b.com', source: 'guia' }).subscribe({
        next:  () => done.fail('should have errored'),
        error: () => {
          expect(trackSpy).toHaveBeenCalledWith('email_capture_error', { source: 'guia' });
          done();
        },
      });
    });

    it('mantiene el contrato — el componente sigue recibiendo el error', (done) => {
      spyOn(emailjs, 'send').and.returnValue(Promise.reject(new Error('boom')));

      svc.submit({ email: 'a@b.com', source: 'footer' }).subscribe({
        next:  () => done.fail('should not emit next'),
        error: (err: Error) => {
          expect(err.message).toBe('boom');
          done();
        },
      });
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

  // Suprimir noise de rxjs en tests del subscribe sin descartar suscripciones.
  // No hace falta `unsubscribe` porque `forkJoin` completa solo.
  it('compila', () => expect(svc).toBeTruthy());
});
