import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { FooterComponent } from './footer.component';
import { EmailCaptureService } from '../../services/email-capture.service';
import { of, throwError } from 'rxjs';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;
  let component: FooterComponent;
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
      imports: [FooterComponent, ReactiveFormsModule],
      providers: [
        { provide: EmailCaptureService, useValue: emailService },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render final CTA headline', () => {
    const h2 = compiled.querySelector('#footer-cta-title');
    expect(h2?.textContent?.trim()).toBeTruthy();
  });

  it('should render footer brand logo', () => {
    const logo = compiled.querySelector('.footer__logo');
    expect(logo?.textContent?.trim()).toBe('Exploriando');
  });

  it('should render all footer columns', () => {
    const cols = compiled.querySelectorAll('.footer__col');
    expect(cols.length).toBe(4);
  });

  it('should render footer legal text', () => {
    const legal = compiled.querySelector('.footer__bottom p');
    expect(legal?.textContent?.trim()).toBe('© 2026 Exploriando.');
  });

  it('should submit and show success on valid email', () => {
    component.form.controls['email'].setValue('test@test.com');
    component.onSubmit();
    expect(emailService.submit).toHaveBeenCalledWith(
      jasmine.objectContaining({ email: 'test@test.com', source: 'footer' }));
    expect(component.status()).toBe('success');
  });

  it('should show duplicate state when already submitted', () => {
    emailService.hasAlreadySubmitted.and.returnValue(true);
    component.form.controls['email'].setValue('test@test.com');
    component.onSubmit();
    expect(component.status()).toBe('duplicate');
    expect(emailService.submit).not.toHaveBeenCalled();
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

  it('should hide form after success', () => {
    component.form.controls['email'].setValue('test@test.com');
    component.onSubmit();
    fixture.detectChanges();
    const form = compiled.querySelector('form');
    expect(form).toBeNull();
  });

  it('should render external links with target="_blank" and rel="noopener"', () => {
    const externalLinks = compiled.querySelectorAll<HTMLAnchorElement>('a.footer__link--external');
    expect(externalLinks.length).toBeGreaterThan(0);
    externalLinks.forEach(a => {
      expect(a.getAttribute('target')).toBe('_blank');
      expect(a.getAttribute('rel')).toBe('noopener');
    });
  });

  it('should render mailto link for contact', () => {
    const links = Array.from(compiled.querySelectorAll<HTMLAnchorElement>('a.footer__link'));
    const mailto = links.find(a => a.getAttribute('href')?.startsWith('mailto:'));
    expect(mailto).toBeTruthy();
    expect(mailto?.getAttribute('href')).toBe('mailto:exploriando.info@gmail.com');
  });

  it('should render a YouTube link pointing to the Exploriando channel', () => {
    const links = Array.from(compiled.querySelectorAll<HTMLAnchorElement>('a.footer__link--external'));
    const yt = links.find(a => a.getAttribute('href')?.includes('youtube.com/@Exploriando'));
    expect(yt).toBeTruthy();
  });
});
