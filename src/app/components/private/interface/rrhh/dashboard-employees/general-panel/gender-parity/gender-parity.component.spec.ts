import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderParityComponent } from './gender-parity.component';

describe('GenderParityComponent', () => {
  let component: GenderParityComponent;
  let fixture: ComponentFixture<GenderParityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenderParityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenderParityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
