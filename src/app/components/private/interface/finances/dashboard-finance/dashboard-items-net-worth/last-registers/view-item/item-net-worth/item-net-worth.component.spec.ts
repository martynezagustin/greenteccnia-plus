import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemNetWorthComponent } from './item-net-worth.component';

describe('ItemNetWorthComponent', () => {
  let component: ItemNetWorthComponent;
  let fixture: ComponentFixture<ItemNetWorthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemNetWorthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemNetWorthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
