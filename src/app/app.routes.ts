import { Routes } from '@angular/router';
import { RoutesKey } from './models/routes';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo:'home/1',
    pathMatch: 'full',
  },

  { path: 'home/:id', component: MainComponent },

];


