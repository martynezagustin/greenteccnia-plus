import { TestBed } from '@angular/core/testing';

import { AssistsService } from './assists.service';

describe('AssistsService', () => {
  let service: AssistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
