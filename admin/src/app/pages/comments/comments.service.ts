import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tranformParams } from '../../common/tools';
import API_LIST from './api-list';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
@Injectable()
export class CommentsService {
  public page = 1;
  public pageSize = 10;
  public count = 0;
  public commentList = [];
  public loading = false;
  public optionParams = {};
  public idx = 'title';
  public idx_value = '';
  public commentStatus = '0';
  // 分类全部选中状态
  public selectedAll = false;
  constructor(private http: HttpClient,
              private nzModal: NzModalService,
              private nzMessage: NzMessageService) {
  }


  /**
   * 获取评论列表
   */
  public getCommentList() {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      page: this.page,
      page_size: this.pageSize,
      status: this.commentStatus,
      ...this.optionParams
    };
    this.loading = true;
    this.http.post(API_LIST.GET_COMMENT_LIST, tranformParams(params), { headers }).subscribe((res: any) => {
      if (res.status === '0') {
        this.commentList = res.data.map((item) => {
          item['checked'] = false;
          return item;
        });
        this.count = res.count;
      } else {
        this.nzModal.warning({title: '获取评论列表失败', content: res.data});
        this.commentList = [];
      }
      this.loading = false;
    });
  }

  /**
   * 发布评论 status 1
   */
  public publish(id) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      id: id,
      status: '1'
    };
    return this.http.post(API_LIST.UPDATE_ONE_COMMENT, tranformParams(params), { headers });
  }

  /**
   * 删除单条评论
   */
  public deleteById(id) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const params = {
      id: id,
    };
    return this.http.post(API_LIST.DELETE_ONE_COMMENT, tranformParams(params), { headers });
  }

  /**
   * 批量删除评论
   */
  public deletdMany() {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    let typeData = this.commentList.filter((ele) => ele.checked);
    typeData = typeData.map((ele) => {
      return ele._id;
    });
    console.log(typeData);
  }
}
