import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewCyclePageRoutingModule } from './view-cycle-routing.module';
import { ViewCyclePage } from './view-cycle.page';
import { CommonComponentModule } from 'src/app/Components/CommonModule';
import { SharedDirectiveModule } from 'src/app/directives/shared-directive.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewCyclePageRoutingModule,
    CommonComponentModule,
    SharedDirectiveModule
   ],
  declarations: [ViewCyclePage]
})
export class ViewCyclePageModule {}
