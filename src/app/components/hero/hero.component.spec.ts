import type { MockedObject } from "vitest";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HeroComponent } from './hero.component';
import { EmailCaptureService } from '../../services/email-capture.service';

const VALID_EMAIL = 'test@example.com';

describe('HeroComponent', () => {
    beforeEach(() => {
        vi.useFakeTimers({ advanceTimeDelta: 1, shouldAdvanceTime: true });
    });
    afterEach(() => {
        vi.useRealTimers();
    });
    let component: HeroComponent;
    let fixture: ComponentFixture<HeroComponent>;
    // Sólo los métodos públicos que usa el componente: MockedObject<T> exigiría
    // también los miembros privados del servicio real.
    let mockService: Pick<MockedObject<EmailCaptureService>, 'isRateLimited' | 'hasAlreadySubmitted' | 'submit' | 'recordSubmission'>;

    beforeEach(async () => {
        mockService = {
            isRateLimited: vi.fn().mockName("EmailCaptureService.isRateLimited"),
            hasAlreadySubmitted: vi.fn().mockName("EmailCaptureService.hasAlreadySubmitted"),
            submit: vi.fn().mockName("EmailCaptureService.submit"),
            recordSubmission: vi.fn().mockName("EmailCaptureService.recordSubmission")
        };
        mockService.isRateLimited.mockReturnValue(false);
        mockService.hasAlreadySubmitted.mockReturnValue(false);

        await TestBed.configureTestingModule({
            imports: [HeroComponent],
            providers: [{ provide: EmailCaptureService, useValue: mockService }],
        }).compileComponents();

        fixture = TestBed.createComponent(HeroComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => localStorage.clear());

    it('should create', () => expect(component).toBeTruthy());

    it('should show email input and submit button', () => {
        expect(fixture.nativeElement.querySelector('[data-testid="hero-email"]')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('[data-testid="hero-submit"]')).toBeTruthy();
    });

    it('should show success state after valid submission', async () => {
        mockService.submit.mockReturnValue(of({}));
        component.form.setValue({ email: VALID_EMAIL, trap: '' });
        await vi.advanceTimersByTimeAsync(0);
        component.onSubmit();
        fixture.detectChanges();

        expect(component.status()).toBe('success');
        expect(fixture.nativeElement.querySelector('[data-testid="hero-success"]')).toBeTruthy();
    });

    it('should set error status on service failure', async () => {
        mockService.submit.mockReturnValue(throwError(() => new Error('fail')));
        component.form.setValue({ email: VALID_EMAIL, trap: '' });
        await vi.advanceTimersByTimeAsync(0);
        component.onSubmit();
        expect(component.status()).toBe('error');
    });

    it('should set rateLimit status when rate limited', async () => {
        mockService.isRateLimited.mockReturnValue(true);
        component.form.setValue({ email: VALID_EMAIL, trap: '' });
        await vi.advanceTimersByTimeAsync(0);
        component.onSubmit();
        expect(component.status()).toBe('rateLimit');
        expect(mockService.submit).not.toHaveBeenCalled();
    });

    it('should set duplicate status when already submitted', async () => {
        mockService.hasAlreadySubmitted.mockReturnValue(true);
        component.form.setValue({ email: VALID_EMAIL, trap: '' });
        await vi.advanceTimersByTimeAsync(0);
        component.onSubmit();
        expect(component.status()).toBe('duplicate');
        expect(mockService.submit).not.toHaveBeenCalled();
    });

    it('should silently succeed when honeypot is filled', async () => {
        component.form.setValue({ email: VALID_EMAIL, trap: 'bot' });
        await vi.advanceTimersByTimeAsync(0);
        component.onSubmit();
        expect(mockService.submit).not.toHaveBeenCalled();
        expect(component.status()).toBe('success');
    });

    it('should have honeypot with tabindex -1', () => {
        const trap: HTMLInputElement = fixture.nativeElement.querySelector('[formControlName="trap"]');
        expect(trap.getAttribute('tabindex')).toBe('-1');
    });
});
