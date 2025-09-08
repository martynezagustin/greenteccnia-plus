import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistsComponent } from './assists.component';

describe('AssistsComponent', () => {
  let component: AssistsComponent;
  let fixture: ComponentFixture<AssistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
