import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home/1', pathMatch: 'full' }, // Redirect to /home/1 by default
  { path: 'home/:id', component: MainComponent }, // Route to HomeComponent with id parameter
  { path: '**', redirectTo: '/home/1', pathMatch: 'full' } // Redirect invalid URLs to /home/1
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
