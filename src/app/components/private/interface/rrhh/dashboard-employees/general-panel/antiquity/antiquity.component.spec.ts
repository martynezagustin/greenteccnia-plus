import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiquityComponent } from './antiquity.component';

describe('AntiquityComponent', () => {
  let component: AntiquityComponent;
  let fixture: ComponentFixture<AntiquityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AntiquityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AntiquityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
