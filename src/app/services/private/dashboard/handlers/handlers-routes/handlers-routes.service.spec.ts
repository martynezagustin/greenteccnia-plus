import { TestBed } from '@angular/core/testing';

import { HandlersRoutesService } from './handlers-routes.service';

describe('HandlersRoutesService', () => {
  let service: HandlersRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandlersRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
