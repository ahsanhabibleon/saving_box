import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingHistoryPageRoutingModule } from './shopping-history-routing.module';

import { ShoppingHistoryPage } from './shopping-history.page';
import { OrderDetailComponent } from 'src/app/Components/order-detail/order-detail.component';
import { SharedDirectiveModule } from 'src/app/directives/shared-directive.module';
// import { OrderDetailComponent } from 'src/app/Components/order-detail/order-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingHistoryPageRoutingModule,
    SharedDirectiveModule
  ],
  providers:[],
  declarations: [ShoppingHistoryPage,OrderDetailComponent]
})
export class ShoppingHistoryPageModule {}
