import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HeroComponent } from './hero.component';
import { EmailCaptureService } from '../../services/email-capture.service';

const VALID_EMAIL = 'test@example.com';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture:   ComponentFixture<HeroComponent>;
  let mockService: jasmine.SpyObj<EmailCaptureService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj<EmailCaptureService>(
      'EmailCaptureService',
      ['isRateLimited', 'hasAlreadySubmitted', 'submit', 'recordSubmission'],
    );
    mockService.isRateLimited.and.returnValue(false);
    mockService.hasAlreadySubmitted.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports:   [HeroComponent],
      providers: [{ provide: EmailCaptureService, useValue: mockService }],
    }).compileComponents();

    fixture   = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => localStorage.clear());

  it('should create', () => expect(component).toBeTruthy());

  it('should show email input and submit button', () => {
    expect(fixture.nativeElement.querySelector('[data-testid="hero-email"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-testid="hero-submit"]')).toBeTruthy();
  });

  it('should show success state after valid submission', fakeAsync(() => {
    mockService.submit.and.returnValue(of({}));
    component.form.setValue({ email: VALID_EMAIL, trap: '' });
    tick();
    component.onSubmit();
    fixture.detectChanges();

    expect(component.status()).toBe('success');
    expect(fixture.nativeElement.querySelector('[data-testid="hero-success"]')).toBeTruthy();
  }));

  it('should set error status on service failure', fakeAsync(() => {
    mockService.submit.and.returnValue(throwError(() => new Error('fail')));
    component.form.setValue({ email: VALID_EMAIL, trap: '' });
    tick();
    component.onSubmit();
    expect(component.status()).toBe('error');
  }));

  it('should set rateLimit status when rate limited', fakeAsync(() => {
    mockService.isRateLimited.and.returnValue(true);
    component.form.setValue({ email: VALID_EMAIL, trap: '' });
    tick();
    component.onSubmit();
    expect(component.status()).toBe('rateLimit');
    expect(mockService.submit).not.toHaveBeenCalled();
  }));

  it('should set duplicate status when already submitted', fakeAsync(() => {
    mockService.hasAlreadySubmitted.and.returnValue(true);
    component.form.setValue({ email: VALID_EMAIL, trap: '' });
    tick();
    component.onSubmit();
    expect(component.status()).toBe('duplicate');
    expect(mockService.submit).not.toHaveBeenCalled();
  }));

  it('should silently succeed when honeypot is filled', fakeAsync(() => {
    component.form.setValue({ email: VALID_EMAIL, trap: 'bot' });
    tick();
    component.onSubmit();
    expect(mockService.submit).not.toHaveBeenCalled();
    expect(component.status()).toBe('success');
  }));

  it('should have honeypot with tabindex -1', () => {
    const trap: HTMLInputElement = fixture.nativeElement.querySelector('[formControlName="trap"]');
    expect(trap.getAttribute('tabindex')).toBe('-1');
  });
});
