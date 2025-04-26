import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActiveComponent } from './add-active.component';

describe('AddActiveComponent', () => {
  let component: AddActiveComponent;
  let fixture: ComponentFixture<AddActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddActiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
