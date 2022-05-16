import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UvaTopNavComponent } from './uva-top-nav.component';

describe('UvaTopNavComponent', () => {
  let component: UvaTopNavComponent;
  let fixture: ComponentFixture<UvaTopNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UvaTopNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UvaTopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
