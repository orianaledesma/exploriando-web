import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTestRouter } from '../../testing/router';
import { By } from '@angular/platform-browser';
import { ApoyoTeaserComponent } from './apoyo-teaser.component';
import { LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';
import { TRANSLATIONS } from '../../translations/translations';

const COPY = TRANSLATIONS.es.apoyo.teaser;

describe('ApoyoTeaserComponent', () => {
    let fixture: ComponentFixture<ApoyoTeaserComponent>;
    let compiled: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ApoyoTeaserComponent],
            providers: [provideTestRouter()],
        }).compileComponents();

        TestBed.inject(LanguageService).set('es');

        fixture = TestBed.createComponent(ApoyoTeaserComponent);
        fixture.detectChanges();
        compiled = fixture.nativeElement as HTMLElement;
    });

    it('should render section label and headline', () => {
        expect(compiled.querySelector('.section-label')?.textContent?.trim())
            .toBe(COPY.sectionLabel);
        expect(compiled.querySelector('h2')?.textContent?.trim())
            .toBe(COPY.headline);
    });

    it('should render CTA pointing to /apoyo', () => {
        const cta = compiled.querySelector<HTMLAnchorElement>('a.btn');
        expect(cta?.getAttribute('href')).toBe('/apoyo');
        expect(cta?.textContent?.trim()).toContain(COPY.cta);
    });

    it('should track on CTA click', () => {
        const trackSpy = vi.spyOn(TestBed.inject(AnalyticsService), 'track').mockReturnValue(undefined);
        fixture.debugElement
            .query(By.css('a.btn'))
            .triggerEventHandler('click', new MouseEvent('click'));
        expect(trackSpy).toHaveBeenCalledWith('apoyo_teaser_click');
    });

    it('should have id for anchor navigation', () => {
        expect(compiled.querySelector('section')?.id).toBe('apoyo');
    });
});
