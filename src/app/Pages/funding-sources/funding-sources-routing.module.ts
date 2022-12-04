import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FundingSourcesPage } from './funding-sources.page';

const routes: Routes = [
  {
    path: '',
    component: FundingSourcesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FundingSourcesPageRoutingModule {}
