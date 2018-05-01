import { Component, OnInit } from '@angular/core';
import {UserListService} from './user-list.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
@Component({
  selector: 'user-list',
  styleUrls: ['./user-component.css'],
  templateUrl: './user-component.html'
})
export class UserComponent implements OnInit {
  public searchType = [
    {label: '用户名', option: 'userName'},
    {label: '手机号', option: 'userTel'},
    {label: '邮箱', option: 'userEmail'},
  ];
  public searchOption = 'userName';
  public  searchValue = '';
  public checkedAll = false;
  constructor(public userListService: UserListService,
              private nzMessage: NzMessageService,
              private nzModal: NzModalService){}
  public ngOnInit() {
    this.userListService.getUserList();
  }
  public search() {
    this.userListService.idx = this.searchOption;
    this.userListService.idx_value = this.searchValue;
    this.userListService.getUserList();
  }
  public getUserList() {}
  /**
   * 全选影响单选
   */
  public toggleCheckedAll() {
    this.userListService.userList.forEach((ele) => (ele.checked = this.checkedAll));
  }

  /**
   * 单选影响全选
   */
  public refreshStatus() {
    this.checkedAll = this.userListService.userList.every((ele) => ele.checked);
  }

  /**
   * 单个删除或者批量删除分类
   * @param id
   */
  public delete(id?) {
    if (id) {
      this.userListService.deleteById(id).subscribe((res: any) => {
        if (res.status === '0') {
          this.nzMessage.success('删除成功');
          this.userListService.getUserList();
        } else {
          this.nzModal.warning({title: '删除失败', content: res.data});
        }
      });
    } else {
      this.userListService.deletdMany();
    }
  }
}
