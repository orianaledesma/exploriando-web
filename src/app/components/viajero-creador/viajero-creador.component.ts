import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { TRANSLATIONS } from '../../translations/translations';
import { RevealDirective } from '../../directives/reveal.directive';
import { EmailCaptureService } from '../../services/email-capture.service';
import { EmailCaptureStatus } from '../../models/email-capture.model';

const WAITLIST_SOURCE = 'viajero-creador' as const;

const BOOKING_URL = 'https://calendly.com/orianaledesma/asesoria-exploriando';

@Component({
  selector: 'app-viajero-creador',
  templateUrl: './viajero-creador.component.html',
  styleUrl: './viajero-creador.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, ReactiveFormsModule],
})
export class ViajeroCreadorComponent {
  private readonly lang         = inject(LanguageService);
  private readonly fb           = inject(FormBuilder);
  private readonly emailService = inject(EmailCaptureService);

  readonly t          = computed(() => TRANSLATIONS[this.lang.current()].viajeroCreador);
  readonly status     = signal<EmailCaptureStatus>('idle');
  readonly bookingUrl = BOOKING_URL;

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    trap:  [''],
  });

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

    if (this.emailService.hasAlreadySubmitted(WAITLIST_SOURCE)) {
      this.status.set('duplicate');
      return;
    }

    this.status.set('loading');

    this.emailService
      .submit({ email: this.form.value['email'] as string, source: WAITLIST_SOURCE })
      .subscribe({
        next: () => {
          this.emailService.recordSubmission(WAITLIST_SOURCE);
          this.status.set('success');
          this.form.reset();
        },
        error: () => this.status.set('error'),
      });
  }
}
