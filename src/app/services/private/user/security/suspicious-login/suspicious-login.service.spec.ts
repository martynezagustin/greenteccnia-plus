import { TestBed } from '@angular/core/testing';

import { SuspiciousLoginService } from './suspicious-login.service';

describe('SuspiciousLoginService', () => {
  let service: SuspiciousLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuspiciousLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
