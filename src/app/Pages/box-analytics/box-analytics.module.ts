import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoxAnalyticsPageRoutingModule } from './box-analytics-routing.module';
import { NgxGaugeModule } from 'ngx-gauge';

import { BoxAnalyticsPage } from './box-analytics.page';
import {ProgressBarModule} from "angular-progress-bar"
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxGaugeModule,
    IonicModule,
    ProgressBarModule,
    BoxAnalyticsPageRoutingModule
  ],
  declarations: [BoxAnalyticsPage]
})
export class BoxAnalyticsPageModule {}
