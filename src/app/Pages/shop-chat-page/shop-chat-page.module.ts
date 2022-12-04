import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopChatPagePageRoutingModule } from './shop-chat-page-routing.module';

import { ShopChatPagePage } from './shop-chat-page.page';
import { SharedDirectiveModule } from 'src/app/directives/shared-directive.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopChatPagePageRoutingModule,
    SharedDirectiveModule
  ],
  declarations: [ShopChatPagePage]
})
export class ShopChatPagePageModule {}
