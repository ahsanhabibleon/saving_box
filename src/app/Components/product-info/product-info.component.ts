import { NavigationExtras, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ProductInfoModel } from './product-info-model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements OnInit {

  @Input() showOption: boolean = false;
  @Input() product: any;
  constructor(public router: NavController) {
   }

  ngOnInit() {
  }
  productDetail(data: any)
  {
    const navigationExtra: NavigationExtras={
      queryParams:{
        product: JSON.stringify(data)
      }
    };
    this.router.navigateForward(`product-details`,navigationExtra);
  }
}
