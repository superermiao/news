import { Component, OnInit } from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {ActivatedRoute} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
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
  public role = '1';
  public dataId = '';
  constructor(private nzMessage: NzMessageService,
              private nzModal: NzModalService,
              private activeRouter: ActivatedRoute,
              private fb: FormBuilder) {}
  public ngOnInit() {

  }

}
