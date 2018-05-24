import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register.component';
import {ROUTES} from './register.router';


@NgModule({
  declarations: [
    RegisterComponent
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
export class RegisterModule { }
