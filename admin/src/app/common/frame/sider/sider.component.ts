import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'admin-sider',
  styleUrls: ['./sider.component.css'],
  templateUrl: './sider.component.html'
})
export class SiderComponent implements OnInit {
  public isCollapsed = false;
  public tabBarsData = [
    {name: '新闻管理', router: 'news', checked: 'true', selected: 'true', icon: 'anticon-book', children: {}},
    {name: '用户管理', router: 'users', checked: 'true', selected: 'true', icon: 'anticon-user', children: [
      {name: '用户列表', router: 'users-user', checked: 'true', selected: 'true', icon: '', children: {}},
      {name: '管理员列表', router: 'users-admin', checked: 'true', selected: 'true', icon: '', children: {}}
    ]},
    {name: '类别管理', router: 'categories', checked: 'true', selected: 'true', icon: 'anticon-bars', children: {}},
    {name: '留言管理', router: 'comments', checked: 'true', selected: 'true', icon: 'anticon-mail', children: {}}
  ];
  constructor() {}
  public ngOnInit() {}

  /**
   * 过滤导航栏
   */
  private filterSubTabs(children): boolean {
    if (Object.keys(children).length === 0) {
      return false;
    } else {
      return true;
    }
  }

}
