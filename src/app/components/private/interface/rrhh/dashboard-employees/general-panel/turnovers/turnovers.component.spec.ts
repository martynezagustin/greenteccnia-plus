import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoversComponent } from './turnovers.component';

describe('TurnoversComponent', () => {
  let component: TurnoversComponent;
  let fixture: ComponentFixture<TurnoversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnoversComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
