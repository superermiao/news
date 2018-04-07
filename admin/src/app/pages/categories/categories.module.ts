import {RouterModule} from "@angular/router";
import {CategoriesComponent} from "./categories.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {HttpClientModule} from "@angular/common/http";
import { routes } from './categories.routes';
import { AddTypeComponent } from "./add-type/add-type.component";

@NgModule({
  declarations: [
    CategoriesComponent,
    AddTypeComponent
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
export class CategoriesModule {
  public static routes = routes;
}
