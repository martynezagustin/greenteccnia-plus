import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLastObjectiveProgressComponent } from './card-last-objective-progress.component';

describe('CardLastObjectiveProgressComponent', () => {
  let component: CardLastObjectiveProgressComponent;
  let fixture: ComponentFixture<CardLastObjectiveProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardLastObjectiveProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardLastObjectiveProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
