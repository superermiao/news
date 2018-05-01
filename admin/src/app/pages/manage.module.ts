import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {ManageComponent} from './manage.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {RouterModule} from '@angular/router';
import {ROUTES} from './manage.routes';
import {HeaderComponent} from '../common/frame/header/header.component';
import {SiderComponent} from '../common/frame/sider/sider.component';
import {CommonModule} from '@angular/common';
import {NewsComponent} from "./news/news.component";


@NgModule({
  declarations: [
    ManageComponent,
    HeaderComponent,
    SiderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule.forRoot(),
    RouterModule.forChild(ROUTES),
  ],
  providers: [],
})
export class ManageModule { }
