import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellerChatsPage } from './seller-chats.page';

const routes: Routes = [
  {
    path: '',
    component: SellerChatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerChatsPageRoutingModule {}
