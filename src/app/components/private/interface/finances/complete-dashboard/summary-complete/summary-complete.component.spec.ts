import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryCompleteComponent } from './summary-complete.component';

describe('SummaryCompleteComponent', () => {
  let component: SummaryCompleteComponent;
  let fixture: ComponentFixture<SummaryCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryCompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
