import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder, FormControl,
  FormGroup, ValidationErrors,
  Validators
} from '@angular/forms';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {ProfileService} from './profile.service';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
@Component({
  selector: 'profile',
  styleUrls: [
    './profile.component.css'
  ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent  implements OnInit  {
  public validateForm: FormGroup;
  // 是否显示登录
  public showLogin = false;
  // 是否显示头像
  public avatar = '';
  // 是否显示用户名
  public name = '';
  // 当前用户ID
  public userId = '';
  // 是基本信息还是密码修改
  public mode = 1;
  // 用户上传头像
  public userAvatar = '';
  // 用户密保问题
  public userQuestion = '';
  // 原始密码
  public originPwd = '';
  // 新密码
  public newPwd = '';
  // 重复新密码
  public confirmNewPwd = '';
  constructor(private fb: FormBuilder,
              private nzModal: NzModalService,
              private nzMessage: NzMessageService,
              public profileService: ProfileService,
              private route: Router) {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ]],
      userTel: [ null, [  Validators.pattern(/^[0-9]{11}$/) ]],
      userEmail: [ null, [ Validators.pattern(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/) ]],
      userSign: [null, [Validators.maxLength(30)]],
      userRealName: [null],
      userAddress: [null],
      userAnswer: [null, [ Validators.required ]],
      userQuestion: [null, [ Validators.required ]]
    });
  }
  public ngOnInit() {
    const currentUser = JSON.parse(sessionStorage.getItem('user'));
    if (currentUser) {
      this.avatar = currentUser.userAvatar ? currentUser.userAvatar : '../../../assets/img/avater.gif';
      this.name = currentUser.userName;
      this.userId = currentUser._id;
      this.showLogin = false;
    } else {
      this.showLogin = true;
    }
    // 获取密保问题
    this.profileService.getAllQuestion();
    // 查找当前用户的信息
    this.profileService.findUserById(this.userId).subscribe((res: any) => {
      if (res.status === '0') {
        this.validateForm = this.fb.group({
          userName: [ res.data.userName, [ Validators.required ]],
          userTel: [ res.data.userTel, [  Validators.pattern(/^[0-9]{11}$/) ]],
          userEmail: [ res.data.userEmail, [ Validators.pattern(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/) ]],
          userSign: [res.data.userSign, [Validators.maxLength(30)]],
          userRealName: [res.data.userRealName],
          userAddress: [res.data.userAddress],
          userAnswer: [res.data.userAnswer, [ Validators.required ]],
          userQuestion: [res.data.userQuestion, [ Validators.required ]]
        });
        this.userAvatar = res.data.userAvatar;
        this.userQuestion = res.data.userQuestion;
      } else {
        this.nzMessage.error('查找失败');
      }
    });
    console.log(currentUser);
    console.log(this.userQuestion);
  }

  /**
   * 保存基本信息
   */
  public save() {
    if (this.submitForm()) {
      let param = {
        userName: this.validateForm.controls.userName.value,
        userTel: this.validateForm.controls.userTel.value,
        userEmail: this.validateForm.controls.userEmail.value,
        userSign: this.validateForm.controls.userSign.value,
        userRealName: this.validateForm.controls.userRealName.value,
        userAddress: this.validateForm.controls.userAddress.value,
        userAvatar: this.userAvatar,
        userAnswer:  this.validateForm.controls.userAnswer.value,
        userQuestion: this.validateForm.controls.userQuestion.value
      };
      console.log(this.userQuestion);
      this.profileService.updateUser(this.userId, param).subscribe((res: any) => {
        if (res.status === '0') {
          this.nzModal.success({
            title: '保存成功',
            content: ''
          });
          // 先清除storage
          sessionStorage.clear();
          // 再重新设置
          let data = {};
          // 不存密码
          data = Object.assign(res.data);
          delete data['userPwd'];
          sessionStorage.setItem('user', JSON.stringify(data));
          const currentUser = JSON.parse(sessionStorage.getItem('user'));
          if (currentUser) {
            this.avatar = currentUser.userAvatar ? currentUser.userAvatar : '../../../assets/img/avater.gif';
            this.name = currentUser.userName;
            this.userId = currentUser._id;
            this.showLogin = false;
          } else {
            this.showLogin = true;
          }
        } else {
          this.nzModal.warning({
            title: '保存失败',
            content: res.data
          });
        }
      });
    }
  }
  /**
   * @description 检验表单
   */
  public submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
    if (this.validateForm.valid) {
      return true;
    }
  }

  /**
   * 改变mode
   */
  public changeMode(id) {
    this.mode = id;
  }

  /**
   * 添加图片
   */
  public addAvatar($event) {
    /*input_file：文件按钮对象*/
    /*get_data: 转换成功后执行的方法*/
    if ( typeof(FileReader) === 'undefined' ) {
      alert('抱歉，你的浏览器不支持 FileReader，不能将图片转换为Base64，请使用现代浏览器操作！');
    } else {
      try {
        /*图片转Base64 核心代码*/
        const file = $event.target.files[0];
        console.log(file);
        // 这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
        if (!/image\/\w+/.test(file.type)) {
          alert('请确保文件为图像类型');
          return false;
        }
        const reader = new FileReader();
        let that = this;
        reader.onload = function() {
         console.log('图片转换:', this.result);
          that.userAvatar = this.result;
        };
        console.log(this.userAvatar);
        reader.readAsDataURL(file);
      } catch (e) {
        console.log('ss', e.toString());
      }
    }
  }

  /**
   * 修改密码
   */
  public updatePwd() {
    let pattern = /^[A-Za-z0-9]{6,16}$/;
    if (!this.originPwd) {
      this.nzModal.warning({
        title: '当前密码不能为空',
        content: '请输入当前密码'
      });
    } else if (!this.newPwd) {
      this.nzModal.warning({
        title: '新密码不能为空',
        content: '请输入新的密码'
      });
    } else if (!pattern.test(this.newPwd)) {
      this.nzModal.warning({
        title: '请输入6-16位由英文或字母组成的密码',
      });
    } else if (!this.confirmNewPwd) {
      this.nzModal.warning({
        title: '请再次重复新的密码',
      });
    } else if (this.confirmNewPwd !== this.newPwd) {
      this.nzModal.warning({
        title: '两次密码不一致'
      });
    } else if (this.originPwd === this.newPwd) {
      this.nzModal.warning({
        title: '新密码不能和当前密码一致'
      });
    } else {
      let param = {
        userName: this.name,
        originPwd: this.originPwd,
        newPwd: this.confirmNewPwd
      };
      this.profileService.updatePwd(param).subscribe((res: any) => {
        if (res.status === '0') {
          this.nzModal.success({
            title: '密码修改成功',
            content: '请重新登录'
          });
          setTimeout(() => {
            this.route.navigateByUrl('/login');
          }, 1000);
        } else {
          this.nzModal.warning({
            title: '密码修改失败',
            content: res.data
          });
        }
      });
    }
  }
}
