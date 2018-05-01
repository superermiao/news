import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'news',
  styleUrls: ['./news.component.css'],
  templateUrl: './news.component.html'
})
export class NewsComponent implements OnInit {
  public showCondition  = false;
  public searchType = [
    {label: '新闻标题', option: '1'},
    {label: '新闻来源', option: '2'},
  ];
  public searchOption = '1';
  public  searchValue = '';
  public leastView;
  public  mostView;
  public startTime;
  public endTime;
  constructor(){}
  public ngOnInit() {}
  public search() {}
  public handleOk() {}
  public handleCancel() {}
  /**
   * 是否显示筛选
   */
  public showScreen() {
    this.showCondition = !this.showCondition;
  }
}
