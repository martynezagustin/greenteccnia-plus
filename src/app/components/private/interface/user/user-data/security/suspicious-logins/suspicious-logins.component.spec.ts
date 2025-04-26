import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspiciousLoginsComponent } from './suspicious-logins.component';

describe('SuspiciousLoginsComponent', () => {
  let component: SuspiciousLoginsComponent;
  let fixture: ComponentFixture<SuspiciousLoginsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuspiciousLoginsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspiciousLoginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
