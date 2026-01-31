import { Routes } from '@angular/router';
import { MoviesManagement } from './pages/movies-management/movies-management';
import { RegisterUser } from './pages/register-user/register-user';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'register-user', component: RegisterUser },
  { path: 'movies-management', component: MoviesManagement },
];
