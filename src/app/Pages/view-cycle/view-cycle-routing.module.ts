import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCyclePage } from './view-cycle.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCyclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCyclePageRoutingModule {}
