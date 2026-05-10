import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostUsedClassificationsComponent } from './most-used-classifications.component';

describe('MostUsedClasificationComponent', () => {
  let component: MostUsedClassificationsComponent;
  let fixture: ComponentFixture<MostUsedClassificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostUsedClassificationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostUsedClassificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
