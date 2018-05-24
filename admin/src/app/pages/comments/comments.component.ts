import { Component, OnInit } from '@angular/core';
import {CommentsService} from './comments.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {NewsService} from '../news/news.service';
@Component({
  selector: 'comments',
  styleUrls: ['./comments.component.css'],
  templateUrl: './comments.component.html'
})
export class CommentsComponent implements OnInit {
  constructor(public commentsService: CommentsService,
              private nzMessage: NzMessageService,
              private nzModal: NzModalService) {}
  public ngOnInit() {
    this.commentsService.getCommentList();
  }

  /**
   * 全选影响单选
   */
  public toggleCheckedAll() {
    this.commentsService.commentList.forEach((ele) => (ele.checked = this.commentsService.checkedAll));
  }

  /**
   * 单选影响全选
   */
  public refreshStatus() {
    this.commentsService.checkedAll = this.commentsService.commentList.every((ele) => ele.checked);
  }
  /**
   * 评论通过审核
   */
  public updateStatis(id) {
    this.commentsService.updateStatus(id).subscribe((res: any) => {
      if (res.status === '0') {
        this.nzMessage.success('发布成功');
        this.commentsService.getCommentList();
      } else {
        this.nzMessage.error('发布失败', res.data);
      }
    });
  }
  /**
   * 删除评论
   */
  public delete(id?) {
    this.nzModal.confirm({
      title: '提示信息',
      content: '评论删除之后将不可恢复，你确定删除?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        if (id) {
          this.commentsService.deleteById(id).subscribe((res: any) => {
            if (res.status === '0') {
              // 当当前页数不为1，并且数据删除完，则应该跳到上一页
              if ((this.commentsService.checkedAll && this.commentsService.commentList.length >= 1) ||
                (!this.commentsService.checkedAll && this.commentsService.commentList.length === 1)) {
                if (this.commentsService.page > 1) {
                  this.commentsService.page--;
                }
              }
              this.nzMessage.success('删除评论成功');
              this.commentsService.getCommentList();
            } else {
              this.nzModal.warning({title: '删除评论失败', content: res.data});
            }
          });
        } else {
          this.commentsService.deletdMany().subscribe((res: any) => {
            if (res.status === '0') {
              // 当当前页数不为1，并且数据删除完，则应该跳到上一页
              if ((this.commentsService.checkedAll && this.commentsService.commentList.length >= 1) ||
                (!this.commentsService.checkedAll && this.commentsService.commentList.length === 1)) {
                if (this.commentsService.page > 1) {
                  this.commentsService.page--;
                }
              }
              this.nzMessage.success('删除评论成功');
              this.commentsService.getCommentList();
            } else {
              this.nzModal.warning({title: '删除评论失败', content: res.data});
            }
          });
        }
      }
    });
  }
}
