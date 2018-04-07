import { Routes } from '@angular/router';
import { NoContentComponent } from './pages/no-content';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', loadChildren: './pages/users#UsersModule' },
  { path: 'categories', loadChildren: './pages/categories#CategoriesModule' },
  { path: 'news', loadChildren: './pages/news#NewsModule' },
  { path: '**', component: NoContentComponent }
];
