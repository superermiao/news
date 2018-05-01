import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NoContentComponent } from './common/no-content/no-content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import {ROUTES } from './app.routes';
import { LoginComponent } from './common/login.component/login.component';
import { HeaderComponent } from './common/frame/header/header.component';
import { SiderComponent } from './common/frame/sider/sider.component';
import {LoginService} from './common/login.component/login.service';


@NgModule({
  declarations: [
    AppComponent,
    NoContentComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule.forRoot(),
    RouterModule.forRoot(ROUTES, { enableTracing: true }),
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
