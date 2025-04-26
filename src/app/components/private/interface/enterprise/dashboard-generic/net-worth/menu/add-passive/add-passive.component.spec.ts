import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPassiveComponent } from './add-passive.component';

describe('AddPassiveComponent', () => {
  let component: AddPassiveComponent;
  let fixture: ComponentFixture<AddPassiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPassiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPassiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
