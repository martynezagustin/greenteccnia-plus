import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrhhSummaryComponent } from './rrhh-summary.component';

describe('RrhhSummaryComponent', () => {
  let component: RrhhSummaryComponent;
  let fixture: ComponentFixture<RrhhSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RrhhSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RrhhSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
