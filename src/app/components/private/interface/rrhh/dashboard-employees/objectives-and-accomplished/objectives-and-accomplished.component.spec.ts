import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectivesAndAccomplishedComponent } from './objectives-and-accomplished.component';

describe('ObjectivesAndAccomplishedComponent', () => {
  let component: ObjectivesAndAccomplishedComponent;
  let fixture: ComponentFixture<ObjectivesAndAccomplishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectivesAndAccomplishedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectivesAndAccomplishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
