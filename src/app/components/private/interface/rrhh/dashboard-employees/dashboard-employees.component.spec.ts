import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmployeesComponent } from './dashboard-employees.component';

describe('DashboardEmployeesComponent', () => {
  let component: DashboardEmployeesComponent;
  let fixture: ComponentFixture<DashboardEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEmployeesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
