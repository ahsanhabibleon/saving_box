import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CategoryListComponent } from './category-list/category-list.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { SharedDirectiveModule } from '../directives/shared-directive.module';
import { VerifyFundingSourceComponent } from './verify-funding-source/verify-funding-source.component';
import { ProcessSuccessComponent } from './process-success/process-success.component';
import { UnAuthorizedComponent } from './un-authorized/un-authorized.component';


@NgModule({
  declarations: [ProductInfoComponent,CategoryListComponent, ContactListComponent, VerifyFundingSourceComponent,  ProcessSuccessComponent, UnAuthorizedComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedDirectiveModule
  ],
  exports: [ProductInfoComponent, CategoryListComponent, ContactListComponent,VerifyFundingSourceComponent, ProcessSuccessComponent, UnAuthorizedComponent]
})
export class CommonComponentModule { }
