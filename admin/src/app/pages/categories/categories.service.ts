import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tranformParams } from '../../common/tools';
import API_LIST from './api-list';
import { NzModalService } from 'ng-zorro-antd';
@Injectable()
export class CategoriesService {
  public page = 1;
  public pageSize = 10;
  public count = 0;
  public typeList = [];
  public loading = false;
  public optionParams = {};
  public checkedAll = false;
  constructor( private http: HttpClient,
               private nzModal: NzModalService ) {}
  /**
   * 获取分类列表
   */
  public getTypeList() {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      page: this.page,
      page_size: this.pageSize
    };
    this.loading = true;
    this.http.post(API_LIST.GET_TYPE, tranformParams(params), { headers }).subscribe((res: any) => {
      if (res.status === '0') {
        this.typeList = res.data.map((item) => {
          item['checked'] = false;
          return item;
        });
        this.count = res.count;
        console.log(res.data);
      } else {
        this.nzModal.warning({title: '获取列表失败', content: res.data});
        this.typeList = [];
      }
      this.loading = false;
      this.checkedAll = false;
    });
  }

  /**
   * 单个删除
   * @param id
   */
  public deleteById(id) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      id: id
    };
    return this.http.post(API_LIST.DELETE_ONE_TYPE, tranformParams(params), { headers });
  }

  /**
   * 批量删除
   */
  public deletdMany() {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    let typeData = [];
    this.typeList.map((ele) => {
      if (ele.checked === true) {
        typeData.push(ele._id);
      }
    });
    console.log(typeData);
    return this.http.post(API_LIST.BATCH_DELET_TYPE, tranformParams(typeData), {headers});
  }
}
