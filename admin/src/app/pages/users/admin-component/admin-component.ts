import { Component, OnInit } from '@angular/core';
import {AdminListService} from './admin-list.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
@Component({
  selector: 'admin-list',
  styleUrls: ['./admin-component.css'],
  templateUrl: './admin-component.html'
})
export class AdminComponent implements OnInit {
  public searchType = [
    {label: '用户名', option: 'adminName'},
    {label: '手机号', option: 'adminTel'},
    {label: '邮箱', option: 'adminEmail'},
  ];
  public searchOption = 'adminName';
  public  searchValue = '';
  public checkedAll = false;
  constructor(public adminListService: AdminListService,
              private nzMessage: NzMessageService,
              private nzModal: NzModalService,
              private router: Router) {}
  public ngOnInit() {
    this.adminListService.getAdminList();
  }
  /**
   * 编辑管理员信息
   * @param id
   */
  public editAdmin(id) {
    this.router.navigateByUrl(`/manage/users/edit-admin?dataId=${id}`);
  }

  /**
   * 查询管理员信息
   */
  public search() {
    this.adminListService.idx = this.searchOption;
    this.adminListService.idx_value = this.searchValue;
    this.adminListService.getAdminList();
  }

  /**
   * 获取用户列表
   */
  public getAdminList() {}
  /**
   * 全选影响单选
   */
  public toggleCheckedAll() {
    this.adminListService.adminList.forEach((ele) => (ele.checked = this.adminListService.checkedAll));
  }

  /**
   * 单选影响全选
   */
  public refreshStatus() {
    this.adminListService.checkedAll = this.adminListService.adminList.every((ele) => ele.checked);
  }

  /**
   * 单个删除或者批量删除分类
   * @param id
   */
  public delete(id?) {
    if (id) {
      this.adminListService.deleteById(id).subscribe((res: any) => {
        if (res.status === '0') {
          // 当当前页数不为1，并且数据删除完，则应该跳到上一页
          if ((this.adminListService.checkedAll && this.adminListService.adminList.length >= 1) ||
            (!this.adminListService.checkedAll && this.adminListService.adminList.length === 1)) {
            if (this.adminListService.page > 1) {
              this.adminListService.page--;
            }
          }
          this.nzMessage.success('删除成功');
          this.adminListService.getAdminList();
        } else {
          this.nzModal.warning({title: '删除失败', content: res.data});
        }
      });
    } else {
      this.adminListService.deletdMany().subscribe((res: any) => {
        if (res.status === '0') {
          // 当当前页数不为1，并且数据删除完，则应该跳到上一页
          if ((this.adminListService.checkedAll && this.adminListService.adminList.length >= 1) ||
            (!this.adminListService.checkedAll && this.adminListService.adminList.length === 1)) {
            if (this.adminListService.page > 1) {
              this.adminListService.page--;
            }
          }
          this.nzMessage.success('删除管理员成功');
          this.adminListService.getAdminList();
        } else {
          this.nzModal.warning({title: '删除管理员失败', content: res.data});
        }
      });
    }
  }
}
