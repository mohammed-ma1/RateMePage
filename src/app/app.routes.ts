import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { RoutesKey } from './models/routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo:RoutesKey.MainPage,
    pathMatch: 'full',
  },
  {
    path: RoutesKey.MainPage,
    loadComponent: () => import('./pages/main/main.component').then( m => m.MainComponent)
  },

];


