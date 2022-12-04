import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchedProductPageRoutingModule } from './searched-product-routing.module';

import { SearchedProductPage } from './searched-product.page';
import { SharedDirectiveModule } from 'src/app/directives/shared-directive.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchedProductPageRoutingModule,
    SharedDirectiveModule
  ],
  declarations: [SearchedProductPage]
})
export class SearchedProductPageModule {}
