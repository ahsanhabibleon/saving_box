import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateProfilePageRoutingModule } from './create-profile-routing.module';
import { CreateProfilePage } from './create-profile.page';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { SharedDirectiveModule } from 'src/app/directives/shared-directive.module';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CreateProfilePageRoutingModule,
    NgxMaskModule.forRoot(maskConfig),
    SharedDirectiveModule
  ],
  declarations: [CreateProfilePage]
})
export class CreateProfilePageModule {}
