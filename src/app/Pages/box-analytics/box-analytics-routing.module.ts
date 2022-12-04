import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoxAnalyticsPage } from './box-analytics.page';

const routes: Routes = [
  {
    path: '',
    component: BoxAnalyticsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoxAnalyticsPageRoutingModule {}
