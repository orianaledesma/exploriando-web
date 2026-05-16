import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CookieConsentService } from '../../services/cookie-consent.service';
import { LanguageService } from '../../services/language.service';
import { TRANSLATIONS } from '../../translations/translations';

/**
 * GDPR cookie banner. Visible only until the user accepts/rejects.
 * Analytics stays denied (Consent Mode v2) until "Accept".
 */
@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieConsentComponent {
  private readonly consent = inject(CookieConsentService);
  private readonly lang = inject(LanguageService);

  readonly t = computed(() => TRANSLATIONS[this.lang.current()].cookieConsent);
  readonly visible = this.consent.needsDecision;

  accept(): void {
    this.consent.accept();
  }

  reject(): void {
    this.consent.reject();
  }
}
