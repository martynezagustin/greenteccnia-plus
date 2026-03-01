import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddObjectiveComponent } from './form-add-objective.component';

describe('FormAddObjectiveComponent', () => {
  let component: FormAddObjectiveComponent;
  let fixture: ComponentFixture<FormAddObjectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddObjectiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddObjectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
