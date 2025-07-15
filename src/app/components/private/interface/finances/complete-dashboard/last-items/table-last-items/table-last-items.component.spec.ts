import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLastItemsComponent } from './table-last-items.component';

describe('TableLastItemsComponent', () => {
  let component: TableLastItemsComponent;
  let fixture: ComponentFixture<TableLastItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableLastItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableLastItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
