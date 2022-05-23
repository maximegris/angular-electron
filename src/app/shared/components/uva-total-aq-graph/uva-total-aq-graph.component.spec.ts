import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UvaTotalAqGraphComponent } from './uva-total-aq-graph.component';

describe('UvaTotalAqGraphComponent', () => {
  let component: UvaTotalAqGraphComponent;
  let fixture: ComponentFixture<UvaTotalAqGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UvaTotalAqGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UvaTotalAqGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
