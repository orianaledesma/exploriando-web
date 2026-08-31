import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailCaptureService } from '../../services/email-capture.service';
import { EmailCaptureStatus } from '../../models/email-capture.model';
import { LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';
import { TRANSLATIONS } from '../../translations/translations';
import { RevealDirective } from '../../directives/reveal.directive';

/**
 * Modo del bloque. Cambiar esta constante es TODO lo necesario para pasar de
 * lista de espera a venta: en 'venta' se rinde la grilla de guías (título,
 * destino, precio, botón de compra) y desaparece el formulario. Los datos de
 * las guías ya viven en `guiasPremium.guias` de las traducciones.
 */
const MODO: 'waitlist' | 'venta' = 'waitlist';

/**
 * Guías premium de pago. Hermana de la sección del mapa, que sigue siendo
 * 100% gratis. Hoy publicada en modo lista de espera: las guías todavía no
 * están a la venta, así que no se muestran precios ni botones de compra.
 *
 * El alta usa la MISMA lista de MailerLite que el resto de la página; lo que
 * la distingue es `source: 'guias-premium'`, que viaja como campo custom y
 * permite segmentar a los interesados.
 */
@Component({
  selector: 'app-guias-premium',
  templateUrl: './guias-premium.component.html',
  styleUrl: './guias-premium.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RevealDirective],
})
export class GuiasPremiumComponent {
  private readonly lang         = inject(LanguageService);
  private readonly fb           = inject(FormBuilder);
  private readonly emailService = inject(EmailCaptureService);
  private readonly analytics    = inject(AnalyticsService);

  readonly t = computed(() => TRANSLATIONS[this.lang.current()].guiasPremium);

  readonly enVenta = MODO === 'venta';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    trap:  [''],
  });

  status = signal<EmailCaptureStatus>('idle');

  get emailCtrl() { return this.form.controls['email']; }

  onSubmit(): void {
    if (this.form.value['trap']) { this.status.set('success'); return; }
    if (this.form.invalid)       { this.form.markAllAsTouched(); return; }
    if (this.emailService.isRateLimited())                      { this.status.set('rateLimit'); return; }
    if (this.emailService.hasAlreadySubmitted('guias-premium')) { this.status.set('duplicate'); return; }

    this.status.set('loading');
    this.emailService
      .submit({ email: this.form.value['email'] as string, source: 'guias-premium', lang: this.lang.current() })
      .subscribe({
        next: () => {
          this.emailService.recordSubmission();
          this.status.set('success');
          this.form.reset();
        },
        error: () => this.status.set('error'),
      });
  }

  onBuyClick(guia: string): void {
    this.analytics.track('guias_premium_click', { guia });
  }
}
