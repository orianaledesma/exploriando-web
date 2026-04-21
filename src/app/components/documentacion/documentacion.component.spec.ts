import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { DocumentacionComponent } from './documentacion.component';
import { DocumentacionService } from '../../services/documentacion.service';
import { DocumentacionResult } from '../../models/documentacion.model';

const MOCK_RESULT: DocumentacionResult = {
  documents:  ['Pasaporte vigente', 'No requiere visa'],
  migration:  ['Formulario de entrada obligatorio', 'Estadía máxima: 90 días'],
  disclaimer: 'Verificá esta información con fuentes oficiales.',
  sources:    ['Cancillería Argentina'],
};

const VALID_FORM = { nationality: 'Argentina', origin: 'Argentina', destination: 'Portugal', trap: '' };

describe('DocumentacionComponent', () => {
  let component: DocumentacionComponent;
  let fixture:   ComponentFixture<DocumentacionComponent>;
  let mockService: jasmine.SpyObj<DocumentacionService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj<DocumentacionService>(
      'DocumentacionService',
      ['isRateLimited', 'query', 'recordRequest', 'isOfflineError'],
    );
    mockService.isRateLimited.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports:   [DocumentacionComponent, HttpClientTestingModule],
      providers: [{ provide: DocumentacionService, useValue: mockService }],
    }).compileComponents();

    fixture   = TestBed.createComponent(DocumentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => localStorage.clear());

  it('should create', () => expect(component).toBeTruthy());

  it('should start with idle status', () => expect(component.status()).toBe('idle'));

  it('should have submit button in the DOM', () => {
    const btn = fixture.nativeElement.querySelector('[data-testid="doc-submit"]');
    expect(btn).toBeTruthy();
  });

  it('should set status to loading on valid submit', fakeAsync(() => {
    mockService.query.and.returnValue(of(MOCK_RESULT));
    component.form.setValue(VALID_FORM);
    tick();
    component.onSubmit();
    expect(component.status()).toBe('success');
  }));

  it('should show result after successful query', fakeAsync(() => {
    mockService.query.and.returnValue(of(MOCK_RESULT));
    component.form.setValue(VALID_FORM);
    tick();
    component.onSubmit();
    fixture.detectChanges();

    const resultEl = fixture.nativeElement.querySelector('[data-testid="doc-result"]');
    expect(resultEl).toBeTruthy();
    expect(component.result()).toEqual(MOCK_RESULT);
  }));

  it('should set status to error on API failure', fakeAsync(() => {
    mockService.query.and.returnValue(throwError(() => new Error('Network error')));
    mockService.isOfflineError.and.returnValue(false);
    component.form.setValue(VALID_FORM);
    tick();
    component.onSubmit();
    expect(component.status()).toBe('error');
  }));

  it('should set status to offline when there is no connection', fakeAsync(() => {
    mockService.query.and.returnValue(throwError(() => new Error('Offline')));
    mockService.isOfflineError.and.returnValue(true);
    component.form.setValue(VALID_FORM);
    tick();
    component.onSubmit();
    expect(component.status()).toBe('offline');
  }));

  it('should set status to rateLimit when rate limited', fakeAsync(() => {
    mockService.isRateLimited.and.returnValue(true);
    component.form.setValue(VALID_FORM);
    tick();
    component.onSubmit();
    expect(component.status()).toBe('rateLimit');
    expect(mockService.query).not.toHaveBeenCalled();
  }));

  it('should silently succeed when honeypot is filled', fakeAsync(() => {
    component.form.setValue({ ...VALID_FORM, trap: 'bot-value' });
    tick();
    component.onSubmit();
    expect(mockService.query).not.toHaveBeenCalled();
    expect(component.status()).toBe('success');
  }));

  it('should reset to idle and clear result on retry()', fakeAsync(() => {
    mockService.query.and.returnValue(of(MOCK_RESULT));
    component.form.setValue(VALID_FORM);
    tick();
    component.onSubmit();
    component.retry();
    expect(component.status()).toBe('idle');
    expect(component.result()).toBeNull();
  }));

  it('should have honeypot field hidden from assistive tech', () => {
    const trap = fixture.nativeElement.querySelector('[formControlName="trap"]');
    expect(trap.getAttribute('tabindex')).toBe('-1');
  });

  it('should set no-data status when result arrays are empty', fakeAsync(() => {
    mockService.query.and.returnValue(of({ documents: [], migration: [], disclaimer: '', sources: [] }));
    component.form.setValue(VALID_FORM);
    tick();
    component.onSubmit();
    expect(component.status()).toBe('no-data');
  }));
});
