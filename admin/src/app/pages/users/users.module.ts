import {RouterModule} from "@angular/router";
import {UsersComponent} from "./users.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {HttpClientModule} from "@angular/common/http";
import { routes } from './users.routes';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule.forRoot(),
    HttpClientModule,
  ],
  providers: []
})
export class UsersModule {
  public static routes = routes;
}
