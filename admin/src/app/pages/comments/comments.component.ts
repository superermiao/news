import { Component, OnInit } from '@angular/core';
import {CommentsService} from './comments.service';
@Component({
  selector: 'comments',
  styleUrls: ['./comments.component.css'],
  templateUrl: './comments.component.html'
})
export class CommentsComponent implements OnInit {
  // 全选
  public checkedAll = false;
  constructor(public commentsService: CommentsService) {}
  public ngOnInit() {
    this.commentsService.getCommentList();
  }

  /**
   * 全选影响单选
   */
  public toggleCheckedAll() {
    this.commentsService.commentList.forEach((ele) => (ele.checked = this.checkedAll));
  }

  /**
   * 单选影响全选
   */
  public refreshStatus() {
    this.checkedAll = this.commentsService.commentList.every((ele) => ele.checked);
  }
}
