import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastObjectiveInfoComponent } from './last-objective-info.component';

describe('LastObjectiveInfoComponent', () => {
  let component: LastObjectiveInfoComponent;
  let fixture: ComponentFixture<LastObjectiveInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastObjectiveInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastObjectiveInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
