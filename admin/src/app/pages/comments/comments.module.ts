import {RouterModule} from '@angular/router';
import {CommentsComponent} from './comments.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {HttpClientModule} from '@angular/common/http';
import { routes } from './comments.routes';
import {CommentsService} from './comments.service';

@NgModule({
  declarations: [
    CommentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    CommentsService
  ]
})
export class CommentsModule {
  public static routes = routes;
}
