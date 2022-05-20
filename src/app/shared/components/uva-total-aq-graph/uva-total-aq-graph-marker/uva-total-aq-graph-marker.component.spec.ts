import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UvaTotalAqGraphMarkerComponent } from './uva-total-aq-graph-marker.component';

describe('UvaTotalAqGraphMarkerComponent', () => {
  let component: UvaTotalAqGraphMarkerComponent;
  let fixture: ComponentFixture<UvaTotalAqGraphMarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UvaTotalAqGraphMarkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UvaTotalAqGraphMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
