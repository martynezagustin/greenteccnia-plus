import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSustainableObjectivesComponent } from './add-sustainable-objectives.component';

describe('AddSustainableObjectivesComponent', () => {
  let component: AddSustainableObjectivesComponent;
  let fixture: ComponentFixture<AddSustainableObjectivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSustainableObjectivesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSustainableObjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
