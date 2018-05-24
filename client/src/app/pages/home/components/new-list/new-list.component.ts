import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'new-list',
  styleUrls: [
    './new-list.component.css'
  ],
  templateUrl: './new-list.component.html'
})
export class NewListComponent implements OnInit {
  // 输入属性
  @Input() title: string;
  @Input() excerpt: string;
  @Input() author: string;
  @Input() time: string;
  @Output() toDetail = new EventEmitter<boolean>();
  public id = '';

  constructor( private route: Router) {}
  public ngOnInit() {}

  /***
   * 根据ID查询新闻
   */
  public click(button) {
    this.toDetail.next(button);
  }
}
