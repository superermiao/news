import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {ActivatedRoute, Router} from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public isVisible = true;
  public name = 'admin';
  public pwd = 'admin';
  public  isLoading = false;
  constructor(private loginService: LoginService,
              private route: Router,
              private nzMessage: NzMessageService,
              private nzModal: NzModalService) {}
  public ngOnInit() {}
  public handleOk() {
    const params = {
      'name': this.name,
      'pwd': this.pwd
    };
    this.isLoading = true;
    this.loginService.login(params).subscribe((res: any) => {
      if (res.status === '0') {
        console.log(res.data);
        this.route.navigateByUrl('/manage');
        this.isLoading = false;
        this.isVisible = false;
      } else {
        this.nzModal.warning({
          title: '登录失败',
          content: res.data
        });
        // console.log(res.msg);
        this.isLoading = false;
      }
    });
  }
}
