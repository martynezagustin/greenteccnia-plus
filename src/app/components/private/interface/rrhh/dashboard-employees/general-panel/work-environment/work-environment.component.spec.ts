import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkEnvironmentComponent } from './work-environment.component';

describe('WorkEnvironmentComponent', () => {
  let component: WorkEnvironmentComponent;
  let fixture: ComponentFixture<WorkEnvironmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkEnvironmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
