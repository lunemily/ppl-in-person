import { Component, Input, OnInit } from '@angular/core';
import { Credential } from './credential';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../../services/authentication.service';
import { MessageService } from '../../services/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../services/static-data.service';
import { MatTabGroup } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    standalone: true,
    imports: [
        MatCardModule,
        NgIf,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
})
export class AuthComponent implements OnInit {
  isLogin: boolean;
  isRegister: boolean;
  credentials: Credential;
  hide = true;
  win: string;
  badge: string;
  report: boolean;
  @Input() tabGroup: MatTabGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private cookieService: CookieService,
    private dataService: DataService,
    private messageService: MessageService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.showLogin();
    this.credentials = {
      username: '',
      password: '',
      confirmPassword: '',
    };
  }

  login(): void {
    this.authenticationService.login(this.credentials.username, this.credentials.password);
  }

  register(): void {
    // Verify password and confirmPassword are equal
    if (this.credentials.password === this.credentials.confirmPassword) {
      this.authenticationService.register(this.credentials.username, this.credentials.password);
    } else {
      this.snackBar.open('Error: Passwords to not match.', 'Dismiss', {
        duration: 2000,
      });
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

  goToHowToTab(): void {
    this.tabGroup.selectedIndex = 2;
  }
}
