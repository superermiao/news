import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tranformParams} from '../common/tools';

@Injectable()
export class RegisterServices {
  constructor(private http: HttpClient) {}

  /**
   * 注册
   * @param param
   * @returns {Observable<Object>}
   */
  public register(param) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      ...param,
    };
    return this.http.post('http://127.0.0.1:3000/api/client/register', tranformParams(params), { headers });
  }

  /**
   * 查询用户名字
   */
  public find(param) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      ...param,
    };
    return this.http.post('http://127.0.0.1:3000/api/client/find-user', tranformParams(params), { headers });
  }
}
