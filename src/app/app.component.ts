import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor() {}

  ngOnInit(): void {
    // this.dataService.fetchLeaderData().subscribe((data) => {
    //   console.log('Leader data:');
    //   console.log(data);
    //   return data;
    // });
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
  }
}
