import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {ProfileService} from "../profile/profile.service";
import {ForgetPwdService} from "./forget-pwd.service";


@Component({
  selector: 'forget',
  styleUrls: [
    './forget-pwd.component.css'
  ],
  templateUrl: './forget-pwd.component.html',
})
export class ForgetPwdComponent implements OnInit {
  // 当前进度
  public current = 0;
  // 密保问题
  public userQuestion = '';
  // 密保答案
  public answer = '';
  // 用户账号
  public  name = '';
  // 新密码
  public newPwd = '';
  // 确认密码
  public confirmPwd = '';
  constructor(private nzModal: NzModalService,
              private nzMessage: NzMessageService,
              private route: Router,
              public profileService: ProfileService,
              public forgetPwdService: ForgetPwdService) {}
  public ngOnInit() {
    this.profileService.getAllQuestion();
  }

  /**
   * 下一步
   */
  public next() {
    if (this.current === 0) {
      if (!this.name) {
        this.nzModal.warning({
          title: '用户名不能为空',
          content: '请输入用户名'
        });
      } else if (!this.userQuestion) {
        this.nzModal.warning({
          title: '密保问题不能为空',
          content: '请选择你的密保问题'
        });
      } else if (!this.answer) {
        this.nzModal.warning({
          title: '密保答案不能为空',
          content: '请输入你的密保答案'
        });
      } else {
        let param = {
          userName: this.name,
          userQuestion: this.userQuestion,
          userAnswer: this.answer
        };
        this.forgetPwdService.findUser(param).subscribe((res: any) => {
          if (res.status === '0') {
            this.current += 1;
          } else {
            this.nzModal.warning({
              title: '用户名或密保有误',
              content: res.data
            });
          }
        });
      }
    } else if (this.current === 1) {
      let pattern = /^[A-Za-z0-9]{6,16}$/;
      if (!this.newPwd) {
        this.nzModal.warning({
          title: '新密码不能为空',
          content: '请输入新的密码'
        });
      } else if (!pattern.test(this.newPwd)) {
        this.nzModal.warning({
          title: '请输入6-16位由英文或字母组成的密码',
        });
      } else if (!this.confirmPwd) {
        this.nzModal.warning({
          title: '请再次重复新的密码',
        });
      } else if (this.confirmPwd !== this.newPwd) {
        this.nzModal.warning({
          title: '两次密码不一致'
        });
      } else  {
        let params = {
          userName: this.name,
          userPwd: this.confirmPwd
        }
        this.forgetPwdService.modifyPwd(params).subscribe((res: any) => {
          if (res.status === '0') {
            this.current += 1;
            setTimeout(() => {
              this.route.navigateByUrl('/login');
            }, 1000);
          } else {
            this.nzModal.warning({
              title: '修改密码失败',
              content: res.data
            });
          }
        });
      }
    }
  }

  /**
   * 上一步
   */
  public pre() {
    this.current -= 1;
  }

  /**
   * 完成
   */
  public done(){}

}
