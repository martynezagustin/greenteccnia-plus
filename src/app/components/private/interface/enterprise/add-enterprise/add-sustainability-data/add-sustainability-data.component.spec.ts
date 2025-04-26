import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSustainabilityDataComponent } from './add-sustainability-data.component';

describe('AddSustainabilityDataComponent', () => {
  let component: AddSustainabilityDataComponent;
  let fixture: ComponentFixture<AddSustainabilityDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSustainabilityDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSustainabilityDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
