import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { LeaderQueueItemComponent } from './leader-queue-item.component';

describe('LeaderQueueItemComponent', () => {
  let component: LeaderQueueItemComponent;
  let fixture: ComponentFixture<LeaderQueueItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MatDialog, Overlay],
      declarations: [LeaderQueueItemComponent],
    }).compileComponents();
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
