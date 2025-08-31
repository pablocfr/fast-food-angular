import { Routes } from '@angular/router';
import { LoginComponent } from './components/login.component/login.component';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
];

export default AUTH_ROUTES;
