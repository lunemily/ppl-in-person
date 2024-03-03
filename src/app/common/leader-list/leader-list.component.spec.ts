import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderListComponent } from './leader-list.component';

describe('LeaderListComponent', () => {
  let component: LeaderListComponent;
  let fixture: ComponentFixture<LeaderListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaderListComponent]
    });
    fixture = TestBed.createComponent(LeaderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
