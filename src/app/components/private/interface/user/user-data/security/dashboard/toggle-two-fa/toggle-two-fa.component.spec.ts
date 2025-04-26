import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleTwoFaComponent } from './toggle-two-fa.component';

describe('ToggleTwoFaComponent', () => {
  let component: ToggleTwoFaComponent;
  let fixture: ComponentFixture<ToggleTwoFaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleTwoFaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleTwoFaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
