import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NoContentComponent } from './pages/no-content/no-content.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NewDetailComponent } from './pages/home/components/new-detail/new-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ROUTES} from './app.router';
import {RouterModule} from '@angular/router';
import { HeaderComponent } from './pages/common/header/header.component';
import { NavComponent } from './pages/common/nav/nav.component';
import { HomeService } from './pages/home/home.service';
import { NewListComponent } from './pages/home/components/new-list/new-list.component';
// import {RegisterModule} from "./pages/register/register.module";
import {RegisterServices} from './pages/register/register.services';
import {LoginService} from './pages/login/login.service';
import {ProfileService} from './pages/profile/profile.service';
import {ForgetPwdComponent} from './pages/forget/forget-pwd.component';
import {ForgetPwdService} from './pages/forget/forget-pwd.service';


@NgModule({
  declarations: [
    AppComponent,
    NoContentComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NewDetailComponent,
    HomeComponent,
    HeaderComponent,
    NavComponent,
    NewListComponent,
    ForgetPwdComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule.forRoot(),
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false
    }),
  ],
  providers: [
    HomeService,
    RegisterServices,
    LoginService,
    ProfileService,
    ForgetPwdService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
