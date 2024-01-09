import { Overlay } from '@angular/cdk/overlay';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { ChallengerConsoleComponent } from './challenger-console.component';

describe('ChallengerConsoleComponent', () => {
  let component: ChallengerConsoleComponent;
  let fixture: ComponentFixture<ChallengerConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [MatDialog, Overlay],
      declarations: [ChallengerConsoleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengerConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
