import { Component, Input, OnInit } from '@angular/core';
import { Queue } from '../../models/queue';

@Component({
  selector: 'app-queue-item',
  templateUrl: './queue-item.component.html',
  styleUrls: ['./queue-item.component.css']
})
export class QueueItemComponent implements OnInit {
  @Input() queue: Queue;

  constructor() { }

  ngOnInit(): void {
  }

}
