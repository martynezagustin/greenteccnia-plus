import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCctComponent } from './add-cct.component';

describe('AddCctComponent', () => {
  let component: AddCctComponent;
  let fixture: ComponentFixture<AddCctComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCctComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
