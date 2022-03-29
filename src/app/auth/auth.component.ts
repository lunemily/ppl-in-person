import { Component, OnInit } from '@angular/core';
import { Credential } from './credential'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  showLogin: boolean
  showRegister: boolean
  credentials: Credential
  hide = true;

  constructor() { }

  ngOnInit(): void {
    this.showLogin = true;
    this.showRegister = false;
    this.credentials = {
      username: "",
      password: "",
      confirmPassword: "",
    }
  }

  login(): void {
    console.log(this.credentials)
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
