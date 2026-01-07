import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageSatisfactionComponent } from './average-satisfaction.component';

describe('AverageSatisfactionComponent', () => {
  let component: AverageSatisfactionComponent;
  let fixture: ComponentFixture<AverageSatisfactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AverageSatisfactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AverageSatisfactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
