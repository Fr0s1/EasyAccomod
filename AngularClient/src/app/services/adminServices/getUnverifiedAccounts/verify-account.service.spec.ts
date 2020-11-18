import { TestBed } from '@angular/core/testing';

import { VerifyAccountService } from './verify-account.service';

describe('VerifyAccountService', () => {
  let service: VerifyAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
