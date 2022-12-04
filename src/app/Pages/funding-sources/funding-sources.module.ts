import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FundingSourcesPageRoutingModule } from './funding-sources-routing.module';

import { FundingSourcesPage } from './funding-sources.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FundingSourcesPageRoutingModule
  ],
  declarations: [FundingSourcesPage]
})
export class FundingSourcesPageModule {}
