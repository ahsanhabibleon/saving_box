import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddedPaymentsPageRoutingModule } from './added-payments-routing.module';

import { AddedPaymentsPage } from './added-payments.page';
import { SharedDirectiveModule } from 'src/app/directives/shared-directive.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddedPaymentsPageRoutingModule,
    SharedDirectiveModule
  ],
  declarations: [AddedPaymentsPage]
})
export class AddedPaymentsPageModule {}
