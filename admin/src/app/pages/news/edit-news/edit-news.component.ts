import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
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
  constructor(public newsService: NewsService,
              private nzModal: NzModalService,
              private activeRouter: ActivatedRoute,
              private nzMessage: NzMessageService) {}
  public ngOnInit() {
    this.getNews();
  }

  /*/!**
   * 获取分类列表
   *!/
  public getCategory(){
    this.newsService.getCategory().subscribe((res: any) => {
      if (res.status === '0') {
        this.typeList = res.data;
      } else {
        console.log(res.data);
      }
    });
  }*/

  /**
   *获取数据
   */
  public async getNews() {
    await this.newsService.getCategory();
    await this.setNews();
  }

  /**
   * 处理数据
   */
  public  setNews() {
    this.activeRouter.queryParams.subscribe((params) => {
      if (params['dataId']) {
        this.dataId = params['dataId'];
        this.newsService.findNewsById(this.dataId).subscribe((res: any) => {
          if (res.status === '0') {
            this.category = res.data.category;
            this.author = res.data.author;
            this.excerpt = res.data.excerpt;
            this.content = res.data.content;
            this.origin = res.data.origin;
            this.title = res.data.title;
          } else {
            this.nzMessage.error('查询失败');
          }
        });
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
    };
    if (!this.dataId) {
      this.newsService.addNews(params).subscribe((res: any) => {
        if (res.status === '0') {
          this.nzModal.success({title: '添加成功'});
        } else {
          this.nzModal.success({title: '添加失败', content: res.data});
        }
      });
    } else {
      this.newsService.updateNews(this.dataId, params).subscribe((res: any) => {
        if (res.status === '0') {
          this.nzModal.success({title: '修改成功'});
        } else {
          this.nzModal.success({title: '修改失败', content: res.data});
        }
      });
    }
  }
}
