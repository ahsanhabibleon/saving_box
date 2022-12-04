import { ADD_CARD, GET_CARD_ADDED } from './../endpoint/endpoint';
import { Stripe } from '@ionic-native/stripe/ngx';
import { UtilsService } from './../Service/utils.service';
import { Component, OnInit } from '@angular/core';
import { CardLabel, FormLabel } from 'ngx-interactive-paycard';
import { ApiService } from '../Service/api.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../Service/auth.service';
import { AlertController, ModalController, NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
})
export class AddCardComponent implements OnInit {
  title = 'ngx-interactive-paycard-demo';
  cardNumberFormat = '#### #### #### ####';
  cardNumberMask = '#### **** **** ####';
  //ex: Optional cardLabels - Spanish
  cardLabel: CardLabel = {
    expires: 'Expiration',
    cardHolder: 'Enter Card Holder Name',
    fullName: '########',
    mm: 'MM',
    yy: 'YY',
  };
  //ex: Optional formLabels - Spanish
  formLabel: FormLabel = {
    cardNumber: 'Enter Card Number',
    cardHolderName: 'Enter Card Holder Name',
    expirationDate: 'Expiry Date',
    expirationMonth: 'Month',
    expirationYear: 'Year',
    cvv: 'CVV',
    submitButton: 'Submit',
  };
  constructor(
    public modalCtrl: ModalController,
    public util: UtilsService,
    public stripe: Stripe,
    public apiservice: ApiService,
    public authservice: AuthService,
    public router: NavController,
    public alertController: AlertController,
    ) {}

  ngOnInit() {
    let button=document.getElementsByClassName('card-form__button')[0] as HTMLElement;
    button.style['background'] = 'rgb(214,49,141) !important'
    this.stripe.setPublishableKey(environment.stripe_payment_Key_Live);
  }

  async onSubmitEvent($event) {
    if (
      $event.cardHolderName != '' &&
      $event.cardNumber != '' &&
      $event.cvv != '' &&
      $event.expirationMonth != '' &&
      $event.expirationYear != ''
    ) {
      const card = {
        cardName: $event.cardHolderName,
        number: $event.cardNumber,
        expMonth: $event.expirationMonth,
        expYear: $event.expirationYear,
        cvc: $event.cvv,
      };
          await this.stripe
          .createCardToken(card)
          .then((token) => {
            let fd = new FormData();
              fd.append('user_token',this.authservice.currentUserValue.token);
              fd.append('card_token', token.id);
              fd.append('brand', token.card.brand.toUpperCase());
              fd.append('exp_month', JSON.stringify(token.card.exp_month));
              fd.append('exp_year', JSON.stringify(token.card.exp_year));
              fd.append('last4', token.card.last4);
              this.apiservice.post_request(ADD_CARD, fd).subscribe((res: any) => {
                this.util.presentToast(res.message,'success');
                this.close();
                //this.router.navigateBack('added-payments');
              //   let alert = this.alert.create({
              //     message: ,
              //     buttons: [
              //       {
              //         text: 'Ok',
              //         handler: () => {
              //           debugger;
              //           if (this.navParams.get('profileStatus') === '0') {
              //             this.navCtrl.setRoot(ProfileDetailsPage, {
              //               profileStatus: this.navParams.get('profileStatus'),
              //             });
              //           } else {
              //             if (localStorage.getItem('paymentover') === 'signup') {
              //               this.navCtrl.setRoot(SigninPage);
              //             } else {
              //               this.navCtrl.setRoot(TabsPage);
              //             }
              //           }
              //         },
              //       },
              //     ],
              //   });
              //   alert.present();
              // });
          })
          // .catch((error) => {
          //   // loader.dismiss();
          //   // let alert = this.alert.create({
          //   //   message: error,
          //   //   buttons: [
          //   //     {
          //   //       text: 'Ok',
          //   //       role: 'Close',
          //   //     },
          //   //   ],
          //   // });
          //   // alert.present();
          // });
      }).catch((err)=>{
        if(err)
        {
        this.util.presentToast(JSON.stringify(err), 'danger');
        }
      });
    }
  else {
      this.util.presentToast('All fileds above are requried', 'danger');
    }
}

async presentAlertDuplicate() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Alert',
    //subHeader: 'Please Confirm',
    message: 'Card Already Exist',
    buttons: ['OK']
  });

  await alert.present();

  const { role } = await alert.onDidDismiss();
}
  async presentAlertName() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      //subHeader: 'Please Confirm',
      message: 'Please enter the card with your name on it.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  showChangesCard($event) {
    // any changes on card (number, name, month, year, cvv)
  }

  showChangesCardNumber($event) {
    // any changes on card number
  }
  async close(){
    await this.modalCtrl.dismiss();
  }
}
