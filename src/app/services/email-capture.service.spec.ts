import type { Mock } from "vitest";
import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting, } from '@angular/common/http/testing';
import emailjs from '@emailjs/browser';
import { EmailCaptureService } from './email-capture.service';
import { AnalyticsService } from './analytics.service';
import { environment } from '../../environments/environment';

describe('EmailCaptureService', () => {
    let svc: EmailCaptureService;
    let trackSpy: Mock;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(withXhr()), provideHttpClientTesting()],
        });
        svc = TestBed.inject(EmailCaptureService);
        trackSpy = vi.spyOn(TestBed.inject(AnalyticsService), 'track').mockReturnValue(undefined);
        httpMock = TestBed.inject(HttpTestingController);
        localStorage.clear();
    });

    afterEach(() => localStorage.clear());

    describe('submit() — tracking', () => {
        it('dispara email_capture_submit con source en éxito', async () => {
            vi.spyOn(emailjs, 'send').mockResolvedValue({ status: 200, text: 'OK' });

            svc.submit({ email: 'a@b.com', source: 'hero', lang: 'es' }).subscribe(() => {
                expect(trackSpy).toHaveBeenCalledWith('email_capture_submit', { source: 'hero' });
                ;
            });

            // El alta a MailerLite pasa por la Netlify Function vía /api/subscribe.
            httpMock.expectOne('/api/subscribe').flush({ ok: true });
        });

        it('un fallo de EmailJS es best-effort: el alta igual tiene éxito', async () => {
            // EmailJS es solo la notificación interna a Oriana. Si falla, el alta a
            // MailerLite (la fuente de verdad) debe seguir adelante sin abortarse.
            vi.spyOn(emailjs, 'send').mockRejectedValue(new Error('emailjs down'));

            const emitted = new Promise<void>((resolve, reject) => {
                svc.submit({ email: 'a@b.com', source: 'guia', lang: 'es' }).subscribe({
                    next: () => resolve(),
                    error: () =>
                        reject(new Error('un fallo de EmailJS no debe romper el alta')),
                });
            });

            // El request a MailerLite NO debe cancelarse por el fallo de EmailJS.
            const req = httpMock.expectOne('/api/subscribe');
            expect(req.cancelled).toBe(false);
            req.flush({ ok: true });

            await emitted;
            expect(trackSpy).toHaveBeenCalledWith('email_capture_submit', { source: 'guia' });
        });

        it('dispara email_capture_error si falla el alta a MailerLite', async () => {
            vi.spyOn(emailjs, 'send').mockResolvedValue({ status: 200, text: 'OK' });

            const errored = new Promise<void>((resolve, reject) => {
                svc.submit({ email: 'a@b.com', source: 'hero', lang: 'es' }).subscribe({
                    next: () => reject(new Error('should have errored')),
                    error: () => resolve(),
                });
            });

            httpMock
                .expectOne('/api/subscribe')
                .flush({ error: 'down' }, { status: 502, statusText: 'Bad Gateway' });

            await errored;
            expect(trackSpy).toHaveBeenCalledWith('email_capture_error', { source: 'hero' });
        });

        it('mantiene el contrato — el componente sigue recibiendo el error', async () => {
            vi.spyOn(emailjs, 'send').mockResolvedValue({ status: 200, text: 'OK' });

            const received = new Promise<{ status?: number }>((resolve, reject) => {
                svc.submit({ email: 'a@b.com', source: 'footer', lang: 'es' }).subscribe({
                    next: () => reject(new Error('should not emit next')),
                    error: (err: { status?: number }) => resolve(err),
                });
            });

            httpMock
                .expectOne('/api/subscribe')
                .flush({ error: 'down' }, { status: 502, statusText: 'Bad Gateway' });

            expect((await received).status).toBe(502);
        });

        it('manda la bienvenida (guía gratis) al suscriptor en su idioma y pasa el idioma a MailerLite', async () => {
            const sendSpy = vi.spyOn(emailjs, 'send').mockResolvedValue({ status: 200, text: 'OK' });

            svc.submit({ email: 'lead@b.com', source: 'hero', lang: 'en' }).subscribe(() => {
                // El email de bienvenida va al suscriptor (to_email) con el link de la guía…
                const confirmCall = vi.mocked(sendSpy).mock.calls.find(a => (a[2] as Record<string, unknown>)?.['to_email'] === 'lead@b.com');
                expect(confirmCall, 'welcome email to subscriber').toBeTruthy();
                expect((confirmCall![2] as Record<string, unknown>)['gift_url']).toBeTruthy();
                // …con su link de baja (one-click unsubscribe)…
                expect((confirmCall![2] as Record<string, unknown>)['unsubscribe_url']).toBeTruthy();
                // …usando la plantilla EN porque lang === 'en'.
                expect(confirmCall![1]).toBe(environment.emailjs.confirmationTemplate.en);
                ;
            });

            // El idioma viaja a MailerLite para poder segmentar.
            const req = httpMock.expectOne('/api/subscribe');
            expect((req.request.body as {
                lang?: string;
            }).lang).toBe('en');
            req.flush({ ok: true });
        });
    });

    describe('rate limit + duplicates', () => {
        it('isRateLimited() es false al inicio', () => {
            expect(svc.isRateLimited()).toBe(false);
        });

        it('hasAlreadySubmitted() es false al inicio', () => {
            expect(svc.hasAlreadySubmitted()).toBe(false);
            expect(svc.hasAlreadySubmitted('viajero-creador')).toBe(false);
        });

        it('recordSubmission() marca como submitted y suma al rate-limit window', () => {
            svc.recordSubmission('hero');
            expect(svc.hasAlreadySubmitted('hero')).toBe(true);
        });
    });

    it('compila', () => expect(svc).toBeTruthy());
});
