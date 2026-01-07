import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsCompositionComponent } from './departments-composition.component';

describe('DepartmentsCompositionComponent', () => {
  let component: DepartmentsCompositionComponent;
  let fixture: ComponentFixture<DepartmentsCompositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentsCompositionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentsCompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
