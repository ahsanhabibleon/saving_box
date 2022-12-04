import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CommonComponentModule } from 'src/app/Components/CommonModule';
import { ListenModalComponent } from 'src/app/Components/listen-modal/listen-modal.component';
import { SharedDirectiveModule } from 'src/app/directives/shared-directive.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonComponentModule,
    HomePageRoutingModule,
    SharedDirectiveModule
  ],
  declarations: [HomePage, ListenModalComponent],

})
export class HomePageModule {}
