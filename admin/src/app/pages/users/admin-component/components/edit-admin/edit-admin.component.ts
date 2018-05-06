import { Component, OnInit } from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import {AdminListService} from '../../admin-list.service';
@Component({
  selector: 'add-admin',
  styleUrls: ['./edit-admin.component.css'],
  templateUrl: './edit-admin.component.html'
})

export class EditAdminComponent implements OnInit {
  public roleList = [
    {name: '普通管理员', value: '1'},
    {name: '超级管理员', value: '0'}
    ];
  public adminName = '';
  public adminPwd  = '';
  public adminTel  = '';
  public adminEmail = '';
  public role = '1';
  public dataId = '';
  constructor(private nzMessage: NzMessageService,
              private nzModal: NzModalService,
              private activeRouter: ActivatedRoute,
              private fb: FormBuilder,
              private adminService: AdminListService) {}
  public ngOnInit() {

  }

  /**
   * 保存
   */
  public submitForm() {
    let adminParams = {
      adminName: this.adminName,
      adminPwd: this.adminPwd,
      adminTel: this.adminTel,
      adminEmail: this.adminEmail,
      role: this.role
    };
    this.adminService.addAdmin(adminParams).subscribe((res: any) => {
      if (res.status === '0') {
        this.nzModal.success({title: '添加成功'});
      } else {
        this.nzModal.success({title: '添加失败', content: res.data});
      }
    });
  }

}
