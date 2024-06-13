import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home/1', pathMatch: 'full' },
  { path: 'home/:id', component: MainComponent },
  { path: '**', redirectTo: 'home/1', pathMatch: 'full' }
];


