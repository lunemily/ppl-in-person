import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ClipboardModule } from '@angular/cdk/clipboard';
import { HttpClientModule } from '@angular/common/http';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QRCodeModule } from 'angularx-qrcode';

import { AppComponent, EventOverDialog } from './app.component';
import { HeaderComponent, PPLHelpDialog } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LeaderConsoleComponent } from './console/leader-console/leader-console.component';
import {
  LeaderQueueItemComponent,
  ReportBattleDialog,
} from './console/leader-console/leader-queue-item/leader-queue-item.component';
import {
  ChallengerConsoleComponent,
  PPLQueueHelpDialog,
} from './console/challenger-console/challenger-console.component';
import { QueueItemComponent } from './console/challenger-console/queue-item/queue-item.component';
import { LeaderHoldItemComponent } from './console/leader-console/leader-hold-item/leader-hold-item.component';
import { AuthComponent } from './home/auth/auth.component';

import { CookieService } from 'ngx-cookie-service';
import { ChallengerSearchComponent } from './console/leader-console/challenger-search/challenger-search.component';
import { HomeComponent } from './home/home.component';
import { AboutLeadersComponent } from './about-leaders/about-leaders.component';
import { AppRoutingModule } from './app-routing.module';
import { ConsoleComponent } from './console/console.component';
import { LeaderBadgeComponent, LeaderDetailEnqueueDialog } from './about-leaders/leader-badge/leader-badge.component';
import { NameComponent, SetNameDialog } from './console/name/name.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { BingoBoardComponent } from './bingo-board/bingo-board.component';
import { QueueMgmtComponent } from './console/leader-console/queue-mgmt/queue-mgmt.component';
import { TrainerCardComponent } from './common/trainer-card/trainer-card.component';
import { HowToComponent } from './how-to/how-to.component';
import { StaticImageComponent } from './static-image/static-image.component';
import { LeaderListComponent } from './common/leader-list/leader-list.component';
import { ChallengerQueueListComponent } from './console/challenger-console/challenger-queue-list/challenger-queue-list.component';
import { MeetupPopup, MeetupTimesComponent } from './home/meetup-times/meetup-times.component';
import { QrCodeComponent } from './common/qr-code/qr-code.component';
import { QrEnqueueComponent, EnqueueDialog } from './common/qr-enqueue/qr-enqueue.component';
import { LinkCodeComponent, SetLinkCodeDialog } from './console/leader-console/link-code/link-code.component';
import { NgOptimizedImage } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LeaderConsoleComponent,
    LeaderQueueItemComponent,
    ReportBattleDialog,
    ChallengerConsoleComponent,
    PPLQueueHelpDialog,
    QueueItemComponent,
    LeaderHoldItemComponent,
    EnqueueDialog,
    AuthComponent,
    ChallengerSearchComponent,
    HomeComponent,
    AboutLeadersComponent,
    ConsoleComponent,
    LeaderBadgeComponent,
    LeaderDetailEnqueueDialog,
    NameComponent,
    SetNameDialog,
    BingoBoardComponent,
    PPLHelpDialog,
    QueueMgmtComponent,
    TrainerCardComponent,
    HowToComponent,
    EventOverDialog,
    StaticImageComponent,
    LeaderListComponent,
    ChallengerQueueListComponent,
    MeetupTimesComponent,
    MeetupPopup,
    QrCodeComponent,
    QrEnqueueComponent,
    LinkCodeComponent,
    SetLinkCodeDialog,
  ],
  imports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    OverlayModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
    HttpClientModule,
    BrowserAnimationsModule,
    QRCodeModule,
    AppRoutingModule,
    NgOptimizedImage,
  ],
  providers: [CookieService, Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
