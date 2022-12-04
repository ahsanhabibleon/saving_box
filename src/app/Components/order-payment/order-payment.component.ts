import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController, NavParams } from '@ionic/angular';
import { GET_CARD_ADDED, WALLET } from 'src/app/endpoint/endpoint';
import { ApiService } from 'src/app/Service/api.service';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.scss'],
})
export class OrderPaymentComponent implements OnInit {
  cards: any = [];
  selection: boolean;
  walletCash: any;
  grandTotal: any;
  button: boolean;
  add: any;
  products: any =[];
  cardId: any;
  token: string | string[];
  product: any = [];
  taxId: any;
  dedAmount: any;
  taxType: any;
  deliveryAddress: string;
  totalItems: any;
  paymentMethod: string;
  finalTotal: any;
  disCard = true;
  constructor(
    private apiservice: ApiService,
    private authservice: AuthService,
    private modal: ModalController,
    private navprams: NavParams,
    private alertController: AlertController,
    private navCtrl: NavController,
    private http: HttpClient
    )
     {}
  ionViewWillEnter(){
  }
  ngOnInit() {
    this.token = localStorage.getItem('accessToken');
    this.getCards();
    this.add = this.navprams.get('address');
    this.walletCash = this.navprams.get('wallet');
    this.grandTotal = parseFloat(this.navprams.get('amount')).toFixed(2);
    this.products = this.navprams.get('products');
    this.taxId = this.navprams.get('taxId');
    this.taxType = this.navprams.get('taxType');
    this.dedAmount = parseFloat(this.navprams.get('dedAmount')).toFixed(2);
    this.finalTotal = (+this.dedAmount + +this.grandTotal).toFixed(2);
    //this.deliveryAddress = this.add.name + ', '+this.address.address + ', ' + this.address.city + ', ' + this.address.state + ', ' + this.address.pinCode;
    this.totalItems = this.products.length;
  }
  close(){
    this.modal.dismiss();
  }
  getCardId(value: any,change: any){
    this.cardId = value;
    this.disCard = change;
  }
  showCard(value: any){
    if(value == 'cards'){
      this.selection = true;
      this.button = true;
      this.paymentMethod = 'card';
      this.disCard = true;
    }
    else if(value == 'wallet'){
      this.selection = false;
      this.button = true;
      this.paymentMethod = 'wallet';
      this.disCard = false;
    }
  };
  payment(){
    if(this.grandTotal > this.walletCash && this.selection === false){
      this.presentAlert();
    }
    else{
      const headers = new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: this.token
      });
      const options = {headers};
        const data = {
          user_id: localStorage.getItem('user_id'),
          name: this.add.name,
          mobile: this.add.mobile,
          pin_code: this.add.pinCode,
          address: this.add.address,
          locality: this.add.locality,
          city: this.add.city,
          state: this.add.state,
          place_type: this.add.addType,
          products_with_qty: this.products,
          card_id: this.cardId,
          tax_id: this.taxId,
          payment_method: this.paymentMethod
        };
      // const formData = new FormData();
      // formData.append('name', this.address.name);
      // formData.append('mobile', this.address.mobile);
      // formData.append('pin_code', this.address.pinCode);
      // formData.append('address', this.address.address);
      // formData.append('locality', this.address.locality);
      // formData.append('city', this.address.city);
      // formData.append('state', this.address.state);
      // formData.append('place_type', this.address.addType);
      // formData.append('products_with_qty', this.products);
      // formData.append('amount', this.grandTotal);
      // formData.append('card_id', this.cardId);
      this.http.post('https://thesavingsbox.com/api/chat-server/public/api/place-order', data, options).subscribe((res: any)=>{
        if(res){
          this.modal.dismiss();
          this.navCtrl.navigateRoot('shopping-history');
        }
      });
    }
  }
  getCards() {
    const fd = new FormData();
    fd.append('user_token', this.authservice.currentUserValue.token);
    this.apiservice.post_request(GET_CARD_ADDED, fd).subscribe(
      (res: any) => {
        this.cards = res.data;
      },
      (err) => {
      }
    );
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      // header: 'Alert',
      // subHeader: '',
      mode:'ios',
      message: 'Not Enough Amount In Wallet',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
  navigateToAddCard(){
    this.navCtrl.navigateForward('added-payments');
    this.modal.dismiss();
  }
}
