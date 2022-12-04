import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectCardPageRoutingModule } from './select-card-routing.module';

import { SelectCardPage } from './select-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectCardPageRoutingModule
  ],
  declarations: [SelectCardPage]
})
export class SelectCardPageModule {}
