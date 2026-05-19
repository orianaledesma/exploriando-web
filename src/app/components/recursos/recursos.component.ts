import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { TRANSLATIONS } from '../../translations/translations';
import { RevealDirective } from '../../directives/reveal.directive';
import { LiteYoutubeComponent } from '../lite-youtube/lite-youtube.component';

/**
 * Recursos = prueba de valor de la guía gratuita. NO captura email acá
 * (decisión auditoría 2026-05-18: un solo punto de captura, el del Hero).
 * Muestra el índice real de la guía + el video que la explica; el CTA
 * scrollea al form del Hero.
 */
@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrl: './recursos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, LiteYoutubeComponent],
})
export class RecursosComponent {
  private readonly lang = inject(LanguageService);
  readonly t = computed(() => TRANSLATIONS[this.lang.current()].recursos);

  /** Video donde Oriana explica toda la guía (refuerza valor antes del CTA). */
  readonly guideVideoId = 'zBl6yboRr38';

  /**
   * Screens reales del índice de la guía, por idioma (PT usa el ES).
   * Es un array para soportar un carrusel a futuro sin tocar el template:
   * cuando Oriana sume más screens, se agregan acá.
   */
  readonly screens = computed<string[]>(() => {
    const lang = this.lang.current();
    const file = lang === 'en' ? 'guia_screen_en.png' : 'guia_screen_es.png';
    return [`/assets/content/guias/${file}`];
  });

  /** Scrollea al form de captura del Hero (único punto de captura). */
  scrollToHero(): void {
    const input = document.getElementById('hero-email');
    if (input) {
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      (input as HTMLInputElement).focus();
    }
  }
}
