import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tranformParams } from '../../../common/tools';
import API_LIST from '../api-list';
const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
@Injectable()
export class AddTypeServices {
  constructor( private http: HttpClient) {}

  /**
   * 新增分类
   */
  public addType(name) {
    const params = {
      categoryName: name
    };
    return this.http.post(API_LIST.ADD_TYPE, tranformParams(params), { headers });
  }

  /**
   * 修改分类
   */
  public updateType(dataId, name){
    const params = {
      id: dataId,
      categoryName: name
    };
    return this.http.post(API_LIST.UPDATE_TYPE, tranformParams(params), { headers });
  }

  /**
   * 获取某一个分类
   */
  public findOneType(dataId) {
    const params = {
      id: dataId
    };
    return this.http.post(API_LIST.FIND_TYPE, tranformParams(params), { headers });
  }
}
