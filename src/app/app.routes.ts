import { Routes } from '@angular/router';
import { RoutesKey } from './models/routes';

export const routes: Routes = [
  {
    path: '/:id',
    loadComponent: () => import('./pages/main/main.component').then( m => m.MainComponent)
  },

];


