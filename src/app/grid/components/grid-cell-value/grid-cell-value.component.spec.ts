import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCellValueComponent } from './grid-cell-value.component';

describe('GridCellValueComponent', () => {
  let component: GridCellValueComponent;
  let fixture: ComponentFixture<GridCellValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridCellValueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridCellValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
