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
    this.categoriesService.typeList.forEach((ele) => (ele.checked = this.categoriesService.checkedAll));
  }

  /**
   * 单选影响全选
   */
  public refreshStatus() {
    this.categoriesService.checkedAll = this.categoriesService.typeList.every((ele) => ele.checked);
  }

  /**
   * 单个删除或者批量删除分类
   * @param id
   */
  public delete(id?) {
    if (id) {
      this.categoriesService.deleteById(id).subscribe((res: any) => {
        if (res.status === '0') {
          // 当当前页数不为1，并且数据删除完，则应该跳到上一页
          if ((this.categoriesService.checkedAll && this.categoriesService.typeList.length >= 1) ||
            (!this.categoriesService.checkedAll && this.categoriesService.typeList.length === 1)) {
            if (this.categoriesService.page > 1) {
              this.categoriesService.page--;
            }
          }
          this.nzMessage.success('删除分类成功');
          this.categoriesService.getTypeList();
        } else {
          this.nzModal.warning({title: '删除失败', content: res.data});
        }
      });
    } else {
      this.categoriesService.deletdMany().subscribe((res: any) => {
        if (res.status === '0') {
          // 当当前页数不为1，并且数据删除完，则应该跳到上一页
          if ((this.categoriesService.checkedAll && this.categoriesService.typeList.length >= 1) ||
            (!this.categoriesService.checkedAll && this.categoriesService.typeList.length === 1)) {
            if (this.categoriesService.page > 1) {
              this.categoriesService.page--;
            }
          }
          this.nzMessage.success('删除分类成功');
          this.categoriesService.getTypeList();
        } else {
          this.nzModal.warning({title: '删除分类失败', content: res.data});
        }
      });
    }
  }
}
