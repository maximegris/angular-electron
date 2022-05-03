import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallServiceViewComponent } from './install-service-view.component';

describe('InstallServiceViewComponent', () => {
  let component: InstallServiceViewComponent;
  let fixture: ComponentFixture<InstallServiceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallServiceViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallServiceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
