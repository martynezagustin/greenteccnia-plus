import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustedDeviceComponent } from './trusted-device.component';

describe('TrustedDeviceComponent', () => {
  let component: TrustedDeviceComponent;
  let fixture: ComponentFixture<TrustedDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustedDeviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrustedDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
