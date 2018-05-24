import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tranformParams} from '../common/tools';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Router} from '@angular/router';

@Injectable()
export class ProfileService {
  // 密保问题列表
  public questionList = [];
  constructor(private http: HttpClient,
              private nzModal: NzModalService,
              private nzMessage: NzMessageService,
              private route: Router) {}

  /**
   * 根据id查找用户所有信息
   * @param param
   * @returns {Observable<Object>}
   */
  public findUserById(param) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      id: param
    };
    return this.http.post('http://127.0.0.1:3000/api/client/find-one-user', tranformParams(params), { headers });
  }

  /**
   * 根据id保存用户修改的个人信息
   */
  public updateUser(id, param) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      id: id,
      ...param
    };
    return this.http.post('http://127.0.0.1:3000/api/client/update-user', tranformParams(params), { headers });
  }

  /**
   * 获取密保问题
   */
  public getAllQuestion() {
    this.http.get('http://127.0.0.1:3000/api/client/question-list').subscribe((res: any) => {
      if (res.status === '0') {
        this.questionList = res.data.map((item) => {
          item['checked'] = false;
          return item;
        });
      } else {
        this.nzMessage.warning('获取密保问题列表失败');
      }
    });
  }

  /**
   * 修改密码
   */
  public updatePwd(param) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      ...param
    };
    return this.http.post('http://127.0.0.1:3000/api/client/update-pwd', tranformParams(params), { headers });
  }
}
