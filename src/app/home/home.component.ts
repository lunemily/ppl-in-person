import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Challenger } from '../models/challenger';
import { Leader } from '../models/leader';
import { DataService } from '../services/static-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Input() leader: Leader;
  @Input() challenger: Challenger;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.fetchLeaderData().subscribe((data) => {
      console.log('Leader data:');
      console.log(data);
      return data;
    });
  }
}
