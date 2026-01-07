import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSatisfactionEmployeesComponent } from './top-satisfaction-employees.component';

describe('TopSatisfactionEmployeesComponent', () => {
  let component: TopSatisfactionEmployeesComponent;
  let fixture: ComponentFixture<TopSatisfactionEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopSatisfactionEmployeesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopSatisfactionEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
