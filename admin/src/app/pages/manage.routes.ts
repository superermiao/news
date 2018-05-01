import { Routes } from '@angular/router';

import { ManageComponent } from './manage.component';

export const ROUTES: Routes = [
  {path: '',
   component: ManageComponent,
   children: [
  { path: '', redirectTo: '/manage/news', pathMatch: 'full'},
  { path: 'users', loadChildren: './users#UsersModule' },
  { path: 'categories', loadChildren: './categories#CategoriesModule' },
  { path: 'news', loadChildren: './news#NewsModule' },
  { path: 'comments', loadChildren: './comments#CommentsModule' }]
  }
];
