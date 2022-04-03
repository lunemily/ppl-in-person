import { Component, OnInit } from '@angular/core';
import { Credential } from './credential'
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../services/authentication.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isLogin: boolean
  isRegister: boolean
  credentials: Credential
  hide = true;

  constructor(
    private authenticationService: AuthenticationService,
    private cookieService: CookieService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.showLogin()
    this.credentials = {
      username: "",
      password: "",
      confirmPassword: "",
    }
  }

  login(): void {
    console.log(this.credentials);
    this.authenticationService.login(this.credentials.username, this.credentials.password);
  }

  register(): void {
    // Verify password and confirmPassword are equal
    if (this.credentials.password === this.credentials.confirmPassword) {
      this.authenticationService.login(this.credentials.username, this.credentials.password);
    } else {
      this.messageService.add("Passwords do not match.");
    }
  }

  logout(): void {
    this.cookieService.deleteAll();
  }

  showLogin(): void {
    this.isLogin = true;
    this.isRegister = false;
  }

  showRegister(): void {
    this.isLogin = false;
    this.isRegister = true;
  }

}
