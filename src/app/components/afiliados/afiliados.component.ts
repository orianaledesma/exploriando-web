import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { AFILIADOS_COPY_A, AfiliadoCard } from '../../copy/afiliados.copy';
import { withUtm } from '../../data/affiliate';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-afiliados',
  templateUrl: './afiliados.component.html',
  styleUrl: './afiliados.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
})
export class AfiliadosComponent {
  private readonly analytics = inject(AnalyticsService);

  readonly copy  = AFILIADOS_COPY_A;
  readonly cards: AfiliadoCard[] = AFILIADOS_COPY_A.cards;

  /** Final outbound URL with consistent UTM tagging. */
  affiliateUrl(card: AfiliadoCard): string {
    return withUtm(card.ctaUrl, card.id);
  }

  /** Tracking: outbound click to an affiliate partner. */
  onAffiliateClick(card: AfiliadoCard): void {
    this.analytics.track('affiliate_click', { partner: card.id });
  }
}
