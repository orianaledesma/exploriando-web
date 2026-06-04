import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailCaptureService, GIFT_DRIVE_URL } from '../../services/email-capture.service';
import { EmailCaptureStatus } from '../../models/email-capture.model';
import { LanguageService } from '../../services/language.service';
import { TRANSLATIONS } from '../../translations/translations';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
})
export class HeroComponent {
  private readonly lang         = inject(LanguageService);
  private readonly fb           = inject(FormBuilder);
  private readonly emailService = inject(EmailCaptureService);

  readonly t       = computed(() => TRANSLATIONS[this.lang.current()].hero);
  readonly giftUrl = GIFT_DRIVE_URL;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    trap:  [''], // honeypot
  });

  status = signal<EmailCaptureStatus>('idle');

  get emailCtrl() { return this.form.controls['email']; }

  onSubmit(): void {
    if (this.form.value['trap']) {
      this.status.set('success');
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.emailService.isRateLimited()) {
      this.status.set('rateLimit');
      return;
    }

    if (this.emailService.hasAlreadySubmitted()) {
      this.status.set('duplicate');
      return;
    }

    this.status.set('loading');

    this.emailService.submit({ email: this.form.value['email'] as string, source: 'hero', lang: this.lang.current() }).subscribe({
      next: () => {
        this.emailService.recordSubmission();
        this.status.set('success');
        this.form.reset();
      },
      error: () => this.status.set('error'),
    });
  }
}
