import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tranformParams } from '../../../common/tools';
import API_LIST from '../api-list';
import { NzModalService } from 'ng-zorro-antd';
@Injectable()
export class UserListService {
  public page = 1;
  public pageSize = 10;
  public count = 0;
  public userList = [];
  public loading = false;
  public optionParams = {};
  public idx = 'userName';
  public idx_value = '';
  constructor(private http: HttpClient,
              private nzModal: NzModalService) {
  }

  /**
   * 获取用户列表
   */
  public getUserList() {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      page: this.page,
      page_size: this.pageSize,
      idx_arr: {
        idx: this.idx,
        idx_value: this.idx_value
      }
    };
    this.loading = true;
    this.http.post(API_LIST.GET_USER_LIST, tranformParams(params), { headers }).subscribe((res: any) => {
      if (res.status === '0') {
        this.userList = res.data.map((item) => {
          item['checked'] = false;
          return item;
        });
        this.count = res.count;
        console.log(res.data);
      } else {
        this.nzModal.warning({title: '获取列表失败', content: res.data});
        this.userList = [];
      }
      this.loading = false;
    });
  }
  /**
   * 单个删除用户
   * @param id
   */
  public deleteById(id) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      id: id
    };
    return this.http.post(API_LIST.DELETE_ONE_USER, tranformParams(params), { headers });
  }

  /**
   * 批量删除用户
   */
  public deletdMany() {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    let userData = this.userList.filter((ele) => ele.checked);
    userData = userData.map((ele) => {
      return ele._id;
    });
    console.log(userData);
  }
}
