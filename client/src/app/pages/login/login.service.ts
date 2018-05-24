import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tranformParams} from '../common/tools';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Router} from '@angular/router';

@Injectable()
export class LoginService {
  public error = '';
  constructor(private http: HttpClient,
              private nzModal: NzModalService,
              private nzMessage: NzMessageService,
              private route: Router) {}

  /**
   * 登录
   * @param param
   * @returns {Observable<Object>}
   */
  public login(param) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      ...param
    };
    this.http.post('http://127.0.0.1:3000/api/client/login', tranformParams(params), { headers }).subscribe((res: any) => {
      if (res.status === '0') {
        this.nzMessage.success('登录成功');
        // 存入sessionStorage
        let data = {};
        // 不存密码
        data = Object.assign(res.data);
        delete data['userPwd'];
        sessionStorage.setItem('user', JSON.stringify(data));
        this.route.navigateByUrl('/home');
      } else {
        this.nzMessage.error('登录失败');
        this.error = '用户名或密码错误';
      }
    });
  }
}
