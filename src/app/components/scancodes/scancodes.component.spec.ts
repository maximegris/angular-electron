import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScancodesComponent } from './scancodes.component';

describe('ScancodesComponent', () => {
  let component: ScancodesComponent;
  let fixture: ComponentFixture<ScancodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScancodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScancodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
