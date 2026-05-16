import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { CookieConsentComponent } from './components/cookie-consent/cookie-consent.component';
import { CookieConsentService } from './services/cookie-consent.service';
import { LanguageService } from './services/language.service';
import { TRANSLATIONS } from './translations/translations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, NavComponent, FooterComponent, CookieConsentComponent],
})
export class AppComponent {
  private readonly lang = inject(LanguageService);

  readonly t = computed(() => TRANSLATIONS[this.lang.current()].a11y);

  constructor() {
    // Re-apply a previously granted choice so GA4 consent is restored.
    inject(CookieConsentService).applyStoredConsent();
  }
}
