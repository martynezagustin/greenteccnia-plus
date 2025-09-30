import { TestBed } from '@angular/core/testing';

import { InactivityPeriodService } from './inactivity-period.service';

describe('InactivityPeriodService', () => {
  let service: InactivityPeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InactivityPeriodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
