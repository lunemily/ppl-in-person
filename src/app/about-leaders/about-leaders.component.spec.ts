import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutLeadersComponent } from './about-leaders.component';

describe('AboutLeadersComponent', () => {
  let component: AboutLeadersComponent;
  let fixture: ComponentFixture<AboutLeadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutLeadersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutLeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
