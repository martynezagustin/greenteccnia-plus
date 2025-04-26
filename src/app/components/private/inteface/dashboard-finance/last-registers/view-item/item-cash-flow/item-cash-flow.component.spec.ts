import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCashFlowComponent } from './item-cash-flow.component';

describe('ItemCashFlowComponent', () => {
  let component: ItemCashFlowComponent;
  let fixture: ComponentFixture<ItemCashFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCashFlowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCashFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
