import { Component, OnInit, Input } from '@angular/core';
import { Badge } from '../badge';

@Component({
  selector: 'app-leader-row',
  templateUrl: './leader-row.component.html',
  styleUrls: ['./leader-row.component.css']
})
export class LeaderRowComponent implements OnInit {
  @Input() leader: Badge;


  constructor() { }

  ngOnInit(): void {
    console.log(this.leader.type);
  }

}
