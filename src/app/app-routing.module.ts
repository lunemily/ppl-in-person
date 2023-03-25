import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutLeadersComponent } from './about-leaders/about-leaders.component';
import { BingoBoardComponent } from './bingo-board/bingo-board.component';
import { HomeComponent } from './home/home.component';
import { MetricsComponent } from './metrics/metrics.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'about', component: AboutLeadersComponent },
  { path: 'bingo', component: BingoBoardComponent },
  { path: 'metrics', component: MetricsComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
