import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';
import { BestMonthsGridComponent } from './best-months-grid.component';
import { LanguageService } from '../../services/language.service';
import { Lang } from '../../models/language.model';

class LanguageServiceStub {
  current = signal<Lang>('es');
}

describe('BestMonthsGridComponent', () => {
  let fixture: ComponentFixture<BestMonthsGridComponent>;
  let component: BestMonthsGridComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestMonthsGridComponent],
      providers: [{ provide: LanguageService, useClass: LanguageServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(BestMonthsGridComponent);
    component = fixture.componentInstance;
  });

  it('muestra el placeholder "Mejor época: por confirmar" si no hay meses', () => {
    fixture.componentRef.setInput('months', []);
    fixture.detectChanges();

    const empty = fixture.debugElement.query(By.css('.months__empty'));
    expect(empty).toBeTruthy();
    expect(empty.nativeElement.textContent).toContain('por confirmar');
  });

  it('renderiza 12 celdas cuando hay meses', () => {
    fixture.componentRef.setInput('months', [3, 4, 5]);
    fixture.detectChanges();

    const cells = fixture.debugElement.queryAll(By.css('.months__cell'));
    expect(cells.length).toBe(12);
  });

  it('marca como --active sólo los meses recomendados', () => {
    fixture.componentRef.setInput('months', [1, 6, 12]);
    fixture.detectChanges();

    const activeCells = fixture.debugElement.queryAll(By.css('.months__cell--active'));
    expect(activeCells.length).toBe(3);
  });

  it('cada celda tiene aria-label con el nombre completo del mes', () => {
    fixture.componentRef.setInput('months', [1]);
    fixture.detectChanges();

    const first = fixture.debugElement.queryAll(By.css('.months__cell'))[0];
    expect(first.nativeElement.getAttribute('aria-label')).toBe('Enero');
  });

  it('hasActive devuelve true cuando hay meses', () => {
    fixture.componentRef.setInput('months', [5]);
    fixture.detectChanges();
    expect(component.hasActive()).toBe(true);
  });

  it('hasActive devuelve false cuando no hay meses', () => {
    fixture.componentRef.setInput('months', []);
    fixture.detectChanges();
    expect(component.hasActive()).toBe(false);
  });
});
