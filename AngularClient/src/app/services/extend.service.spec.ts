import { TestBed } from '@angular/core/testing';

import { ExtendService } from './extend.service';

describe('ExtendService', () => {
  let service: ExtendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
