import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsAndAuditoryComponent } from './logs-and-auditory.component';

describe('LogsAndAuditoryComponent', () => {
  let component: LogsAndAuditoryComponent;
  let fixture: ComponentFixture<LogsAndAuditoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogsAndAuditoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogsAndAuditoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
