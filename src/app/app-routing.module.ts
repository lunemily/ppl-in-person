import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutLeadersComponent } from './about-leaders/about-leaders.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  //{ path: '', component: HomeComponent },
  { path: '', component: AboutLeadersComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'about', component: AboutLeadersComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
