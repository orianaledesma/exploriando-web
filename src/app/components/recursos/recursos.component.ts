import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailCaptureService, GIFT_DRIVE_URL } from '../../services/email-capture.service';
import { EmailCaptureStatus } from '../../models/email-capture.model';
import { LanguageService } from '../../services/language.service';
import { TRANSLATIONS } from '../../translations/translations';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrl: './recursos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RevealDirective],
})
export class RecursosComponent implements OnInit {
  private readonly lang         = inject(LanguageService);
  private readonly fb           = inject(FormBuilder);
  private readonly emailService = inject(EmailCaptureService);

  readonly t       = computed(() => TRANSLATIONS[this.lang.current()].recursos);
  readonly giftUrl = GIFT_DRIVE_URL;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    trap:  [''],
  });

  status        = signal<EmailCaptureStatus>('idle');
  alreadyJoined = signal(false);

  get emailCtrl() { return this.form.controls['email']; }

  ngOnInit(): void {
    if (this.emailService.hasAlreadySubmitted()) {
      this.alreadyJoined.set(true);
    }
  }

  onSubmit(): void {
    if (this.form.value['trap']) { this.status.set('success'); return; }
    if (this.form.invalid)       { this.form.markAllAsTouched(); return; }
    if (this.emailService.isRateLimited()) { this.status.set('rateLimit'); return; }

    this.status.set('loading');

    this.emailService.submit({ email: this.form.value['email'] as string, source: 'recursos' }).subscribe({
      next: () => {
        this.emailService.recordSubmission();
        this.status.set('success');
        this.form.reset();
      },
      error: () => this.status.set('error'),
    });
  }
}
