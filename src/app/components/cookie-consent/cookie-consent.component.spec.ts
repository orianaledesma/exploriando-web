import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CookieConsentComponent } from './cookie-consent.component';
import { CookieConsentService } from '../../services/cookie-consent.service';

describe('CookieConsentComponent', () => {
  let fixture: ComponentFixture<CookieConsentComponent>;
  let component: CookieConsentComponent;
  let consent: CookieConsentService;

  beforeEach(async () => {
    localStorage.removeItem('exploriando_cookie_consent');
    await TestBed.configureTestingModule({
      imports: [CookieConsentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CookieConsentComponent);
    component = fixture.componentInstance;
    consent = TestBed.inject(CookieConsentService);
    fixture.detectChanges();
  });

  it('crea el componente', () => {
    expect(component).toBeTruthy();
  });

  it('muestra el banner cuando no hay decisión previa', () => {
    expect(component.visible()).toBe(true);
    expect(fixture.debugElement.query(By.css('.cookie-consent'))).toBeTruthy();
  });

  it('aceptar oculta el banner y persiste granted', () => {
    fixture.debugElement
      .query(By.css('.cookie-consent__btn--primary'))
      .triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();

    expect(component.visible()).toBe(false);
    expect(consent.status()).toBe('granted');
    expect(localStorage.getItem('exploriando_cookie_consent')).toBe('granted');
    expect(fixture.debugElement.query(By.css('.cookie-consent'))).toBeNull();
  });

  it('rechazar oculta el banner y persiste denied', () => {
    fixture.debugElement
      .query(By.css('.cookie-consent__btn--ghost'))
      .triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();

    expect(component.visible()).toBe(false);
    expect(consent.status()).toBe('denied');
    expect(localStorage.getItem('exploriando_cookie_consent')).toBe('denied');
  });
});
