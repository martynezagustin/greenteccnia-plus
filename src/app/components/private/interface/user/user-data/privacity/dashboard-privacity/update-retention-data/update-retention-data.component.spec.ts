import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRetentionDataComponent } from './update-retention-data.component';

describe('UpdateRetentionDataComponent', () => {
  let component: UpdateRetentionDataComponent;
  let fixture: ComponentFixture<UpdateRetentionDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateRetentionDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRetentionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
