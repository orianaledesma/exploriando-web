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

  it('al hacer click en el poster, monta el iframe con src seguro', () => {
    fixture.debugElement.query(By.css('.lite-youtube__poster')).nativeElement.click();
    fixture.detectChanges();

    expect(component.activated()).toBe(true);
    const iframe = fixture.debugElement.query(By.css('.lite-youtube__iframe'));
    expect(iframe).toBeTruthy();
    expect(iframe.nativeElement.getAttribute('title')).toBe('Test video');

    const src = iframe.nativeElement.getAttribute('src') as string;
    expect(src).toContain('youtube-nocookie.com/embed/abc123XYZ');
    expect(src).toContain('autoplay=1');
    expect(src).toContain('rel=0');
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
