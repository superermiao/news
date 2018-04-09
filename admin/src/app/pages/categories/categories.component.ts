import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'categories',
  styleUrls: ['./categories.component.css'],
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {
  constructor(private router: Router){}
  public ngOnInit() {}
  /*public goToAdd() {
    this.router.navigateByUrl('categories/add-type');
  }*/
}
