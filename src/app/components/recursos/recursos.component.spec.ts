import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RecursosComponent } from './recursos.component';
import { EmailCaptureService } from '../../services/email-capture.service';
import { RECURSOS_COPY } from '../../copy/recursos.copy';
import { of, throwError } from 'rxjs';

describe('RecursosComponent', () => {
  let fixture: ComponentFixture<RecursosComponent>;
  let component: RecursosComponent;
  let compiled: HTMLElement;
  let emailService: jasmine.SpyObj<EmailCaptureService>;

  beforeEach(async () => {
    emailService = jasmine.createSpyObj<EmailCaptureService>(
      'EmailCaptureService',
      ['isRateLimited', 'hasAlreadySubmitted', 'submit', 'recordSubmission'],
    );
    emailService.isRateLimited.and.returnValue(false);
    emailService.hasAlreadySubmitted.and.returnValue(false);
    emailService.submit.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      imports: [RecursosComponent, ReactiveFormsModule],
      providers: [{ provide: EmailCaptureService, useValue: emailService }],
    }).compileComponents();

    fixture = TestBed.createComponent(RecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render section label', () => {
    const label = compiled.querySelector('.section-label');
    expect(label?.textContent?.trim()).toBe(RECURSOS_COPY.sectionLabel);
  });

  it('should render headline', () => {
    const h2 = compiled.querySelector('h2');
    expect(h2?.textContent?.trim()).toBe(RECURSOS_COPY.headline);
  });

  it('should render all guide contents', () => {
    const items = compiled.querySelectorAll('.recursos__contents li');
    expect(items.length).toBe(RECURSOS_COPY.guideContents.length);
  });

  it('should render the form when not already joined', () => {
    const form = compiled.querySelector('form');
    expect(form).toBeTruthy();
  });

  it('should show already joined state when hasAlreadySubmitted is true', () => {
    emailService.hasAlreadySubmitted.and.returnValue(true);
    component.ngOnInit();
    fixture.detectChanges();
    const alreadyEl = compiled.querySelector('.recursos__already');
    expect(alreadyEl).toBeTruthy();
  });

  it('should not submit with invalid email', () => {
    component.form.controls['email'].setValue('not-an-email');
    component.onSubmit();
    expect(emailService.submit).not.toHaveBeenCalled();
  });

  it('should submit and show success on valid email', () => {
    component.form.controls['email'].setValue('test@test.com');
    component.onSubmit();
    expect(emailService.submit).toHaveBeenCalledWith({ email: 'test@test.com', source: 'recursos' });
    expect(component.status()).toBe('success');
  });

  it('should set rateLimit status when rate limited', () => {
    emailService.isRateLimited.and.returnValue(true);
    component.form.controls['email'].setValue('test@test.com');
    component.onSubmit();
    expect(component.status()).toBe('rateLimit');
  });

  it('should set error status on service failure', () => {
    emailService.submit.and.returnValue(throwError(() => new Error('fail')));
    component.form.controls['email'].setValue('test@test.com');
    component.onSubmit();
    expect(component.status()).toBe('error');
  });

  it('should silently discard honeypot submissions', () => {
    component.form.controls['trap'].setValue('bot-value');
    component.form.controls['email'].setValue('test@test.com');
    component.onSubmit();
    expect(emailService.submit).not.toHaveBeenCalled();
    expect(component.status()).toBe('success');
  });
});
