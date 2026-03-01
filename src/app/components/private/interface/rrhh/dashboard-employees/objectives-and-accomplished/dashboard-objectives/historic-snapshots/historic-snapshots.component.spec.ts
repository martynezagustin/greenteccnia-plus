import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricSnapshotsComponent } from './historic-snapshots.component';

describe('HistoricSnapshotsComponent', () => {
  let component: HistoricSnapshotsComponent;
  let fixture: ComponentFixture<HistoricSnapshotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricSnapshotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricSnapshotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
