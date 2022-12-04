import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
//import { NgxCurrencyModule } from "ngx-currency";
import { Tab3PageRoutingModule } from './tab3-routing.module';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
// import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';;
import { CommonComponentModule } from '../Components/CommonModule';
// eslint-disable-next-line @typescript-eslint/naming-convention
import  {MatCurrencyFormatModule} from 'mat-currency-format';
import { SharedDirectiveModule } from '../directives/shared-directive.module';
// import { NgxMaskModule, IConfig } from 'ngx-mask';
// const maskConfig: Partial<IConfig> = {
//   validation: false,
//   prefix: '$ ',
//   thousandSeparator: ',',
//   decimalMarker:'.',
//   dropSpecialCharacters: false,
// };
export const customCurrencyMaskConfig = {
  align: 'right',
  allowNegative: false,
  allowZero: true,
  decimal: '.',
  precision: 2,
  prefix: '$ ',
  suffix: '',
  thousands: ',',
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    //NgxCurrencyModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
    CommonComponentModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    MatCurrencyFormatModule,
    SharedDirectiveModule
    // CurrencyMaskModule
  ],
  providers:[CurrencyPipe],
  declarations: [Tab3Page],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab3PageModule {}
