import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralPanelComponent } from './general-panel.component';

describe('GeneralPanelComponent', () => {
  let component: GeneralPanelComponent;
  let fixture: ComponentFixture<GeneralPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
