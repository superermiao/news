import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tranformParams } from '../../../common/tools';
import API_LIST from '../api-list';
import { NzModalService } from 'ng-zorro-antd';
@Injectable()
export class AdminListService {
  public page = 1;
  public pageSize = 10;
  public count = 0;
  public adminList = [];
  public loading = false;
  public optionParams = {};
  public idx = 'adminName';
  public idx_value = '';
  constructor(private http: HttpClient,
              private nzModal: NzModalService) {
  }

  /**
   * 获取用户列表
   */
  public getAdminList() {
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
    this.http.post(API_LIST.GET_ADMIN_LIST, tranformParams(params), { headers }).subscribe((res: any) => {
      if (res.status === '0') {
        this.adminList = res.data.map((item) => {
          item['checked'] = false;
          return item;
        });
        this.count = res.count;
        console.log(res.data);
      } else {
        this.nzModal.warning({title: '获取列表失败', content: res.data});
        this.adminList = [];
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
    return this.http.post(API_LIST.DELETE_ONE_ADMIN, tranformParams(params), { headers });
  }

  /**
   * 批量删除用户
   */
  public deletdMany() {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    let adminData = this.adminList.filter((ele) => ele.checked);
    adminData = adminData.map((ele) => {
      return ele._id;
    });
    console.log(adminData);
  }

  /**
   * 添加管理员信息
   * @param name
   * @returns {Observable<Object>}
   */
  public addAdmin(param) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      ...param
    };
    return this.http.post(API_LIST.ADD_ONE_ADMIN, tranformParams(params), { headers });
  }

  /**
   * 修改管理员信息
   * @param dataId
   * @param name
   * @returns {Observable<Object>}
   */
  public updateAdmin(dataId, param){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      id: dataId,
      ...param
    };
    return this.http.post(API_LIST.UPDATE_ONE_ADMIN, tranformParams(params), { headers });
  }

  /**
   * 根据ID获取管理员信息
   * @param dataId
   * @returns {Observable<Object>}
   */
  public findOneAdmin(dataId) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      id: dataId
    };
    return this.http.post(API_LIST.FIND_ONE_ADMIN, tranformParams(params), { headers });
  }
}
