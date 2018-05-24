import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tranformParams} from '../common/tools';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Router} from '@angular/router';

@Injectable()
export class ForgetPwdService {
  constructor(private http: HttpClient,
              private nzModal: NzModalService,
              private nzMessage: NzMessageService,
              private route: Router) {}

  /**
   * 查询用户名和密保
   */
  public findUser(param) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      ...param
    };
    return this.http.post('http://127.0.0.1:3000/api/client/find-user', tranformParams(params), { headers });
  }

  /**
   * 更新密码
   */
  public modifyPwd(param) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      ...param
    };
    return this.http.post('http://127.0.0.1:3000/api/client/modify-pwd', tranformParams(params), { headers });
  }
}
