import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NoContentComponent } from './pages/no-content/no-content.component';
import { HeaderComponent } from './pages/frame/header/header.component';
import { SiderComponent } from './pages/frame/sider/sider.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {RouterModule} from "@angular/router";
import {ROUTES} from "./app.router";


@NgModule({
  declarations: [
    AppComponent,
    NoContentComponent,
    HeaderComponent,
    SiderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule.forRoot(),
    RouterModule.forRoot(ROUTES),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
