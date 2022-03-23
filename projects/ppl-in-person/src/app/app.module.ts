import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  OAuthModule,
  OAuthStorage,
  DateTimeProvider,
} from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';

// Angular Material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule, } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { BASE_URL } from './app.tokens';
import { HomeComponent } from './home/home.component';
// import { CustomDateTimeProvider } from './shared/date/custom-date-time-provider';
import { RouterModule, ExtraOptions } from '@angular/router';
import { useHash } from '../flags';

// PPL Components
import { HeaderComponent } from './header/header.component';
import { ChallengerConsoleComponent, ChallengerSetNameDialog } from './challenger-console/challenger-console.component';
import { QueueItemComponent } from './challenger-console/queue-item/queue-item.component';
import { BadgeItemComponent } from './challenger-console/badge-item/badge-item.component';
import { LeaderConsoleComponent } from './leader-console/leader-console.component';
import { LeaderQueueItemComponent, ReportBattleDialog } from './leader-console/leader-queue-item/leader-queue-item.component'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://www.angular.at/api'],
        sendAccessToken: true,
      },
    }),
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTES, { useHash }),
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ChallengerConsoleComponent,
    ChallengerSetNameDialog,
    QueueItemComponent,
    BadgeItemComponent,
    LeaderConsoleComponent,
    LeaderQueueItemComponent,
    ReportBattleDialog,

  ],
  providers: [
    // (useHash) ? { provide: LocationStrategy, useClass: HashLocationStrategy } : [],
    // {provide: AuthConfig, useValue: authConfig },
    // { provide: OAuthStorage, useValue: localStorage },
    // { provide: ValidationHandler, useClass: JwksValidationHandler },
    // Enabled the custom date time provider will make the sample fail to login, since the demo Idp time is correctly synced to the world time.
    // { provide: DateTimeProvider, useClass: CustomDateTimeProvider },
    { provide: BASE_URL, useValue: 'http://www.angular.at' },

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
