import { TestBed } from '@angular/core/testing';

import { DashboardViewService } from './dashboard-view.service';

describe('DashboardViewService', () => {
  let service: DashboardViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
