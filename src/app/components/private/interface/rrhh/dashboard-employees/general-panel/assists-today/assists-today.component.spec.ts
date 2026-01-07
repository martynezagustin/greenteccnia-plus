import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistsTodayComponent } from './assists-today.component';

describe('AssistsTodayComponent', () => {
  let component: AssistsTodayComponent;
  let fixture: ComponentFixture<AssistsTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistsTodayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistsTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
