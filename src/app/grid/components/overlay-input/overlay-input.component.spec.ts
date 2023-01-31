import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayInputComponent } from './overlay-input.component';

describe('OverlayInputComponent', () => {
  let component: OverlayInputComponent;
  let fixture: ComponentFixture<OverlayInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverlayInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverlayInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
