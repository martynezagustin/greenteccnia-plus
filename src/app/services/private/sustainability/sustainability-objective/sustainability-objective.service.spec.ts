import { TestBed } from '@angular/core/testing';

import { SustainabilityObjectiveService } from './sustainability-objective.service';

describe('SustainabilityObjectivesService', () => {
  let service: SustainabilityObjectiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SustainabilityObjectiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
