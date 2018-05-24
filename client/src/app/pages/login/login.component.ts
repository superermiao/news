import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {LoginService} from "./login.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {Router} from "@angular/router";


@Component({
  selector: 'login',
  styleUrls: [
    './login.component.css'
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public validateForm: FormGroup;
  public userName = '';
  public userPwd = '';
  public error = '';
  constructor(private fb: FormBuilder,
              public loginService: LoginService,
              private nzModal: NzModalService,
              private nzMessage: NzMessageService,
              private route: Router) {}
  public ngOnInit() {}

  /**
   * 登录
   */
  public login() {
    console.log('登录成功');
    let param = {
      userName: this.userName,
      userPwd: this.userPwd
    };
    this.loginService.login(param);
  }
}
