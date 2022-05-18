import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UvaDeviceModeComponent } from './uva-device-mode.component';

describe('UvaDeviceModeComponent', () => {
  let component: UvaDeviceModeComponent;
  let fixture: ComponentFixture<UvaDeviceModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UvaDeviceModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UvaDeviceModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
