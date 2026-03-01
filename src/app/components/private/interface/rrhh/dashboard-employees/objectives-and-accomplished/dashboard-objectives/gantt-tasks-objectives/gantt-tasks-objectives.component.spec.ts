import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttTasksObjectivesComponent } from './gantt-tasks-objectives.component';

describe('GanttTasksObjectivesComponent', () => {
  let component: GanttTasksObjectivesComponent;
  let fixture: ComponentFixture<GanttTasksObjectivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GanttTasksObjectivesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GanttTasksObjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
