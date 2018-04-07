import {RouterModule} from "@angular/router";
import {NewsComponent} from "./news.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {HttpClientModule} from "@angular/common/http";
import { routes } from './news.routes';

@NgModule({
  declarations: [
    NewsComponent
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
export class NewsModule {
  public static routes = routes;
}
