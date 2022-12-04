import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { TRANSACTION_HISTORY, WALLET } from 'src/app/endpoint/endpoint';
import { ApiService } from 'src/app/Service/api.service';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  walletCash: number;
  transaction: any;
  bankAccount: any;
  payment_status = localStorage.getItem('payment_status')
  moment= moment;
  constructor(
    public router: Router,
    public navCtrl: NavController,
    private authservice: AuthService,
    public api: ApiService
  ) {
    console.log('wallet');
  }
  ionViewWillEnter(){
    this.getWalletOut();
  }
  ngOnInit() {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletpagePage');
  }

  transferAmount() {
    this.navCtrl.navigateRoot('walletbank');
  }
  convertTime(data) {
    return moment(data).format('DD MMMM YYYY, h:mm:ss a');
  }

  getWalletOut() {
    const formData = new FormData();
    formData.append('user_token', this.authservice.currentUserValue.token);

    this.api.post_request(WALLET, formData).subscribe((res: any) => {
      console.log(res);
      if (res.status === 'Success') {
        this.walletCash = JSON.parse(res.data.wallet);
        // this.authservice.currentUserValue.wallet_cash = JSON.parse(
        //   res.data.wallet
        // );
      } else {
        this.walletCash = 0;
      }
      localStorage.setItem('walletamount', JSON.stringify(this.walletCash));
      this.getTransaction();
    });
  }

  getTransaction() {
    const formData = new FormData();
    formData.append('user_token', this.authservice.currentUserValue.token);
    this.api
      .post_request(TRANSACTION_HISTORY, formData)
      .subscribe((res: any) => {
        this.transaction = res.data;
        // this.transaction.forEach(ele => {
        //   ele['sortDate'] = new Date(ele.date).getTime();
        // });
        this.transaction.sort((a: any,b: any)=> b.id - a.id);
        console.log('sorted : ',this.transaction);
      });
  }
}
