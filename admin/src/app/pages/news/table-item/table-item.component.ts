import { Component, OnInit } from '@angular/core';
import {NewsService} from '../news.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
@Component({
  selector: 'table-item',
  styleUrls: ['./table-item.component.css'],
  templateUrl: './table-item.component.html'
})
export class TableItemComponent implements OnInit {
  // 全选
  public checkedAll = false;
  constructor(public newsService: NewsService,
              private nzMessage: NzMessageService,
              private nzModal: NzModalService,
              private router: Router){}
  public ngOnInit() {
    this.newsService.getCategory();
    this.newsService.getNewsList();
  }
  /**
   * 发布新闻
   */
  public publish(id) {
    this.newsService.publish(id).subscribe((res: any) => {
      if (res.status === '0') {
        this.nzMessage.success('发布成功');
        this.newsService.getNewsList();
      } else {
        this.nzMessage.error('发布失败', res.data);
      }
    });
  }
  /**
   * 全选影响单选
   */
  public toggleCheckedAll() {
    this.newsService.newsList.forEach((ele) => (ele.checked = this.newsService.checkedAll));
  }

  /**
   * 单选影响全选
   */
  public refreshStatus() {
    this.newsService.checkedAll = this.newsService.newsList.every((ele) => ele.checked);
  }


  /**
   * 删除新闻
   */
  public delete(id?) {
    this.nzModal.confirm({
      title: '提示信息',
      content: '新闻删除之后将不可恢复，你确定删除?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        if (id) {
          this.newsService.deleteById(id).subscribe((res: any) => {
            if (res.status === '0') {
              // 当当前页数不为1，并且数据删除完，则应该跳到上一页
              if ((this.newsService.checkedAll && this.newsService.newsList.length >= 1) ||
                (!this.newsService.checkedAll && this.newsService.newsList.length === 1)) {
                if (this.newsService.page > 1) {
                  this.newsService.page--;
                }
              }
              this.nzMessage.success('删除新闻成功');
              this.newsService.getNewsList();
            } else {
              this.nzModal.warning({title: '删除新闻失败', content: res.data});
            }
          });
        } else {
          this.newsService.deletdMany().subscribe((res: any) => {
            if (res.status === '0') {
              // 当当前页数不为1，并且数据删除完，则应该跳到上一页
              if ((this.newsService.checkedAll && this.newsService.newsList.length >= 1) ||
                (!this.newsService.checkedAll && this.newsService.newsList.length === 1)) {
                if (this.newsService.page > 1) {
                  this.newsService.page--;
                }
              }
              this.nzMessage.success('删除新闻成功');
              this.newsService.getNewsList();
            } else {
              this.nzModal.warning({title: '删除新闻失败', content: res.data});
            }
          });
        }
      }
    });
  }

  /**
   * 编辑新闻
   * @param id
   */
  public editNews(id) {
    this.router.navigateByUrl(`/manage/news/edit-news?dataId=${id}`);
  }

  /**
   * 复制新闻
   */
  public copy(id?) {
    this.nzModal.confirm({
      title: '提示信息',
      content: '你确定复制该新闻？复制之后请立即修改',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        if (id) {
          this.newsService.copyNews(id).subscribe((res: any) => {
            if (res.status === '0') {
              this.nzMessage.success('复制新闻成功');
              this.newsService.getNewsList();
            } else {
              this.nzMessage.error('复制新闻失败');
            }
          });
        } else {
          console.log('删除多条新闻');
        }
      }
    });
  }
}
