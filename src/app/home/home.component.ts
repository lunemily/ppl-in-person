import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from '../services/header.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/static-data.service';
import { PPLSettings } from '../models/settings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loginId: string;
  showLogin: boolean;
  challengerId: string;
  pplSettings: PPLSettings;

  constructor(
    private cookieService: CookieService,
    private headerService: HeaderService,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['id']) {
      this.challengerId = this.route.snapshot.queryParamMap.get('id');
    }
    this.showLogin = true;
    this.loginId = this.cookieService.get('loginId');
    if (this.loginId) {
      this.showLogin = false;
    }
    this.headerService.setUrl(window.location.href);
    this.loadPPLSettings();
  }

  loadPPLSettings() {
    this.dataService.getPPLSettings().subscribe((pplSettings) => {
      this.pplSettings = pplSettings;
    });
  }
}
