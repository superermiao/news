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
  public newsImg = '';
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
            this.newsImg = res.data.newsImg;
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
      newsImg: this.newsImg
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

  /**
   * 添加图片
   */
  public addNewsImg($event) {
    /*input_file：文件按钮对象*/
    /*get_data: 转换成功后执行的方法*/
    if ( typeof(FileReader) === 'undefined' ) {
      alert('抱歉，你的浏览器不支持 FileReader，不能将图片转换为Base64，请使用现代浏览器操作！');
    } else {
      try {
        /*图片转Base64 核心代码*/
        const file = $event.target.files[0];
        console.log(file);
        // 这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
        if (!/image\/\w+/.test(file.type)) {
          alert('请确保文件为图像类型');
          return false;
        }
        const reader = new FileReader();
        let that = this;
        reader.onload = function() {
          console.log('图片转换:', this.result);
          that.newsImg = this.result;
        };
        console.log(this.newsImg);
        reader.readAsDataURL(file);
      } catch (e) {
        console.log('ss', e.toString());
      }
    }
  }
}
