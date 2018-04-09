import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tranformParams } from '../../../common/tools';
import API_LIST from '../api-list';
const httpOptions = {
  headers: new HttpHeaders().set(
    'Content-Type',
    'application/x-www-form-urlencoded; charset=UTF-8'
  )
};
@Injectable()
export class AddTypeServices {
  constructor( private http: HttpClient) {}

  /**
   * 新增分类
   */
  public addType(id, name) {
    const params = {
      categoryId: id,
      categoryName: name
    };
    return this.http.post(API_LIST.ADD_TYPE, tranformParams(params), httpOptions);
  }
}
