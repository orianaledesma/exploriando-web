import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { DocumentacionService } from '../../services/documentacion.service';
import { DocumentacionResult, DocumentacionStatus } from '../../models/documentacion.model';
import { LanguageService } from '../../services/language.service';
import { TRANSLATIONS } from '../../translations/translations';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-documentacion',
  templateUrl: './documentacion.component.html',
  styleUrl: './documentacion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RevealDirective],
})
export class DocumentacionComponent {
  private readonly lang    = inject(LanguageService);
  private readonly fb      = inject(FormBuilder);
  private readonly service = inject(DocumentacionService);

  readonly t = computed(() => TRANSLATIONS[this.lang.current()].documentacion);

  form = this.fb.group({
    nationality:  ['', Validators.required],
    origin:       ['', Validators.required],
    destination:  ['', Validators.required],
    trap:         [''], // honeypot
  });

  private readonly formStatus = toSignal(this.form.statusChanges, {
    initialValue: this.form.status,
  });

  status  = signal<DocumentacionStatus>('idle');
  result  = signal<DocumentacionResult | null>(null);

  formReady = computed(() => this.formStatus() === 'VALID');
  isLoading = computed(() => this.status() === 'loading');

  onSubmit(): void {
    if (this.form.value['trap']) {
      this.status.set('success');
      return;
    }

    if (!this.formReady()) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.service.isRateLimited()) {
      this.status.set('rateLimit');
      return;
    }

    if (!navigator.onLine) {
      this.status.set('offline');
      return;
    }

    this.status.set('loading');
    this.result.set(null);

    const { nationality, origin, destination } = this.form.value as {
      nationality: string;
      origin: string;
      destination: string;
    };

    this.service.query({ nationality, origin, destination }).subscribe({
      next: (res) => {
        this.service.recordRequest();
        if (!res.documents.length && !res.migration.length) {
          this.status.set('no-data');
        } else {
          this.result.set(res);
          this.status.set('success');
        }
      },
      error: (err: unknown) => {
        this.status.set(this.service.isOfflineError(err) ? 'offline' : 'error');
      },
    });
  }

  retry(): void {
    this.status.set('idle');
    this.result.set(null);
  }
}
