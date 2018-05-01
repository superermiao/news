import { Component, OnInit } from '@angular/core';
import { AddTypeServices } from './add-type.services';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminListService} from '../../users/admin-component/admin-list.service';
@Component({
  selector: 'add-type',
  styleUrls: ['./add-type.component.css'],
  templateUrl: './add-type.component.html'
})
export class AddTypeComponent implements OnInit {
  public typeName;
  public dataId = '';
  constructor(private addTypeServices: AddTypeServices,
              private nzModal: NzModalService,
              private activeRouter: ActivatedRoute,
              private router: Router) {}
  public ngOnInit() {
    this.getTypeName();
  }

  /**
   * 保存
   */
  public submit($event) {
    $event.preventDefault();
    if (this.typeName && this.typeName.trim().length <= 4) {
      if (!this.dataId) {
        this.addTypeServices.addType(this.typeName).subscribe((res: any) => {
          if (res.status === '0') {
            this.nzModal.success({title: '添加成功'});
          } else {
            this.nzModal.success({title: '添加失败', content: res.data});
          }
        });
      } else {
        this.addTypeServices.updateType(this.dataId, this.typeName).subscribe((res: any) => {
          if (res.status === '0') {
            this.nzModal.success({title: '修改成功'});
          } else {
            this.nzModal.success({title: '修改失败', content: res.data});
          }
        });
      }
    }
  }

  /**
   * 获取修改某一项的名称
   */
  public getTypeName() {
    this.activeRouter.queryParams.subscribe((params) => {
      if (params['dataId']) {
        this.dataId = params['dataId'];
        this.addTypeServices.findOneType(this.dataId).subscribe((res: any) => {
          if (res.status === '0') {
            this.typeName = res.data.categoryName;
          } else {
            console.log('查询失败');
          }
        });
      }
    });
  }

  /**
   * 取消
   */
  public cancel() {}
}
