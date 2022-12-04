import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {DpDatePickerModule} from 'ng2-date-picker';
import { EditProfilePageRoutingModule } from './edit-profile-routing.module';
import { EditProfilePage } from './edit-profile.page';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { SharedDirectiveModule } from 'src/app/directives/shared-directive.module';

const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditProfilePageRoutingModule,
    DpDatePickerModule,
    NgxMaskModule.forRoot(maskConfig),
    SharedDirectiveModule
  ],
  declarations: [EditProfilePage]
})
export class EditProfilePageModule {}
