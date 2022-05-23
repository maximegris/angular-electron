import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UvaTotalAqGraphCjsComponent } from './uva-total-aq-graph-cjs.component';

describe('UvaTotalAqGraphCjsComponent', () => {
  let component: UvaTotalAqGraphCjsComponent;
  let fixture: ComponentFixture<UvaTotalAqGraphCjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UvaTotalAqGraphCjsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UvaTotalAqGraphCjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
