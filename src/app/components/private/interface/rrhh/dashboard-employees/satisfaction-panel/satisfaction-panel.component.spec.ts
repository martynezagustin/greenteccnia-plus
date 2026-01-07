import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisfactionPanelComponent } from './satisfaction-panel.component';

describe('SatisfactionPanelComponent', () => {
  let component: SatisfactionPanelComponent;
  let fixture: ComponentFixture<SatisfactionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SatisfactionPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SatisfactionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
