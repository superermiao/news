import { Component, OnInit } from '@angular/core';
import { AddTypeServices } from './add-type.services';
@Component({
  selector: 'add-type',
  styleUrls: ['./add-type.component.css'],
  templateUrl: './add-type.component.html'
})
export class AddTypeComponent implements OnInit {
  public typeName;
  constructor(private addTypeServices: AddTypeServices) {}
  public ngOnInit() {}

  /**
   * 保存
   */
  public submit() {
    this.addTypeServices.addType(1, this.typeName).subscribe((res: any) => {
      if (res.status === 0) {
        alert('添加成功');
      } else {
        alert('添加失败');
      }
    });
  }

  /**
   * 取消
   */
  public cancel() {}
}
