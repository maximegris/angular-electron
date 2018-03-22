import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicingComponent } from './invoicing.component';

describe('InvoicingComponent', () => {
  let component: InvoicingComponent;
  let fixture: ComponentFixture<InvoicingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
