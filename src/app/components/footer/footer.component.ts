import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailCaptureService } from '../../services/email-capture.service';
import { EmailCaptureStatus } from '../../models/email-capture.model';
import { LanguageService } from '../../services/language.service';
import { TRANSLATIONS } from '../../translations/translations';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ReactiveFormsModule, RevealDirective],
})
export class FooterComponent {
  private readonly lang         = inject(LanguageService);
  private readonly fb           = inject(FormBuilder);
  private readonly emailService = inject(EmailCaptureService);

  readonly t           = computed(() => TRANSLATIONS[this.lang.current()].footer);
  readonly currentYear = new Date().getFullYear();

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    trap:  [''],
  });

  status = signal<EmailCaptureStatus>('idle');

  get emailCtrl() { return this.form.controls['email']; }

  onSubmit(): void {
    if (this.form.value['trap']) { this.status.set('success'); return; }
    if (this.form.invalid)       { this.form.markAllAsTouched(); return; }
    if (this.emailService.isRateLimited())      { this.status.set('rateLimit'); return; }
    if (this.emailService.hasAlreadySubmitted()) { this.status.set('duplicate'); return; }

    this.status.set('loading');
    this.emailService.submit({ email: this.form.value['email'] as string, source: 'footer' }).subscribe({
      next: () => { this.emailService.recordSubmission(); this.status.set('success'); this.form.reset(); },
      error: () => this.status.set('error'),
    });
  }
}
