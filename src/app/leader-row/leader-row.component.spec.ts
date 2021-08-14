import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderRowComponent } from './leader-row.component';

describe('LeaderRowComponent', () => {
  let component: LeaderRowComponent;
  let fixture: ComponentFixture<LeaderRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
