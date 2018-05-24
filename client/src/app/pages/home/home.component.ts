import {Component, OnInit, ViewChild} from '@angular/core';
import {HomeService} from './home.service';
import {NewListComponent} from "./components/new-list/new-list.component";
import {Router} from "@angular/router";

@Component({
  selector: 'home',
  styleUrls: [
    './home.component.css'
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  /*public array = [1,1,1,1,1,1,1,11,1,1,1,1,1,1];*/
  // 是否显示登录
  public showLogin = false;
  // 是否显示头像
  public avatar = '';
  // 是否显示用户名
  public userName = '';
  // 当前页数
  public current = 1;
  constructor(public homeService: HomeService,
              private route: Router) {}
  public ngOnInit() {
    this.homeService.getCategory();
    this.homeService.getNewsList();
    let currentUser = JSON.parse(sessionStorage.getItem('user'));
    if (currentUser) {
      this.avatar = currentUser.userAvatar ? currentUser.userAvatar : '../../../assets/img/avater.gif';
      this.userName = currentUser.userName;
      this.showLogin = false;
    } else {
      this.showLogin = true;
    }
    console.log(currentUser);
  }

  /**
   * 处理空的字符串
   */
  public getName(origin, newItem) {
    if (!origin) {
      return newItem;
    } else {
      return origin;
    }
  }

  /***
   * 根据ID查询新闻
   */
  public getNewDetail(id) {
    this.route.navigateByUrl(`/new-detail?dataId=${id}`);
  }

  /**
   * 处理图片
   */
  public getImg(content) {}
}
