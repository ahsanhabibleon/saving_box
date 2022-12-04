import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetupWalletPageRoutingModule } from './setup-wallet-routing.module';

import { SetupWalletPage } from './setup-wallet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetupWalletPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [SetupWalletPage]
})
export class SetupWalletPageModule {}
