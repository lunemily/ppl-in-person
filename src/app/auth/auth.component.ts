import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  showLogin: boolean
  showRegister: boolean

  constructor() { }

  ngOnInit(): void {
    this.showLogin = true;
    this.showRegister = false;
  }

  login(): void {
  }

  register(): void {
  }

  startLogin(): void {
    this.showLogin = true;
    this.showRegister = false;
  }

  startRegister(): void {
    this.showLogin = false;
    this.showRegister = true;
  }

}
