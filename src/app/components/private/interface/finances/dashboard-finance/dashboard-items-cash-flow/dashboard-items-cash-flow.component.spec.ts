import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardItemsCashFlowComponent } from './dashboard-items-cash-flow.component';

describe('DashboardItemsCashFlowComponent', () => {
  let component: DashboardItemsCashFlowComponent;
  let fixture: ComponentFixture<DashboardItemsCashFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardItemsCashFlowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardItemsCashFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
