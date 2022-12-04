import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddedPaymentsPage } from './added-payments.page';

const routes: Routes = [
  {
    path: '',
    component: AddedPaymentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddedPaymentsPageRoutingModule {}
