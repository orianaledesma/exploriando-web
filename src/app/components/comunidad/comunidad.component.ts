import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { TRANSLATIONS } from '../../translations/translations';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.component.html',
  styleUrl: './comunidad.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
})
export class ComunidadComponent {
  private readonly lang = inject(LanguageService);
  readonly t = computed(() => TRANSLATIONS[this.lang.current()].comunidad);

  readonly liveLocalTime: string = (() => {
    try {
      const now = new Date();
      // Compute Vilnius UTC offset (accounts for DST automatically)
      const vilniusNow = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Vilnius' }));
      const utcNow     = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
      const vilniusOffsetMs = vilniusNow.getTime() - utcNow.getTime();
      // Build a UTC timestamp for 21:00 (9PM) today in Vilnius
      const vilnius9PM = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 21, 0, 0)
        - vilniusOffsetMs
      );
      // Fixed locale (not navigator.language): keeps server and client
      // render identical so SSG prerender doesn't trigger a hydration mismatch.
      return new Intl.DateTimeFormat('es', {
        hour:   'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(vilnius9PM);
    } catch {
      return '';
    }
  })();

  scrollToHero(): void {
    const input = document.getElementById('hero-email');
    if (input) {
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      (input as HTMLInputElement).focus();
    }
  }
}
