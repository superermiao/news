import { Routes } from '@angular/router';
import { NoContentComponent } from './common/no-content';
import {LoginComponent} from './common/login.component/login.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'manage', loadChildren: './pages#ManageModule' },
  // { path: 'users', loadChildren: './pages/users#UsersModule' },
  // { path: 'categories', loadChildren: './pages/categories#CategoriesModule' },
  // { path: 'news', loadChildren: './pages/news#NewsModule' },
  // { path: 'comments', loadChildren: './pages/comments#CommentsModule' },
  { path: '**', component: NoContentComponent },
];
