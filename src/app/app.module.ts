import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ClipboardModule } from '@angular/cdk/clipboard';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule, } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { NgQrScannerModule } from 'angular2-qrscanner';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QRCodeModule } from 'angularx-qrcode';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LeaderConsoleComponent } from './leader-console/leader-console.component';
import { LeaderQueueItemComponent, ReportBattleDialog } from './leader-console/leader-queue-item/leader-queue-item.component'
import { ChallengerConsoleComponent, ChallengerSetNameDialog } from './challenger-console/challenger-console.component';
import { QueueItemComponent } from './challenger-console/queue-item/queue-item.component';
import { BadgeItemComponent } from './challenger-console/badge-item/badge-item.component';
import { LeaderHoldItemComponent } from './leader-console/leader-hold-item/leader-hold-item.component';
import { CameraComponent } from './camera/camera.component';
import { AuthComponent } from './auth/auth.component';

import { CookieService } from 'ngx-cookie-service';
import { ChallengerSearchComponent } from './challenger-search/challenger-search.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    LeaderConsoleComponent,
    LeaderQueueItemComponent,
    ReportBattleDialog,
    ChallengerConsoleComponent,
    ChallengerSetNameDialog,
    QueueItemComponent,
    BadgeItemComponent,
    LeaderHoldItemComponent,
    CameraComponent,
    AuthComponent,
    ChallengerSearchComponent,
  ],
  imports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ClipboardModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgQrScannerModule,
    QRCodeModule,
    ZXingScannerModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
