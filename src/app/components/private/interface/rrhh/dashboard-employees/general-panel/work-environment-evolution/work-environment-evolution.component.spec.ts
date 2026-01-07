import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkEnvironmentEvolutionComponent } from './work-environment-evolution.component';

describe('WorkEnvironmentEvolutionComponent', () => {
  let component: WorkEnvironmentEvolutionComponent;
  let fixture: ComponentFixture<WorkEnvironmentEvolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkEnvironmentEvolutionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkEnvironmentEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
