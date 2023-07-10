import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutLeadersComponent } from './about-leaders/about-leaders.component';
import { BingoBoardComponent } from './bingo-board/bingo-board.component';
import { HomeComponent } from './home/home.component';
import { TrainerCardComponent } from './trainer-card/trainer-card.component';
import { HowToComponent } from './how-to/how-to.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'howto', component: HowToComponent },
  { path: 'about', component: AboutLeadersComponent },
  { path: 'bingo', component: BingoBoardComponent },
  { path: 'trainercard', component: TrainerCardComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
