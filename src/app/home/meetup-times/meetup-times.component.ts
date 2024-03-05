import { Component, OnInit } from '@angular/core';
import { PPLSettings, meetupTime } from 'src/app/models/settings';
import { DataService } from 'src/app/services/static-data.service';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-meetup-times',
  templateUrl: './meetup-times.component.html',
  styleUrls: ['./meetup-times.component.scss'],
})
export class MeetupTimesComponent implements OnInit {
  showMeetupBanner: boolean = false;
  meetupMessage: string = 'Learn about our meetup times!';

  constructor(private dialog: MatDialog, private dataService: DataService) {}

  ngOnInit(): void {
    this.checkShowBanner();
  }

  checkShowBanner() {
    let now = new Date().getTime();
    this.dataService.getPPLSettings().subscribe((pplSettings) => {
      pplSettings.meetupTimes.map((meetupTime) => {
        // Show banner up to 15 minutes prior
        if (meetupTime.startTime - 15 * 60 * 1000 < now && now < meetupTime.endTime) {
          this.showMeetupBanner = true;
          this.meetupMessage = "There's a meetup soon! Click to learn more.";
          if (meetupTime.startTime < now) {
            this.meetupMessage = "There's a meetup happening! Click to learn more.";
          }
        }
      });
    });
  }

  openMeetupPopup() {
    this.dialog.open(MeetupPopup, { width: '250px' });
  }
}

@Component({
  selector: 'meetup-popup',
  templateUrl: 'meetup-popup.component.html',
  styleUrls: ['meetup-popup.component.scss'],
})
export class MeetupPopup implements OnInit {
  pplSettings: PPLSettings;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getPPLSettings().subscribe((settings) => {
      this.pplSettings = settings;
    });
  }

  getHumanReadableTimeSpan(meetup: meetupTime): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let startDatetime: Date = new Date(meetup.startTime);
    let endDateTime: Date = new Date(meetup.endTime);
    let startDay: string = days[startDatetime.getDay()];
    return `${startDay} ${startDatetime.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })}-${endDateTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
  }
}
