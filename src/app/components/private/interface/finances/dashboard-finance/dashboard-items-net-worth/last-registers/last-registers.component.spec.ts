import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastRegistersComponent } from './last-registers.component';

describe('LastRegistersComponent', () => {
  let component: LastRegistersComponent;
  let fixture: ComponentFixture<LastRegistersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastRegistersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastRegistersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
