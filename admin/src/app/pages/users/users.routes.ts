import { UsersComponent } from './users.component';
import { UserComponent } from './user-component/user-component';
import { AdminComponent} from './admin-component/admin-component';
import { EditAdminComponent } from './admin-component/components/edit-admin/edit-admin.component';

export const routes = [
  {
    path: '', component: UsersComponent, children: [
    {path: 'user-list', component: UserComponent},
    {path: 'admin-list', component: AdminComponent},
    {path: 'edit-admin', component: EditAdminComponent},
    { path: '', redirectTo: '/manage/users/user-list' },
   ]
  },
  { path: '**', component: UsersComponent }
];
