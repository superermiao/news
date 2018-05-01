import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public isVisible = true;
  public name = 'admin';
  public pwd = 'admin';
  constructor(private loginService: LoginService,
              private route: Router){}
  public ngOnInit() {}
  public handleOk() {
    let params = {
      'name': this.name,
      'pwd': this.pwd
    };
    this.loginService.login(params).subscribe((res: any) => {
      if (res.status === '0') {
        console.log(res.data);
        this.route.navigateByUrl('/manage');
      } else {
        console.log(res.msg);
      }
      this.isVisible = false;
    });
  }
}
