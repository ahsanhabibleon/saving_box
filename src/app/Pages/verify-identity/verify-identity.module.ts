import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyIdentityPageRoutingModule } from './verify-identity-routing.module';

import { VerifyIdentityPage } from './verify-identity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyIdentityPageRoutingModule
  ],
  declarations: [VerifyIdentityPage]
})
export class VerifyIdentityPageModule {}
