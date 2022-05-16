import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UvaAqGraphComponent } from './uva-aq-graph.component';

describe('UvaAqGraphComponent', () => {
  let component: UvaAqGraphComponent;
  let fixture: ComponentFixture<UvaAqGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UvaAqGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UvaAqGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
