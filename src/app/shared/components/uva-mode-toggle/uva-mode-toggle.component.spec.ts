import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UvaModeToggleComponent } from './uva-mode-toggle.component';

describe('UvaModeToggleComponent', () => {
  let component: UvaModeToggleComponent;
  let fixture: ComponentFixture<UvaModeToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UvaModeToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UvaModeToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
