import { TestBed } from '@angular/core/testing';

import { ShowNavbarService } from './show-navbar.service';

describe('ShowNavbarService', () => {
  let service: ShowNavbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowNavbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
