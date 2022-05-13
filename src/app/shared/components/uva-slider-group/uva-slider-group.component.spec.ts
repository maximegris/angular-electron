import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UvaSliderGroupComponent } from './uva-slider-group.component';

describe('UvaSliderGroupComponent', () => {
  let component: UvaSliderGroupComponent;
  let fixture: ComponentFixture<UvaSliderGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UvaSliderGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UvaSliderGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
