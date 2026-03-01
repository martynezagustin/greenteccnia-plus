import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardObjectivesComponent } from './dashboard-objectives.component';

describe('DashboardObjectivesComponent', () => {
  let component: DashboardObjectivesComponent;
  let fixture: ComponentFixture<DashboardObjectivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardObjectivesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardObjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
