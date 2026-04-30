import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { LanguageService } from '../../services/language.service';

interface MonthCell {
  index: number;       // 1..12
  short: string;       // 'E', 'F', 'M'...
  long:  string;       // 'Enero', 'Febrero', ...
  active: boolean;
}

const MONTHS_LABELS: Record<string, { short: string[]; long: string[] }> = {
  es: {
    short: ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    long:  ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  },
  en: {
    short: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    long:  ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'],
  },
  pt: {
    short: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    long:  ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  },
};

/**
 * Grilla visual de 12 meses — los meses pasados en `months` se resaltan
 * en accent color. Diseñado para mostrar la "mejor época" para visitar
 * un destino. Si `months` está vacío, muestra los 12 meses en gris.
 */
@Component({
  selector: 'app-best-months-grid',
  templateUrl: './best-months-grid.component.html',
  styleUrl: './best-months-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BestMonthsGridComponent {
  private readonly lang = inject(LanguageService);

  /** Meses recomendados: 1=Enero ... 12=Diciembre. */
  readonly months = input<number[]>([]);

  readonly cells = computed<MonthCell[]>(() => {
    const labels = MONTHS_LABELS[this.lang.current()] ?? MONTHS_LABELS['es'];
    const active = new Set(this.months());
    return Array.from({ length: 12 }, (_, i) => ({
      index:  i + 1,
      short:  labels.short[i],
      long:   labels.long[i],
      active: active.has(i + 1),
    }));
  });

  /** True si hay al menos un mes seleccionado. */
  readonly hasActive = computed(() => this.months().length > 0);
}
