import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tranformParams } from '../../common/tools';
import API_LIST from './api-list';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
@Injectable()
export class NewsService {
  public page = 1;
  public pageSize = 10;
  public count = 0;
  public newsList = [];
  public loading = false;
  public optionParams = {};
  public categories = [];
  public idx = 'title';
  public idx_value = '';
  public newStatus = '0';
  // 分类全部选中状态
  public selectedAll = false;
  constructor(private http: HttpClient,
              private nzModal: NzModalService,
              private nzMessage: NzMessageService) {
  }

  /**
   * 获取分类列表
   * @returns {Observable<Object>}
   */
  public getCategory() {
    this.http.get(API_LIST.GET_CATEGORY).subscribe((res: any) => {
      if (res.status === '0') {
        this.categories = res.data.map((item) => {
          item['checked'] = false;
          return item;
        });
      } else {
        this.nzMessage.warning('获取列表失败');
      }
    });
  }

  /**
   * 添加新闻
   */
  public addNews(param) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      ...param
    };
    return this.http.post(API_LIST.ADD_NEWS, tranformParams(params), { headers });
  }

  /**
   * 获取新闻列表
   */
  public getNewsList() {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      page: this.page,
      page_size: this.pageSize,
      idx: this.idx,
      idx_value: this.idx_value,
      status: this.newStatus,
      ...this.optionParams
    };
    this.loading = true;
    this.http.post('http://127.0.0.1:3000/api/admin/news-list', tranformParams(params), { headers }).subscribe((res: any) => {
      if (res.status === '0') {
        this.newsList = res.data.map((item) => {
          item['checked'] = false;
          return item;
        });
        this.count = res.count;
        console.log(res.data);
      } else {
        this.nzModal.warning({title: '获取列表失败', content: res.data});
        this.newsList = [];
      }
      this.loading = false;
    });
  }
  /**
   * 初始化分类的选中状态
   */
  public initCheckedStatus() {
    const lastChecked = this.categories.find((ele) => ele.checked);
    if (lastChecked) {
      lastChecked['checked'] = false;
    }
    this.selectedAll = true;
  }

  /**
   * 发布新闻
   */
  public publish(id) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      id: id,
      status: '0'
    };
    return this.http.post(API_LIST.UPDATE_STATUS, tranformParams(params), { headers });
  }

  /**
   * 删除单条新闻
   */
  public deleteById(id) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      id: id,
    };
    return this.http.post(API_LIST.DELETE_ONE_NEWS, tranformParams(params), { headers });
  }

  /**
   * 根据id查找新闻
   * @param id
   */
  public findNewsById(id) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      id: id,
    };
    return this.http.post(API_LIST.FIND_ONE_NEWS, tranformParams(params), { headers });
  }

  /**
   * 修改新闻
   */
  public updateNews(id, param) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      id: id,
      ...param
    };
    return this.http.post(API_LIST.UPDATE_NEWS, tranformParams(params), { headers });
  }
}
