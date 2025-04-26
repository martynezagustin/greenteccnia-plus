import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmChangesTwoFaComponent } from './confirm-changes-two-fa.component';

describe('ConfirmChangesTwoFaComponent', () => {
  let component: ConfirmChangesTwoFaComponent;
  let fixture: ComponentFixture<ConfirmChangesTwoFaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmChangesTwoFaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmChangesTwoFaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
