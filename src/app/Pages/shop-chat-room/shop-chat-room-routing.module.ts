import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopChatRoomPage } from './shop-chat-room.page';

const routes: Routes = [
  {
    path: '',
    component: ShopChatRoomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopChatRoomPageRoutingModule {}
