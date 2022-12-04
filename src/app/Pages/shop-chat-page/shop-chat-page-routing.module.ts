import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopChatPagePage } from './shop-chat-page.page';

const routes: Routes = [
  {
    path: '',
    component: ShopChatPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopChatPagePageRoutingModule {}
