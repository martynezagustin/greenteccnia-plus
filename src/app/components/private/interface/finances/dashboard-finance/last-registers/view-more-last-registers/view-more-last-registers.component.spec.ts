import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMoreLastRegistersComponent } from './view-more-last-registers.component';

describe('ViewMoreLastRegistersComponent', () => {
  let component: ViewMoreLastRegistersComponent;
  let fixture: ComponentFixture<ViewMoreLastRegistersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMoreLastRegistersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMoreLastRegistersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
