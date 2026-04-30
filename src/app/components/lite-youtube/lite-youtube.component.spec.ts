import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LiteYoutubeComponent } from './lite-youtube.component';

describe('LiteYoutubeComponent', () => {
  let fixture: ComponentFixture<LiteYoutubeComponent>;
  let component: LiteYoutubeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiteYoutubeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LiteYoutubeComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('videoId', 'abc123XYZ');
    fixture.componentRef.setInput('title', 'Test video');
    fixture.detectChanges();
  });

  it('renderiza el botón con thumbnail por default', () => {
    const poster = fixture.debugElement.query(By.css('.lite-youtube__poster'));
    expect(poster).toBeTruthy();
    expect(component.activated()).toBe(false);
  });

  it('thumbUrl apunta a i.ytimg.com con la calidad correcta', () => {
    expect(component.thumbUrl()).toBe('https://i.ytimg.com/vi/abc123XYZ/hqdefault.jpg');
  });

  it('iframeSrc usa youtube-nocookie y autoplay=1', () => {
    expect(component.iframeSrc()).toContain('youtube-nocookie.com/embed/abc123XYZ');
    expect(component.iframeSrc()).toContain('autoplay=1');
    expect(component.iframeSrc()).toContain('rel=0');
  });

  it('al hacer click en el poster, monta el iframe', () => {
    fixture.debugElement.query(By.css('.lite-youtube__poster')).nativeElement.click();
    fixture.detectChanges();

    expect(component.activated()).toBe(true);
    const iframe = fixture.debugElement.query(By.css('.lite-youtube__iframe'));
    expect(iframe).toBeTruthy();
    expect(iframe.nativeElement.getAttribute('title')).toBe('Test video');
  });

  it('aria-label del botón incluye el título del video', () => {
    const poster: HTMLButtonElement = fixture.debugElement.query(By.css('.lite-youtube__poster')).nativeElement;
    expect(poster.getAttribute('aria-label')).toBe('Reproducir video: Test video');
  });

  it('respeta thumbQuality=maxresdefault si se setea', () => {
    fixture.componentRef.setInput('thumbQuality', 'maxresdefault');
    fixture.detectChanges();
    expect(component.thumbUrl()).toContain('maxresdefault.jpg');
  });
});
