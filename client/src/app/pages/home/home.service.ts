import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tranformParams } from '../common/tools';
import API_LIST from './api-list';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
@Injectable()
export class HomeService {
  constructor( private http: HttpClient,
               private nzModal: NzModalService,
               private nzMessage: NzMessageService ) {}
  // 分类
  public categories = [];
  // 分类不超过10ge
  public categoriesFont = [];
  // 分类超过10个之后
  public categoriesBack = [];
  // 推荐即全选操作
  public selectedAll = true;
  // 所有新闻列表
  public newsList = [];
  // 页数
  public page = 1;
  // 每页条数
  public pageSize = 10;
  public optionParams = {};
  // 总数据
  public count = 0;
  // 评论的page
  public commentPage = 1;
  // 评论的总数
  public commentTotal = 0;
  // 评论的数组
  public commentArray = [];
  /**
   * 根据页数获取评论
   */
  public getCommentList(id) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      page: this.commentPage,
      page_size: 5,
      newsId: id
    };
    this.http.post('http://127.0.0.1:3000/api/client/show-comment', tranformParams(params), { headers }).subscribe((res: any) => {
      if (res.status === '0') {
        this.commentArray = res.data.map((item) => {
          // 防止用户密码泄露
          item.userPwd = '';
          return item;
        });
        this.commentTotal = res.count;
        console.log(res.data);
      } else {
        this.nzModal.warning({title: '获取列表失败', content: res.data});
        this.commentArray = [];
      }
    });
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
        if (this.categories.length <= 10) {
          this.categoriesFont = this.categories;
        } else {
          this.categoriesFont = this.categories.slice(0, 10);
          this.categoriesBack = this.categories.slice(10);
        }
      } else {
        this.nzMessage.warning('获取列表失败');
      }
    });
  }

  /**
   * 获取所有新闻
   */
/*  public getAllList() {
    this.http.get(API_LIST.GET_NEWS_LIST).subscribe((res: any) => {
      if (res.status === '0') {
        this.newsList = res.data;
      } else {
        this.nzMessage.warning('获取新闻列表失败');
      }
    });
  }*/

  /**
   * 根据页数获取新闻
   */
  public getNewsList() {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      page: this.page,
      page_size: this.pageSize,
      status: '0',
      ...this.optionParams
    };
    this.http.post('http://127.0.0.1:3000/api/admin/news-list', tranformParams(params), { headers }).subscribe((res: any) => {
      if (res.status === '0') {
        this.newsList = res.data;
        this.count = res.count;
        console.log(res.data);
      } else {
        this.nzModal.warning({title: '获取列表失败', content: res.data});
        this.newsList = [];
      }
    });
  }

  /**
   * 根据ID查询新闻
   */
  public findNewsById(id){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      id: id,
    };
    return this.http.post(API_LIST.FIND_ONE_NEWS, tranformParams(params), { headers });
  }

  /**
   * 添加评论
   */
  public addComment(param) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      ...param
    };
    return this.http.post(API_LIST.ADD_COMMENT, tranformParams(params), { headers });
  }
}
