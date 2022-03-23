import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

export let APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    redirectTo: ''
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
