import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInWithRecoveryKeyComponent } from './log-in-with-recovery-key.component';

describe('LogInWithRecoveryKeyComponent', () => {
  let component: LogInWithRecoveryKeyComponent;
  let fixture: ComponentFixture<LogInWithRecoveryKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogInWithRecoveryKeyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogInWithRecoveryKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
