import { ErrorHandler } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ExceptionHandlerService } from './exception-handler.service';

describe('ExceptionHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExceptionHandlerService = TestBed.get(ErrorHandler);
    expect(service).toBeTruthy();
  });
});
