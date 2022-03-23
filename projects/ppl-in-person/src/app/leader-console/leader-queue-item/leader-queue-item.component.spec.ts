import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderQueueItemComponent } from './leader-queue-item.component';

describe('LeaderQueueItemComponent', () => {
  let component: LeaderQueueItemComponent;
  let fixture: ComponentFixture<LeaderQueueItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderQueueItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderQueueItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
