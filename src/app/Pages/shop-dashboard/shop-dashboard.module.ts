import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopDashboardPageRoutingModule } from './shop-dashboard-routing.module';

import { ShopDashboardPage } from './shop-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopDashboardPageRoutingModule
  ],
  declarations: [ShopDashboardPage]
})
export class ShopDashboardPageModule {}
