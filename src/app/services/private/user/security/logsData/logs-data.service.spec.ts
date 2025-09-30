import { TestBed } from '@angular/core/testing';

import { LogsDataService } from './logs-data.service';

describe('LogsDataService', () => {
  let service: LogsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
