import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderBadgeComponent } from './leader-badge.component';

describe('LeaderBadgeComponent', () => {
  let component: LeaderBadgeComponent;
  let fixture: ComponentFixture<LeaderBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderBadgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
