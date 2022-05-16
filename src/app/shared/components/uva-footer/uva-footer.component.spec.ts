import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UvaFooterComponent } from './uva-footer.component';

describe('UvaFooterComponent', () => {
  let component: UvaFooterComponent;
  let fixture: ComponentFixture<UvaFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UvaFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UvaFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
