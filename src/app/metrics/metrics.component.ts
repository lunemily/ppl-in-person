import { Metric } from '../models/metric';
import { DataService } from '../services/static-data.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
})
export class MetricsComponent implements OnInit {
  displayedColumns: string[] = ['displayName', 'wins', 'losses', 'matches', 'badgesAwarded'];
  metrics: Metric[];
  dataSource: MatTableDataSource<Metric>;

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getMetrics();
  }

  getMetrics() {
    this.dataService.getMetrics().subscribe((metrics) => {
      this.metrics = metrics;
      this.dataSource = new MatTableDataSource(metrics);
    });
  }
}
