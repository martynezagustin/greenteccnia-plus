import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCashFlowComponent } from './menu-cash-flow.component';

describe('MenuCashFlowComponent', () => {
  let component: MenuCashFlowComponent;
  let fixture: ComponentFixture<MenuCashFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuCashFlowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCashFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
