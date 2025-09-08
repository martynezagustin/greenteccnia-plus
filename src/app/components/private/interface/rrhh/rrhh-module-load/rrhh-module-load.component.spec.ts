import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrhhModuleLoadComponent } from './rrhh-module-load.component';

describe('RrhhModuleLoadComponent', () => {
  let component: RrhhModuleLoadComponent;
  let fixture: ComponentFixture<RrhhModuleLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RrhhModuleLoadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RrhhModuleLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
