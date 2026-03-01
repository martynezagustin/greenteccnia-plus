import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClasificationComponent } from './create-clasification.component';

describe('CreateClasificationComponent', () => {
  let component: CreateClasificationComponent;
  let fixture: ComponentFixture<CreateClasificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateClasificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateClasificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
