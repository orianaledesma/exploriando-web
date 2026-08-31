import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../directives/reveal.directive';
import { GUIA_PAGA_COPY_A } from '../../copy/guia-paga.copy';
import { EmailCaptureService } from '../../services/email-capture.service';
import { EmailCaptureStatus } from '../../models/email-capture.model';
import { LanguageService } from '../../services/language.service';

const HEYMONDO_URL =
  'https://heymondo.com/es?utm_medium=Afiliado&utm_source=EXPLORIANDO&utm_campaign=PRINCIPAL&cod_descuento=EXPLORIANDO&ag_campaign=EXPLORINADO&agencia=RXGocXNhwlEf9dfvWARvzOR3PxgEf1EDpXKFUVJa&redirect=TEMPORAL';

const REVOLUT_URL =
  'https://revolut.com/referral/?referral-code=oriledesma!SEP1-26-AR-H3&geo-redirect';

@Component({
  selector: 'app-guia',
  templateUrl: './guia.component.html',
  styleUrl: './guia.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RevealDirective, ReactiveFormsModule],
})
export class GuiaComponent implements OnInit {
  private readonly fb           = inject(FormBuilder);
  private readonly emailService = inject(EmailCaptureService);
  private readonly lang         = inject(LanguageService);

  readonly copy        = GUIA_PAGA_COPY_A;
  readonly heymondoUrl = HEYMONDO_URL;
  readonly revolutUrl  = REVOLUT_URL;

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    trap:  [''],
  });

  readonly status   = signal<EmailCaptureStatus>('idle');
  readonly unlocked = signal(false);

  get emailCtrl() { return this.form.controls['email']; }

  ngOnInit(): void {
    if (this.emailService.hasAlreadySubmitted()) {
      this.unlocked.set(true);
    }
  }

  onSubmit(): void {
    if (this.form.value['trap']) { this.unlocked.set(true); return; }
    if (this.form.invalid)       { this.form.markAllAsTouched(); return; }
    if (this.emailService.isRateLimited()) { this.status.set('rateLimit'); return; }

    this.status.set('loading');

    this.emailService
      .submit({ email: this.form.value['email'] as string, source: 'guia', lang: this.lang.current() })
      .subscribe({
        next: () => {
          this.emailService.recordSubmission();
          this.status.set('success');
          this.unlocked.set(true);
          this.form.reset();
        },
        error: () => this.status.set('error'),
      });
  }
}
