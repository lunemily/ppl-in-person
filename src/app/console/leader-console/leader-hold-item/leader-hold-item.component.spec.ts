import { Overlay } from '@angular/cdk/overlay';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LeaderHoldItemComponent } from './leader-hold-item.component';

describe('LeaderHoldItemComponent', () => {
  let component: LeaderHoldItemComponent;
  let fixture: ComponentFixture<LeaderHoldItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, MatSnackBar, Overlay],
      declarations: [LeaderHoldItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderHoldItemComponent);
    component = fixture.componentInstance;
    component.hold = {
      displayName: 'First Last',
    };
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
