import { TestBed } from '@angular/core/testing';

import { ConsumptionKwhService } from './consumption-kwh.service';

describe('ConsumptionKwhService', () => {
  let service: ConsumptionKwhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumptionKwhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
