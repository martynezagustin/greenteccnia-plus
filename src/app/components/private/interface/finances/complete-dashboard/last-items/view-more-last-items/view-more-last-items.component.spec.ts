import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMoreLastItemsComponent } from './view-more-last-items.component';

describe('ViewMoreLastItemsComponent', () => {
  let component: ViewMoreLastItemsComponent;
  let fixture: ComponentFixture<ViewMoreLastItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMoreLastItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMoreLastItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
