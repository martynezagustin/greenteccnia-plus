import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositionItemsComponent } from './composition-items.component';

describe('CompositionItemsComponent', () => {
  let component: CompositionItemsComponent;
  let fixture: ComponentFixture<CompositionItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompositionItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompositionItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
