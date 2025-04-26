import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormToRescuePasswordComponent } from './form-to-rescue-password.component';

describe('FormToRescuePasswordComponent', () => {
  let component: FormToRescuePasswordComponent;
  let fixture: ComponentFixture<FormToRescuePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormToRescuePasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormToRescuePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
