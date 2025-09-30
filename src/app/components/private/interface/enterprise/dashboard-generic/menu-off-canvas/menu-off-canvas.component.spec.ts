import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOffCanvasComponent } from './menu-off-canvas.component';

describe('MenuOffCanvasComponent', () => {
  let component: MenuOffCanvasComponent;
  let fixture: ComponentFixture<MenuOffCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuOffCanvasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuOffCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
