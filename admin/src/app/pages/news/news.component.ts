import { Component, OnInit } from '@angular/core';
import {NewsService} from './news.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
@Component({
  selector: 'news',
  styleUrls: ['./news.component.css'],
  templateUrl: './news.component.html'
})
export class NewsComponent implements OnInit {
  public showCondition  = false;
  public searchType = [
    {label: '新闻标题', option: 'title'},
    {label: '新闻来源', option: 'origin'},
  ];
  public searchOption = 'title';
  public  searchValue = '';
  public leastView;
  public  mostView;
  public startTime;
  public endTime;
  constructor(public newsService: NewsService,
              private nzMessage: NzMessageService,
              private nzModal: NzModalService) {}
  public ngOnInit() {}

  /**
   * 搜索新闻
   */
  public search() {
    this.newsService.idx = this.searchOption;
    this.newsService.idx_value = this.searchValue;
    this.newsService.getNewsList();
  }
  public handleOk() {}
  public handleCancel() {}
  /**
   * 是否显示筛选
   */
  public showScreen() {
    this.showCondition = !this.showCondition;
  }

  /**
   * 切换新闻状态
   */
  public getNewsStatus(status) {
    this.newsService.newStatus = status;
    this.newsService.getNewsList();
  }

}
