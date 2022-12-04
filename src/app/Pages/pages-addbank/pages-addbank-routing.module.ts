import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesAddbankPage } from './pages-addbank.page';

const routes: Routes = [
  {
    path: '',
    component: PagesAddbankPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesAddbankPageRoutingModule {}
