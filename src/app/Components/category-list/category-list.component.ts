import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {

  categoryList$: Observable<any>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.categoryList$ = this.dataService.getCategoryList();
  }
  openCategory(data)
  {
  }
}
