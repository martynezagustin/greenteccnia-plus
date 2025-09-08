import { TestBed } from '@angular/core/testing';

import { SyndicatesService } from './syndicates.service';

describe('SyndicatesService', () => {
  let service: SyndicatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyndicatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
