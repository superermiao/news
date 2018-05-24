import {Component, OnInit} from '@angular/core';
import {HomeService} from '../../home/home.service';

@Component({
  selector: 'nav',
  styleUrls: [
    './nav.component.css'
  ],
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  constructor(public homeService: HomeService) {}
  public ngOnInit() {
    this.homeService.selectedAll = true;
  }
  /**
   * 根据分类获取新闻
   */
  public getNewsList(id?) {
    if (id) {
      this.homeService.optionParams = {
        category_id: id
      };
    } else {
      this.homeService.optionParams = {};
    }
    this.homeService.getNewsList();
  }
}
