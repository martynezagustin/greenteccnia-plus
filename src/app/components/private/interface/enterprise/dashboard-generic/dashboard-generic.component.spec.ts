import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGenericComponent } from './dashboard-generic.component';

describe('DashboardGenericComponent', () => {
  let component: DashboardGenericComponent;
  let fixture: ComponentFixture<DashboardGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardGenericComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
