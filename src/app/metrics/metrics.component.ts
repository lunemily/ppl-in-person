import { Component, OnInit } from '@angular/core';
import { Metric } from '../models/metric';
import { DataService } from '../services/static-data.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
})
export class MetricsComponent implements OnInit {
  metrics: Metric[];
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.dataService.getMetrics().subscribe((metrics) => {
      this.metrics = metrics;
      console.log(metrics);
    });
  }
}
