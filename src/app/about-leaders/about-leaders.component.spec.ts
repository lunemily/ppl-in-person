import { Overlay } from '@angular/cdk/overlay';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AboutLeadersComponent } from './about-leaders.component';

describe('AboutLeadersComponent', () => {
  let component: AboutLeadersComponent;
  let fixture: ComponentFixture<AboutLeadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, MatSnackBar, Overlay],
      declarations: [AboutLeadersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutLeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
