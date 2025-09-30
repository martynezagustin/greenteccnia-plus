import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordAndRecoveryComponent } from './password-and-recovery.component';

describe('PasswordAndRecoveryComponent', () => {
  let component: PasswordAndRecoveryComponent;
  let fixture: ComponentFixture<PasswordAndRecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordAndRecoveryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordAndRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
