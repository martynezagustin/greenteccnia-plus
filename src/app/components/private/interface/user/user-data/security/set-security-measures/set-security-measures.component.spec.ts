import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetSecurityMeasuresComponent } from './set-security-measures.component';

describe('SetSecurityMeasuresComponent', () => {
  let component: SetSecurityMeasuresComponent;
  let fixture: ComponentFixture<SetSecurityMeasuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetSecurityMeasuresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetSecurityMeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
