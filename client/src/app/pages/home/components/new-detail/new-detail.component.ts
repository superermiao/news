import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HomeService} from '../../home.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'new-detail',
  styleUrls: [
    './new-detail.component.css'
  ],
  templateUrl: './new-detail.component.html'
})
export class NewDetailComponent  implements OnInit {
  // 是否显示登录
  public showLogin = false;
  // 是否显示头像
  public avatar = '';
  // 是否显示用户名
  public userName = '';
  // 用户id
  public userId = '';
  // 路由参数传的id，即新闻ID
  public dataId = '';
  // 新闻名
  public title = '';
  // 新闻内容
  public content = '';
  // 新闻作者
  public author = '';
  // 新闻发布时间
  public time = '';
  // 新闻发布者
  public admin = 'admin';
  // 新闻来源
  public origin = '';
  // 评论输入信息，双向绑定
  public inputValue = '';
  constructor( private route: Router,
               private activeRouter: ActivatedRoute,
               public homeService: HomeService,
               private nzMessage: NzMessageService,
               private nzModal: NzModalService) {}
  public ngOnInit() {
    let currentUser = JSON.parse(sessionStorage.getItem('user'));
    if (currentUser) {
      this.avatar = currentUser.userAvatar ? currentUser.userAvatar : '../../../../../assets/img/avater.gif';
      this.userName = currentUser.userName;
      this.userId = currentUser._id;
      this.showLogin = false;
    } else {
      this.showLogin = true;
    }
    console.log(currentUser);
    this.activeRouter.queryParams.subscribe((params) => {
      if (params['dataId']) {
        this.dataId = params['dataId'];
        this.homeService.findNewsById(this.dataId).subscribe((res: any) => {
          if (res.status === '0') {
            this.author = res.data.author;
            this.content = res.data.content;
            this.origin = res.data.origin ? res.data.origin : '猫眼新闻';
            this.title = res.data.title;
            this.time = res.data.update;
          } else {
            this.nzMessage.error('查询失败');
          }
        });
      }
    });
  }

  /**
   * 添加评论
   */
  public addComment() {
    if (!this.userId) {
      this.nzModal.warning({
        title: '登录之后才能进行评论',
      });
    } else {
      let param = {
        userName: this.userName,
        newsId: this.dataId,
        userId: this.userId,
        content: this.inputValue
      };
      this.homeService.addComment(param).subscribe((res: any) => {
        if (res.status === '0') {
          this.nzModal.success({
            title: '添加成功',
            content: '请等待管理员审核'
          });
        } else {
          this.nzModal.error({
            title: '添加失败',
            content: res.data
          });
        }
      });
    }
  }

}
