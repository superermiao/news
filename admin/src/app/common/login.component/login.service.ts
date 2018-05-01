import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tranformParams} from '../tools';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  /**
   * 登陆
   * @param param
   * @returns {Observable<Object>}
   */
  public login(param) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      ...param,
    };
    return this.http.post('http://127.0.0.1:3000/api/admin/login', tranformParams(params), { headers });
  }
}
