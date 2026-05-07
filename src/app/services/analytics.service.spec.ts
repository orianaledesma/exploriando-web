import { TestBed } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { AnalyticsService, setupRouterPageviews } from './analytics.service';

describe('AnalyticsService', () => {
  let svc: AnalyticsService;
  let originalGtag: Window['gtag'];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    svc = TestBed.inject(AnalyticsService);
    originalGtag = window.gtag;
  });

  afterEach(() => {
    window.gtag = originalGtag;
  });

  describe('track()', () => {
    it('llama a window.gtag con event + name + params', () => {
      const spy = jasmine.createSpy('gtag');
      window.gtag = spy;

      svc.track('country_card_click', { country_code: 'ARG' });

      expect(spy).toHaveBeenCalledOnceWith('event', 'country_card_click', { country_code: 'ARG' });
    });

    it('usa params vacío por default si no se pasan', () => {
      const spy = jasmine.createSpy('gtag');
      window.gtag = spy;

      svc.track('mapa_cta_click');

      expect(spy).toHaveBeenCalledOnceWith('event', 'mapa_cta_click', {});
    });

    it('es no-op si window.gtag no está definido', () => {
      window.gtag = undefined;

      expect(() => svc.track('marker_click', { country_code: 'ARG', city_slug: 'mendoza' }))
        .not.toThrow();
    });

    it('no propaga errores si gtag tira', () => {
      window.gtag = (() => { throw new Error('boom'); }) as Window['gtag'];

      expect(() => svc.track('country_list_click', { country_code: 'COL' })).not.toThrow();
    });
  });

  describe('trackPageView()', () => {
    it('dispara page_view con page_path, page_title y page_location', () => {
      const spy = jasmine.createSpy('gtag');
      window.gtag = spy;

      svc.trackPageView('/mapa/argentina', 'Argentina · Exploriando');

      expect(spy).toHaveBeenCalledOnceWith('event', 'page_view', {
        page_path:     '/mapa/argentina',
        page_title:    'Argentina · Exploriando',
        page_location: window.location.href,
      });
    });

    it('usa document.title si no se pasa title', () => {
      const spy = jasmine.createSpy('gtag');
      window.gtag = spy;

      svc.trackPageView('/');

      const args = spy.calls.mostRecent().args;
      expect(args[2].page_title).toBe(document.title);
    });

    it('es no-op si gtag no está disponible', () => {
      window.gtag = undefined;
      expect(() => svc.trackPageView('/mapa')).not.toThrow();
    });
  });
});

describe('setupRouterPageviews()', () => {
  it('dispara trackPageView con urlAfterRedirects en cada NavigationEnd', () => {
    const events$ = new Subject<NavigationEnd>();
    const fakeRouter = { events: events$.asObservable() } as unknown as Router;
    const analytics = new AnalyticsService();
    const spy = spyOn(analytics, 'trackPageView');

    setupRouterPageviews(fakeRouter, analytics);

    events$.next(new NavigationEnd(1, '/mapa', '/mapa/argentina'));
    events$.next(new NavigationEnd(2, '/recursos', '/recursos'));

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith('/mapa/argentina');
    expect(spy).toHaveBeenCalledWith('/recursos');
  });

  it('ignora eventos del Router que no son NavigationEnd', () => {
    const events$ = new Subject<unknown>();
    const fakeRouter = { events: events$.asObservable() } as unknown as Router;
    const analytics = new AnalyticsService();
    const spy = spyOn(analytics, 'trackPageView');

    setupRouterPageviews(fakeRouter, analytics);

    events$.next({ id: 1, url: '/mapa' });  // NavigationStart-like
    events$.next({ type: 'GuardsCheckEnd' });

    expect(spy).not.toHaveBeenCalled();
  });
});
