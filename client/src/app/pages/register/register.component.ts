import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder, FormControl,
  FormGroup, ValidationErrors,
  Validators
} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {RegisterServices} from './register.services';
import {NzModalService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
@Component({
  selector: 'register',
  styleUrls: [
    './register.component.css'
  ],
  templateUrl: './register.component.html'
})
export class RegisterComponent  implements OnInit {
  public validateForm: FormGroup;
  public userName = '';
  public userPwd = '';
  // 重复密码
  public confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.userPwd.value) {
      return { confirm: true, error: true };
    }
  }
  constructor(private fb: FormBuilder,
              private registerServices: RegisterServices,
              private nzModal: NzModalService,
              private route: Router) {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ]],
      userPwd: [ null, [ Validators.required , Validators.minLength(6), Validators.maxLength(16), Validators.pattern(/^[A-Za-z0-9]+$/)] ],
      copyPwd: [null, [ this.confirmValidator]]
    });
  }
  public ngOnInit() {
  }
  /**
   * @description 获取表单的字段
   */
  public getFormControl(name) {
    return this.validateForm.controls[name];
  }

  /**
   * @description 检验表单
   */
  public submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
     // this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      return true;
    }
  }

  /**
   * 用户名查找
   */
  public userNameAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
    setTimeout(() => {
      this.registerServices.find(control.value).subscribe((res: any) => {
        if (res.status === '0') {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      });
   /*   if (control.value === 'JasonWood') {
        observer.next({ error: true, duplicated: true });
      } else {
        observer.next(null);
      }
      observer.complete();*/
    }, 1000);
  })

  /**
   * 密码验证
   */
  public validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.copyPwd.updateValueAndValidity());
  }

  /**
   * 注册
   */
  public register() {
    if (this.submitForm()) {
      console.log('提交');
      let params = {
        userName: this.validateForm.controls.userName.value,
        userPwd: this.validateForm.controls.copyPwd.value
      };
      this.registerServices.register(params).subscribe((res: any) => {
        if (res.status === '0') {
          this.nzModal.success({
            title: '注册成功',
            content: '你已是本站用户，可以去登录啦'
          });
          setTimeout(() => {
            this.route.navigateByUrl('/login');
          }, 1000);
        } else {
          this.nzModal.warning({
            title: '注册失败',
            content: res.data
          });
        }
      });
    }
  }
}
