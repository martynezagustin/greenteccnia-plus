import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeGreenteccniaComponent } from './welcome-greenteccnia.component';

describe('WelcomeGreenteccniaComponent', () => {
  let component: WelcomeGreenteccniaComponent;
  let fixture: ComponentFixture<WelcomeGreenteccniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeGreenteccniaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeGreenteccniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
