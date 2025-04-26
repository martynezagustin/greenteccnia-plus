import { TestBed } from '@angular/core/testing';

import { TypeViewNetWorthService } from './type-view-net-worth.service';

describe('TypeViewNetWorthService', () => {
  let service: TypeViewNetWorthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeViewNetWorthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
