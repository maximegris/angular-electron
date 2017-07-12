import { TestBed, inject } from '@angular/core/testing';

import { FreelancerService } from './freelancer.service';

describe('FreelancerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FreelancerService]
    });
  });

  it('should be created', inject([FreelancerService], (service: FreelancerService) => {
    expect(service).toBeTruthy();
  }));
});
