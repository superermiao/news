import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit{
  public ngOnInit() {}
  public siderIsCollapsed: boolean = false;
}
