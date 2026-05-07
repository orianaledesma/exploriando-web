import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { MarcasComponent } from './marcas.component';
import { AnalyticsService } from '../../services/analytics.service';

describe('MarcasComponent', () => {
  let fixture: ComponentFixture<MarcasComponent>;
  let trackSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcasComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MarcasComponent);
    trackSpy = spyOn(TestBed.inject(AnalyticsService), 'track');
    fixture.detectChanges();
  });

  it('crea el componente', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('trackea marcas_form_click con location=hero al clickear el CTA del hero', () => {
    const heroLink = fixture.debugElement.query(By.css('.marcas-hero a.btn--primary'));
    heroLink.triggerEventHandler('click', new MouseEvent('click'));

    expect(trackSpy).toHaveBeenCalledWith('marcas_form_click', { location: 'hero' });
  });

  it('trackea marcas_form_click con location=final_cta y location=package en sus respectivos botones', () => {
    const finalCtaLink = fixture.debugElement.query(By.css('.marcas-cta a.btn--primary'));
    finalCtaLink.triggerEventHandler('click', new MouseEvent('click'));
    expect(trackSpy).toHaveBeenCalledWith('marcas_form_click', { location: 'final_cta' });

    const packageLink = fixture.debugElement.query(By.css('.ugc__package a.btn--primary'));
    packageLink.triggerEventHandler('click', new MouseEvent('click'));

    const packageCall = trackSpy.calls.allArgs()
      .find(args => args[0] === 'marcas_form_click' && args[1].location === 'package');
    expect(packageCall).toBeTruthy();
    expect(packageCall![1].package).toBeTruthy();
  });
});
