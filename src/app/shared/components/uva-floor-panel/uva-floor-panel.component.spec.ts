import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UvaFloorPanelComponent } from './uva-floor-panel.component';

describe('UvaFloorPanelComponent', () => {
  let component: UvaFloorPanelComponent;
  let fixture: ComponentFixture<UvaFloorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UvaFloorPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UvaFloorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
