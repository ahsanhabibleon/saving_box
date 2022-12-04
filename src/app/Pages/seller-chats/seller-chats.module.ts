import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellerChatsPageRoutingModule } from './seller-chats-routing.module';

import { SellerChatsPage } from './seller-chats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellerChatsPageRoutingModule
  ],
  declarations: [SellerChatsPage]
})
export class SellerChatsPageModule {}
