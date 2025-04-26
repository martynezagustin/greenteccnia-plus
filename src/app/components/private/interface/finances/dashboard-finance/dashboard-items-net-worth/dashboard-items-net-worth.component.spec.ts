import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardItemsNetWorthComponent } from './dashboard-items-net-worth.component';

describe('DashboardItemsNetWorthComponent', () => {
  let component: DashboardItemsNetWorthComponent;
  let fixture: ComponentFixture<DashboardItemsNetWorthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardItemsNetWorthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardItemsNetWorthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
