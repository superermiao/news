import { Component, OnInit } from '@angular/core';
import {NewsService} from '../news.service';
@Component({
  selector: 'side-group',
  styleUrls: ['./side-group.component.css'],
  templateUrl: './side-group.component.html'
})
export class SideGroupComponent implements OnInit {
  constructor(public newsService: NewsService){}
  public ngOnInit() {
    this.newsService.selectedAll = true;
  }

  /**
   * 获取列表
   */
  public getNewsList(id?) {
    this.newsService.optionParams = {
      category_id: id
    };
    this.newsService.getNewsList();
  }

}
