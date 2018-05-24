import { Routes } from '@angular/router';
import { NoContentComponent } from './pages/no-content';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NewDetailComponent } from './pages/home/components/new-detail/new-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {ForgetPwdComponent} from './pages/forget/forget-pwd.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'new-detail', component: NewDetailComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'forget',component: ForgetPwdComponent },
  { path: '**', component: NoContentComponent }
];
