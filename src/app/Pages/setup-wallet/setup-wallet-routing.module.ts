import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetupWalletPage } from './setup-wallet.page';

const routes: Routes = [
  {
    path: '',
    component: SetupWalletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetupWalletPageRoutingModule {}
