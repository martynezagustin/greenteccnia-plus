import { TestBed } from '@angular/core/testing';

import { RecoveryKeyService } from './recovery-key.service';

describe('RecoveryKeyService', () => {
  let service: RecoveryKeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecoveryKeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
