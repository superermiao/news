import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import {NzModalService} from 'ng-zorro-antd';
@Component({
  selector: 'edit-news',
  styleUrls: ['./edit-news.component.css'],
  templateUrl: './edit-news.component.html'
})
export class EditNewsComponent implements OnInit {
  public dataId = '';
  public category = '';
  public author   = '';
  public excerpt  = '';
  public content  = '';
  public origin   = '';
  public title    = '';
  public typeList = [];
  constructor(private newsService: NewsService,
              private nzModal: NzModalService) {}
  public ngOnInit() {
    this.getCategory();
  }

  /**
   * 获取分类列表
   */
  public getCategory(){
    this.newsService.getCategory().subscribe((res: any) => {
      if (res.status === '0') {
        this.typeList = res.data;
      } else {
        console.log(res.data);
      }
    });
  }

  /**
   * 添加新闻
   */
  public addNews() {
    let params = {
      category: this.category,
      author: this.author  ,
      excerpt: this.excerpt ,
      content: this.content ,
      origin: this.origin  ,
      title: this.title   ,
      typeList: this.typeList,
    };
    this.newsService.addNews(params).subscribe((res: any) => {
      if (res.status === '0') {
        this.nzModal.success({title: '添加成功'});
      } else {
        this.nzModal.success({title: '添加失败', content: res.data});
      }
    });
  }
}
