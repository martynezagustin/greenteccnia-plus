import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssistFastComponent } from './add-assist-fast.component';

describe('AddAssistFastComponent', () => {
  let component: AddAssistFastComponent;
  let fixture: ComponentFixture<AddAssistFastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAssistFastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAssistFastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
