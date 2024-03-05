import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetupTimesComponent } from './meetup-times.component';

describe('MeetupTimesComponent', () => {
  let component: MeetupTimesComponent;
  let fixture: ComponentFixture<MeetupTimesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetupTimesComponent]
    });
    fixture = TestBed.createComponent(MeetupTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
