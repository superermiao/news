import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriesService} from './categories.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
@Component({
  selector: 'categories',
  styleUrls: ['./categories.component.css'],
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {
  public checkedAll = false;
  constructor(private router: Router,
              public categoriesService: CategoriesService,
              private nzModal: NzModalService,
              private nzMessage: NzMessageService,
              private activeRouter: ActivatedRoute) {}
  public ngOnInit() {
    this.categoriesService.getTypeList();
  }

  /**
   * 编辑分类
   * @param id
   */
  public editCategory(id) {
    this.router.navigateByUrl(`/manage/categories/add-type?dataId=${id}`);
  }

  /**
   * 全选影响单选
   */
  public toggleCheckedAll() {
    this.categoriesService.typeList.forEach((ele) => (ele.checked = this.checkedAll));
  }

  /**
   * 单选影响全选
   */
  public refreshStatus() {
    this.checkedAll = this.categoriesService.typeList.every((ele) => ele.checked);
  }

  /**
   * 单个删除或者批量删除分类
   * @param id
   */
  public delete(id?) {
    if (id) {
      this.categoriesService.deleteById(id).subscribe((res: any) => {
        if (res.status === '0') {
          this.nzMessage.success('删除成功');
          this.categoriesService.getTypeList();
        } else {
          this.nzModal.warning({title: '删除失败', content: res.data});
        }
      });
    } else {
      this.categoriesService.deletdMany();
    }
  }
}
