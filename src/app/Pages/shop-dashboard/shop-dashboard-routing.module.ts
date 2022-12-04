import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopDashboardPage } from './shop-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: ShopDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopDashboardPageRoutingModule {}
