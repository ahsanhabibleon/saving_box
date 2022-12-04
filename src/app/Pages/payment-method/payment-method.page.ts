import { UtilsService } from './../../Service/utils.service';
import { ADD_CARD, GET_PROFILE_USER } from './../../endpoint/endpoint';
import {
  ModalController,
  NavController,
  NavParams,
  Platform,
} from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import * as moment from 'moment';
import { Stripe } from '@ionic-native/stripe/ngx';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/Service/auth.service';
import { AddCardComponent } from 'src/app/add-card/add-card.component';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.page.html',
  styleUrls: ['./payment-method.page.scss'],
})
export class PaymentMethodPage implements OnInit {
  visaMasterForm: FormGroup;
  paypalForm: FormGroup;
  bankForm: FormGroup;
  paymentmethod: FormGroup;
  form: {
    paymentmethod: 'visa' | 'master' | 'paypal' | 'bank';
  } = {
    paymentmethod: 'bank',
  };
  constructor(
    public formBuilder: FormBuilder,
    public router: NavController,
    public apiservice: ApiService,
    public navCtrl: NavController,
    private stripe: Stripe,
    public authservice: AuthService,
    public modal: ModalController,
    public utils:UtilsService
  ) {}

  selecttype(ev) {
    this.addPayment();
  }
  async addPayment() {
    let modal = await this.modal.create({
      component: AddCardComponent,
    });
    modal.present();
  }

  ngOnInit() {
    this.paymentFormInit();
    this.stripe.setPublishableKey(environment.stripe_payment_Key_Live);
  }

  paymentFormInit(): void {
    this.visaMasterForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      cardNum: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(16)]),
      ],
      cardExp: ['', Validators.compose([Validators.required])],
      cardCvv: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(4)]),
      ],
    });
    this.bankForm = this.formBuilder.group({
      holderName: ['', Validators.compose([Validators.required])],
      acNumber: ['', Validators.compose([Validators.required])],
      roNumber: ['', Validators.compose([Validators.required])],
    });
    this.paypalForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required]), Validators.email],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  gotoHome() {
    const formData = new FormData();
    const year = moment(
      this.visaMasterForm.controls.cardExp.value,
      'MM/YYYY'
    ).format('YYYY');
    const month = moment(
      this.visaMasterForm.controls.cardExp.value,
      'MM/YYYY'
    ).format('MM');
    const cardToken = {
      // eslint-disable-next-line id-blacklist
      number: this.visaMasterForm.controls.cardNum.value,
      expMonth: parseInt(month),
      expYear: parseInt(year),
      cvc: this.visaMasterForm.controls.cardCvv.value,
    };
    this.stripe.createCardToken(cardToken).then((token) => {
      console.log(token);
      formData.append('user_token', this.authservice.currentUserValue.token);
      formData.append('card_token', token.id);
      formData.append('brand', token.card.brand);
      formData.append('exp_month', JSON.stringify(token.card.exp_month));
      formData.append('exp_year', JSON.stringify(token.card.exp_year));
      formData.append('last4', token.card.last4);
      this.apiservice.post_request(ADD_CARD, formData).subscribe(
        (res: any) => {
          console.log(res);
          if (res.status == 'Success') {
            this.visaMasterForm.reset();
            this.router.navigateForward('create-profile');
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }).catch((err)=>{
      if(err)
      {
        this.utils.presentToast(JSON.stringify(err),'danger');
      }
    });
  }
  skip(){
    if(localStorage.getItem('profile_status')==='1'){
      this.router.navigateRoot('tabs/tabs/tab1');
    }
    else{
      this.navCtrl.navigateRoot('create-profile');
    }
  }
  gotoBank() {}
  gotoPaypal() {}
}
