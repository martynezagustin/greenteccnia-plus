import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalEmployeesComponent } from './total-employees.component';

describe('TotalEmployeesComponent', () => {
  let component: TotalEmployeesComponent;
  let fixture: ComponentFixture<TotalEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalEmployeesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
