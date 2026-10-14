import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { By } from '@angular/platform-browser';
import { provideTestRouter } from '../../testing/router';
import { ApoyoComponent } from './apoyo.component';
import { LanguageService } from '../../services/language.service';
import { AnalyticsService } from '../../services/analytics.service';
import { TRANSLATIONS } from '../../translations/translations';
import { CAFECITO_URL, PAYPAL_URL } from '../../data/links';

const COPY = TRANSLATIONS.es.apoyo;

describe('ApoyoComponent', () => {
    let fixture: ComponentFixture<ApoyoComponent>;
    let compiled: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ApoyoComponent],
            providers: [provideTestRouter()],
        }).compileComponents();

        TestBed.inject(LanguageService).set('es');

        fixture = TestBed.createComponent(ApoyoComponent);
        fixture.detectChanges();
        compiled = fixture.nativeElement as HTMLElement;
    });

    it('should render the hero headline as the only h1, without eyebrow', () => {
        expect(compiled.querySelector('.apoyo-hero .section-label')).toBeNull();
        const h1s = compiled.querySelectorAll('h1');
        expect(h1s.length).toBe(1);
        expect(h1s[0].textContent?.trim()).toBe(COPY.hero.headline);
    });

    it('should render the four goal banners in order under a single title', () => {
        const alts = [...compiled.querySelectorAll<HTMLImageElement>('.apoyo-card img')]
            .map((img) => img.alt);
        expect(alts).toEqual([
            COPY.goals.ingredientes.imageAlt,
            COPY.goals.yerba.imageAlt,
            COPY.goals.set.imageAlt,
            COPY.goals.otro.imageAlt,
        ]);
        const titles = compiled.querySelectorAll('h2');
        expect(titles.length).toBe(1);
        expect(titles[0].textContent?.trim()).toBe(COPY.paypalCta);
        expect(compiled.querySelector('.apoyo-card h3')).toBeNull();
    });

    it('should send the fixed-amount goals to PayPal with the amount in the URL', () => {
        const ctas = compiled.querySelectorAll<HTMLAnchorElement>('.apoyo-card__cta');
        expect(ctas.length).toBe(4);
        expect([...ctas].slice(0, 3).map((a) => a.getAttribute('href'))).toEqual([
            `${PAYPAL_URL}/7USD`,
            `${PAYPAL_URL}/14USD`,
            `${PAYPAL_URL}/20USD`,
        ]);
        expect(ctas[0].textContent?.trim()).toBe(`${COPY.give} USD 7`);
        ctas.forEach((a) => {
            expect(a.target).toBe('_blank');
            expect(a.rel).toContain('noopener');
        });
    });

    it('should build the last link from the typed amount', () => {
        const input = compiled.querySelector<HTMLInputElement>('#apoyo-monto')!;
        const cta = () => compiled.querySelectorAll<HTMLAnchorElement>('.apoyo-card__cta')[3];

        expect(cta().getAttribute('href')).toBe(PAYPAL_URL);
        expect(cta().textContent?.trim()).toBe(COPY.give);

        input.value = '15';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(cta().getAttribute('href')).toBe(`${PAYPAL_URL}/15USD`);
        expect(cta().textContent?.trim()).toBe(`${COPY.give} USD 15`);
    });

    it('should drop invalid amounts back to the plain PayPal link', () => {
        const component = fixture.componentInstance;
        for (const value of ['', '0', '-5', 'abc', '5000']) {
            component.onCustomAmountInput(value);
            expect(component.customUrl(), `monto: '${value}'`).toBe(PAYPAL_URL);
        }
        component.onCustomAmountInput('12.7');
        expect(component.customUrl()).toBe(`${PAYPAL_URL}/12USD`);
    });

    it('should link Cafecito as a separate option', () => {
        const cafecito = compiled.querySelector<HTMLAnchorElement>('.apoyo-cafecito a');
        expect(cafecito?.getAttribute('href')).toBe(CAFECITO_URL);
        expect(cafecito?.textContent).toContain(COPY.cafecito.cta);
    });

    it('should track the chosen goal and payment method', () => {
        const trackSpy = vi.spyOn(TestBed.inject(AnalyticsService), 'track').mockReturnValue(undefined);
        fixture.debugElement
            .queryAll(By.css('.apoyo-card__cta'))[1]
            .triggerEventHandler('click', new MouseEvent('click'));
        expect(trackSpy).toHaveBeenCalledWith('apoyo_click', { destino: 'yerba', medio: 'paypal', monto: 14 });
    });

    it('should set its own title and translate on language change', () => {
        expect(TestBed.inject(Title).getTitle()).toBe(COPY.meta.title);

        TestBed.inject(LanguageService).set('en');
        fixture.detectChanges();
        expect(compiled.querySelector('h1')?.textContent?.trim())
            .toBe(TRANSLATIONS.en.apoyo.hero.headline);
        expect(TestBed.inject(Title).getTitle()).toBe(TRANSLATIONS.en.apoyo.meta.title);
    });
});
