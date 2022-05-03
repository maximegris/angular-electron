import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTreatmentViewComponent } from './dynamic-treatment-view.component';

describe('DynamicTreatmentViewComponent', () => {
  let component: DynamicTreatmentViewComponent;
  let fixture: ComponentFixture<DynamicTreatmentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicTreatmentViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTreatmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
