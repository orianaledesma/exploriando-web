import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { TRANSLATIONS } from '../../translations/translations';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, NgOptimizedImage],
})
export class AboutComponent {
  private readonly lang = inject(LanguageService);
  readonly t = computed(() => TRANSLATIONS[this.lang.current()].about);
}
