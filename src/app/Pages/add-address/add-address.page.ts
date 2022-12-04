import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { OrderPaymentComponent } from 'src/app/Components/order-payment/order-payment.component';
import { WALLET } from 'src/app/endpoint/endpoint';
import { ApiService } from 'src/app/Service/api.service';
import { AuthService } from 'src/app/Service/auth.service';
import { Country, State, City }  from 'country-state-city';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  addressForm: FormGroup;
  walletCash: any;
  grandTotal: any;
  addType = 'home';
  products: any;
  states: any;
  countryCode: any;
  cities: any;
  selectedCity: any;
  countries: any;
  taxId: any;
  dedAmount: any;
  taxType: any;
  mnumber: any =['(','','','',')',' ','','','','-','','','',''];
  num: any;
  checkBoxConfirms: boolean = false;
  address: any =[];
  constructor(private modal: ModalController,
    private authservice: AuthService,
    private apiservice: ApiService,
    private route: ActivatedRoute,
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private alertController: AlertController) { }
    ionViewWillEnter(){
      this.populateState('US');
      this.getAddressList();
    }
  ngOnInit() {
    this.route.queryParams.subscribe((prams)=>{
      this.walletCash = prams.cash;
      this.grandTotal = prams.amount;
      this.products = JSON.parse(prams.products);
    });
    this.addFormInIt();
  }
  async populateState(countrycode: any){
    this.states = await State.getStatesOfCountry(countrycode);
    this.countryCode = countrycode;
   }
   populateCity(statecode: any){
    this.cities = City.getCitiesOfState(this.countryCode,statecode);
    this.cities['name'] = this.selectedCity;
   }
   addAddress(city: any){
    const address =this.addressForm.controls.city.value +', '+ this.addressForm.controls.state.value +', '+', '+this.addressForm.controls.pinCode.value;

   }

  addFormInIt(): void{
    this.addressForm = this.formbuilder.group({
      name: ['', Validators.compose([Validators.required])],
      mobile: ['', Validators.compose([Validators.required])],
      pinCode: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      addType: [''],
    });
  }
  segmentChanged(ev: any) {
  }
  getAddressList(){
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: localStorage.getItem('accessToken')
    });
    const options = {headers};
    this.http.get(`https://thesavingsbox.com/api/chat-server/public/api/list-address`, options).subscribe((res: any)=>{
      if(res.status==200){
        this.address = res?.addresses;
      }

    });
  }
  getTax(){
    const data = {
      name: this.addressForm.controls.name.value,
      mobile: this.addressForm.controls.mobile.value,
      pin_code: this.addressForm.controls.pinCode.value,
      address: this.addressForm.controls.address.value,
      locality: 'test',
      city: this.addressForm.controls.city.value,
      state: this.addressForm.controls.state.value,
      place_type: this.addressForm.controls.addType.value,
    };
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: localStorage.getItem('accessToken')
    });
    const options = {headers};
    this.http.post(`https://thesavingsbox.com/api/chat-server/public/api/save-address`,data,options).subscribe((res: any)=>{
      if(res){
        this.taxId = res.tax_rate_id;
        this.dedAmount = (this.grandTotal*(res.address.tax_rate.tax_rate/100)).toString();
        this.taxType = res.address.tax_rate.tax_type;
        this.goToPayment(this.taxId,this.taxType,this.dedAmount);
      }
    });
  }
  async goToPayment(taxId: any,taxType: any,dedAmount: any){
    const addProps = {
      name: this.addressForm.controls.name.value,
      mobile: this.addressForm.controls.mobile.value,
      pinCode: this.addressForm.controls.pinCode.value,
      address: this.addressForm.controls.address.value,
      locality: 'Testing Field',
      city: this.addressForm.controls.city.value,
      state: this.addressForm.controls.state.value,
      addType: this.addressForm.controls.addType.value,
    };
    const modal = await this.modal.create({
      component: OrderPaymentComponent,
      backdropDismiss: true,
      componentProps: {dedAmount, taxType, wallet: this.walletCash, amount: this.grandTotal, address: addProps, products: this.products, taxId},
      keyboardClose: true,
      mode: 'ios',
      showBackdrop: true,
      swipeToClose: false,
      id: 'orderDeail',
      // componentProps: { cards: this.cards },
      });
       modal.present();
       await modal.onDidDismiss().then((res) =>{
         this.getAddressList();
         this.addFormInIt();
       });
  }
  deleteAddress(index, id){
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: localStorage.getItem('accessToken')
    });
    const options = {headers};
    this.http.get(`https://thesavingsbox.com/api/chat-server/public/api/delete-address/${id}`,options).subscribe((res: any)=>{
      this.address.splice(index,1);
    });
  }
  selectAddress(address){
    this.addressForm.controls.name.patchValue(address.name);
    this.addressForm.controls.mobile.patchValue(address.mobile);
    this.addressForm.controls.pinCode.patchValue(address.pin_code);
    this.addressForm.controls.address.patchValue(address.address);
    this.addressForm.controls.city.patchValue(address.city);
    this.addressForm.controls.state.patchValue(address.state);
    this.addressForm.controls.addType.patchValue(address.place_type);
    const taxRate= parseFloat(address.tax_rate.tax_rate);
    this.taxId = address.tax_rate_id;
    this.dedAmount = (this.grandTotal*(taxRate/100)).toString();
    this.taxType = address.tax_rate.tax_type;
    this.goToPayment(this.taxId,this.taxType,this.dedAmount);
  }
  async presentAlertConfirm(index: number, id: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Please Confirm',
      mode: 'ios',
      message: '<strong>Are you sure you want to delete this Address?</strong>',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.deleteAddress(index, id);
          }
        }
      ]
    });

    await alert.present();
  }
}
