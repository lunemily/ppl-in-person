import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{ path: '', component: HomeComponent, runGuardsAndResolvers: 'always' }];

@NgModule({
  imports: [RouterModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
