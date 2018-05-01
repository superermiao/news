import {RouterModule} from '@angular/router';
import {NewsComponent} from './news.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {HttpClientModule} from '@angular/common/http';
import { routes } from './news.routes';
import {TableItemComponent} from './table-item/table-item.component';
import {SideGroupComponent} from './side-group/side-group.component';
import {EditNewsComponent} from './edit-news/edit-news.component';
import { QuillModule } from 'ngx-quill';
import { NewsService } from './news.service';
@NgModule({
  declarations: [
    NewsComponent,
    TableItemComponent,
    SideGroupComponent,
    EditNewsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule.forRoot(),
    HttpClientModule,
    QuillModule
  ],
  providers: [
    NewsService
  ]
})
export class NewsModule {
  public static routes = routes;
}
