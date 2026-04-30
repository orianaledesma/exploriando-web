import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { UgcComponent } from './ugc.component';
import { UGC_COPY } from '../../copy/ugc.copy';

describe('UgcComponent', () => {
  let fixture: ComponentFixture<UgcComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UgcComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(UgcComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render section label', () => {
    const label = compiled.querySelector('.section-label');
    expect(label?.textContent?.trim()).toBe(UGC_COPY.sectionLabel);
  });

  it('should render headline', () => {
    const h2 = compiled.querySelector('h2');
    expect(h2?.textContent?.trim()).toBe(UGC_COPY.headline);
  });

  it('should render all packages', () => {
    const packages = compiled.querySelectorAll('.ugc__package');
    expect(packages.length).toBe(UGC_COPY.packages.length);
  });

  it('should render package names', () => {
    const names = compiled.querySelectorAll('.ugc__package-name');
    UGC_COPY.packages.forEach((pkg, i) => {
      expect(names[i]?.textContent?.trim()).toBe(pkg.name);
    });
  });

  it('should render package prices', () => {
    const prices = compiled.querySelectorAll('.ugc__package-price');
    UGC_COPY.packages.forEach((pkg, i) => {
      expect(prices[i]?.textContent?.trim()).toBe(pkg.price);
    });
  });

  it('should mark the middle package as featured', () => {
    const packages = compiled.querySelectorAll('.ugc__package');
    expect(packages[1]?.classList).toContain('ugc__package--featured');
    expect(packages[0]?.classList).not.toContain('ugc__package--featured');
    expect(packages[2]?.classList).not.toContain('ugc__package--featured');
  });

  it('should render CTA with mailto link', () => {
    const cta = compiled.querySelector<HTMLAnchorElement>('.ugc__cta a.btn');
    expect(cta?.getAttribute('href')).toBe('mailto:hola@exploriando.page');
    expect(cta?.textContent?.trim()).toBe(UGC_COPY.cta);
  });

  it('should have id for anchor navigation', () => {
    const section = compiled.querySelector('section');
    expect(section?.id).toBe('marcas');
  });

  it('should render include items for each package', () => {
    const packageEls = compiled.querySelectorAll('.ugc__package');
    UGC_COPY.packages.forEach((pkg, i) => {
      const items = packageEls[i]?.querySelectorAll('.ugc__include-item');
      expect(items?.length).toBe(pkg.includes.length);
    });
  });
});
