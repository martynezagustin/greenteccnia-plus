import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspiciousLoginComponent } from './suspicious-login.component';

describe('SuspiciousLoginComponent', () => {
  let component: SuspiciousLoginComponent;
  let fixture: ComponentFixture<SuspiciousLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuspiciousLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspiciousLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
