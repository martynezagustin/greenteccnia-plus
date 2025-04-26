import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationsAccomplishedComponent } from './certifications-accomplished.component';

describe('CertificationsAccomplishedComponent', () => {
  let component: CertificationsAccomplishedComponent;
  let fixture: ComponentFixture<CertificationsAccomplishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificationsAccomplishedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificationsAccomplishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
