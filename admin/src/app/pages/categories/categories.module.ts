import {RouterModule} from '@angular/router';
import {CategoriesComponent} from './categories.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {HttpClientModule} from '@angular/common/http';
import { routes } from './categories.routes';
import { AddTypeComponent } from './add-type/add-type.component';
import { AddTypeServices } from './add-type/add-type.services';
import { CategoriesService } from './categories.service';

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
  providers: [
    AddTypeServices,
    CategoriesService
  ]
})
export class CategoriesModule {
  public static routes = routes;
}
