import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderHoldItemComponent } from './leader-hold-item.component';

describe('LeaderHoldItemComponent', () => {
  let component: LeaderHoldItemComponent;
  let fixture: ComponentFixture<LeaderHoldItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderHoldItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderHoldItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
