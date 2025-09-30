import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPrivacityComponent } from './dashboard-privacity.component';

describe('DashboardPrivacityComponent', () => {
  let component: DashboardPrivacityComponent;
  let fixture: ComponentFixture<DashboardPrivacityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPrivacityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPrivacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
