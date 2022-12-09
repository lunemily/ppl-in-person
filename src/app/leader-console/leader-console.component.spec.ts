import { Overlay } from '@angular/cdk/overlay';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { LeaderConsoleComponent } from './leader-console.component';

describe('LeaderConsoleComponent', () => {
  let component: LeaderConsoleComponent;
  let fixture: ComponentFixture<LeaderConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [MatDialog, Overlay],
      declarations: [LeaderConsoleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
