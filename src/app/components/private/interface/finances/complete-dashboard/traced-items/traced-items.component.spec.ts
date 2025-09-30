import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracedItemsComponent } from './traced-items.component';

describe('TracedItemsComponent', () => {
  let component: TracedItemsComponent;
  let fixture: ComponentFixture<TracedItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TracedItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TracedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
