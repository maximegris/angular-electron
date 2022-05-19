import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UvaConsumableMonitorComponent } from './uva-consumable-monitor.component';

describe('UvaConsumableMonitorComponent', () => {
  let component: UvaConsumableMonitorComponent;
  let fixture: ComponentFixture<UvaConsumableMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UvaConsumableMonitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UvaConsumableMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
