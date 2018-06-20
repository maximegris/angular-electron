import { TestBed, inject } from '@angular/core/testing';

import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdersService]
    });
  });

  it('should be created', inject([OrdersService], (service: OrdersService) => {
    expect(service).toBeTruthy();
  }));
});
