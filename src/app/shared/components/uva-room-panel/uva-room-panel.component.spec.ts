import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UvaRoomPanelComponent } from './uva-room-panel.component';

describe('UvaRoomPanelComponent', () => {
  let component: UvaRoomPanelComponent;
  let fixture: ComponentFixture<UvaRoomPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UvaRoomPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UvaRoomPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
