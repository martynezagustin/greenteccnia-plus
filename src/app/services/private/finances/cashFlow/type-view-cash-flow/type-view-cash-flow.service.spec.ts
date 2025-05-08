import { TestBed } from '@angular/core/testing';

import { TypeViewCashFlowService } from './type-view-cash-flow.service';

describe('TypeViewCashFlowService', () => {
  let service: TypeViewCashFlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeViewCashFlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
