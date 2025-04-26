import { TestBed } from '@angular/core/testing';

import { PassiveService } from './passive.service';

describe('PassiveService', () => {
  let service: PassiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
