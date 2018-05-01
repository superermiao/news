import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tranformParams } from '../../common/tools';
import API_LIST from './api-list';
import { NzModalService } from 'ng-zorro-antd';
@Injectable()
export class NewsService {
  constructor(private http: HttpClient,
              private nzModal: NzModalService) {
  }

  /**
   * 获取分类列表
   * @returns {Observable<Object>}
   */
  public getCategory() {
    return this.http.get(API_LIST.GET_CATEGORY);
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
}
