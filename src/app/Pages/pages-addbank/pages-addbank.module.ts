import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagesAddbankPageRoutingModule } from './pages-addbank-routing.module';

import { PagesAddbankPage } from './pages-addbank.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PagesAddbankPageRoutingModule
  ],
  declarations: [PagesAddbankPage]
})
export class PagesAddbankPageModule {}
