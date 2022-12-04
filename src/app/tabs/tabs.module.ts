import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Contacts } from '@ionic-native/contacts/ngx';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage],
  providers:[Contacts,SocialSharing]
})
export class TabsPageModule {}
