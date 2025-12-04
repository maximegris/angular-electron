import {TestBed, waitForAsync} from '@angular/core/testing';

import { ElectronService } from './electron.service';

describe('ElectronService', () => {
  beforeEach(waitForAsync(() => TestBed.configureTestingModule({})));

  it('should be created', () => {
    const service: ElectronService = TestBed.inject(ElectronService);
    expect(service).toBeTruthy();
  });
});
