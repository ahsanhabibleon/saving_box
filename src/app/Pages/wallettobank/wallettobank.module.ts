import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WallettobankPageRoutingModule } from './wallettobank-routing.module';
import { WallettobankPage } from './wallettobank.page';
import { IonicModule } from '@ionic/angular';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    WallettobankPageRoutingModule,
    CurrencyMaskModule,
    FormsModule
  ],
  declarations: [WallettobankPage]
})
export class WallettobankPageModule {}
