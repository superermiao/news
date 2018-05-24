import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'header',
  styleUrls: [
    './header.component.css'
  ],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input() img: string;
  @Input() showLogin = false;
  @Input() name: string ;
  // public img = 'https://photo.pic.sohu.com/images/oldblog/person/11111.gif';
  constructor(private route: Router) {}
  // 退出系统
  public loginOut() {
    sessionStorage.clear();
    this.route.navigateByUrl('/login');
  }
}
