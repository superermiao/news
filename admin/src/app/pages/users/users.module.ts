import {RouterModule} from '@angular/router';
import {UsersComponent} from './users.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {HttpClientModule} from '@angular/common/http';
import { routes } from './users.routes';
import { UserComponent } from './user-component/user-component';
import { AdminComponent } from './admin-component/admin-component';
import { AdminListService } from './admin-component/admin-list.service';
import { UserListService } from './user-component/user-list.service';
import {EditAdminComponent} from './admin-component/components/edit-admin/edit-admin.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserComponent,
    AdminComponent,
    EditAdminComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AdminListService,
    UserListService
  ]
})
export class UsersModule {
  public static routes = routes;
}
