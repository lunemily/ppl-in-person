import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { Login } from '../models/login';
import { MatSnackBar } from '@angular/material/snack-bar';

import { api } from '../constants.data';
import { DataService } from './static-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private dataService: DataService, private snackBar: MatSnackBar) {}

  httpOptions = {
    headers: api.httpOtions.headers.append('Content-Type', 'application/json'),
  };

  login(username: string, password: string): void {
    this.loginOrRegister(username, password, 'login');
  }

  register(username: string, password: string): void {
    this.loginOrRegister(username, password, 'register');
  }

  loginOrRegister(username: string, password: string, endpoint: string): void {
    const url = `${api.serverUrl}/api/v2/${endpoint}`;

    const authorization: string = btoa(username + ':' + password);
    const httpOptions = {
      headers: api.httpOtions.headers.append('Authorization', `Basic ${authorization}`),
    };

    // BEGIN: real data
    this.http.post<Login>(url, null, httpOptions).subscribe(
      (data) => {
        const login: Login = {
          loginId: data.loginId,
          leaderId: data.leaderId ? data.leaderId : null,
          isLeader: data.isLeader,
          token: data.token,
        };
        this.dataService.setLoginId(login.loginId);
        this.dataService.setIsLeader(login.isLeader);
        this.dataService.setToken(login.token);
        if (login.isLeader) {
          this.dataService.setLeaderId(login.leaderId);
        }
        window.location.reload();
      },
      (error) => {
        console.error(error);
        this.snackBar.open(error.error.error, 'Dismiss', {
          duration: 2000,
        });
      },
    );
  }

  logout(): void {
    // Get id and token
    const id = this.dataService.getLoginId();
    const httpOptions = {
      headers: api.httpOtions.headers.append('Authorization', `Bearer ${this.dataService.getToken()}`),
    };
    const url = `${api.serverUrl}/api/v2/logout/${id}`;

    // Delete cookies for local logout
    this.dataService.clearCookies();

    // Log out of idp
    this.http.post<any>(url, {}, httpOptions).subscribe((data) => {
      window.location.reload();
    });
  }
}
