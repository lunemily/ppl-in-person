import { Overlay } from '@angular/cdk/overlay';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ChallengerSearchComponent } from './challenger-search.component';

describe('ChallengerSearchComponent', () => {
  let component: ChallengerSearchComponent;
  let fixture: ComponentFixture<ChallengerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ChallengerSearchComponent],
    providers: [HttpClient, HttpHandler, MatSnackBar, Overlay],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
