import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loginId: string;
  showLogin: boolean;

  constructor(private cookieService: CookieService, private headerService: HeaderService) {}

  ngOnInit(): void {
    this.showLogin = true;
    this.loginId = this.cookieService.get('loginId');
    if (this.loginId) {
      this.showLogin = false;
    }
    this.headerService.setUrl(window.location.href);
  }
}
