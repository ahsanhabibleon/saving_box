import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddAddressPageRoutingModule } from './add-address-routing.module';
import { AddAddressPage } from './add-address.page';
import { OrderPaymentComponent } from 'src/app/Components/order-payment/order-payment.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { SharedDirectiveModule } from 'src/app/directives/shared-directive.module';

const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAddressPageRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),
    SharedDirectiveModule
  ],
  declarations: [AddAddressPage, OrderPaymentComponent],
  providers:[]
})
export class AddAddressPageModule {}
