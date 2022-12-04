import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchedProductPage } from './searched-product.page';

const routes: Routes = [
  {
    path: '',
    component: SearchedProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchedProductPageRoutingModule {}
