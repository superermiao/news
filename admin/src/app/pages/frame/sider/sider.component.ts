import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'admin-sider',
  styleUrls: ['./sider.component.css'],
  templateUrl: './sider.component.html'
})
export class SiderComponent implements OnInit {
  public isCollapsed = false;
  public tabBarsData = [
    {name: '新闻管理',router: 'news',checked: 'true',selected: 'true'},
    {name: '用户管理',router: 'users',checked: 'true',selected: 'true'},
    {name: '类别管理',router: 'categories',checked: 'true',selected: 'true'},
    {name: '留言管理',router: 'comments',checked: 'true',selected: 'true'}
  ];
  constructor(){}
  public ngOnInit() {}
}
