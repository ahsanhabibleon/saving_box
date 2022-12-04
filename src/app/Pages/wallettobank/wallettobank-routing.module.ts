import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WallettobankPage } from './wallettobank.page';

const routes: Routes = [
  {
    path: '',
    component: WallettobankPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WallettobankPageRoutingModule {}
