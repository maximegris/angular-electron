import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UvaEnviroControlPanelComponent } from './uva-enviro-control-panel.component';

describe('UvaEnviroControlPanelComponent', () => {
  let component: UvaEnviroControlPanelComponent;
  let fixture: ComponentFixture<UvaEnviroControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UvaEnviroControlPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UvaEnviroControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
