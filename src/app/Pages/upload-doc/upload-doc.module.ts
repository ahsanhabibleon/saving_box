import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadDocPageRoutingModule } from './upload-doc-routing.module';

import { UploadDocPage } from './upload-doc.page';
import { SharedDirectiveModule } from 'src/app/directives/shared-directive.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadDocPageRoutingModule,
    SharedDirectiveModule
  ],
  declarations: [UploadDocPage]
})
export class UploadDocPageModule {}
