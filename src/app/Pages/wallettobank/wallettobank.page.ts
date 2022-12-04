import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { BANK_LIST, DELETE_BANK_ACCOUNT, REDEEM_AMOUNT } from 'src/app/endpoint/endpoint';
import { ApiService } from 'src/app/Service/api.service';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-wallettobank',
  templateUrl: './wallettobank.page.html',
  styleUrls: ['./wallettobank.page.scss'],
})
export class WallettobankPage implements OnInit {
  bankAccount=[];
  amount: any = '';
  transferamount: any = '';
  autoManufacturers: any = '';
  // eslint-disable-next-line max-len
  constructor(
     public router: NavController,
     public  authService: AuthService,
     private api: ApiService,
     private alertController: AlertController
     ) { }

  ngOnInit() {

  }
  myFunction() {
    console.log('1');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WallettobankPage');

  }
  ionViewWillEnter() {
    this.amount = localStorage.getItem('walletamount');
    this.getbankAccounts();
  }
  slice(str: string)
  {
    if(str!=null)
    {
      return str.slice(str.length - 5);

    }
  }
  save() {
    console.log(this.transferamount, this.amount);
    // if(this.bankAccount.length === 0){
    //   this.presentAlert('Add a Bank Account');
    // }
    if (this.transferamount === '' || this.transferamount === null) {
      this.presentAlert('Enter Some Amount');
      return false;
    }
    if (Number(this.amount) >= Number(this.transferamount)) {
      this.redeem();
    } else {
      this.presentAlert('Transfer Amount Cannot be Greater Than the Wallet Amount');
    }
  }
  addAccount() {
    this.router.navigateForward('pages-addbank');
  }
  redeem(){
    console.log(this.autoManufacturers, 'ggg');
    // return false;
    // eslint-disable-next-line eqeqeq
    if(this.autoManufacturers == undefined || this.autoManufacturers==null || this.autoManufacturers==''){
      //this.componentProvider.presentToast('Please select card first.');
      return false;
    }
    const formData = new FormData();
    formData.append('user_token', this.authService.currentUserValue.token);
    formData.append('amount', this.transferamount);
    formData.append('account_id', this.autoManufacturers);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    this.api.post_request(REDEEM_AMOUNT, formData).subscribe((res: any) => {
      console.log(res, '++++++++++++++');
      //this.componentProvider.presentToast(res.message);
      this.router.navigateForward('tabs/tabs/tab6');
    });
  }
  getbankAccounts() {
    const formData = new FormData();
    formData.append('user_token', this.authService.currentUserValue.token);
    this.api.post_request(BANK_LIST, formData).subscribe((res: any) => {
      console.log(res.data);
      this.bankAccount = res.data;
    });
  }
  async presentAlert(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      mode: 'ios',
      // subHeader: 'Please Confirm',
      message: `${msg}`,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentAlertConfirm(index: number, bankId: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Please Confirm',
      mode:'ios',
      message: '<strong>Are you sure you want to delete this bank?</strong>',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('no worked');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log(index, bankId, 'Yes worked');
            this.deleteBank(index, bankId);
          }
        }
      ]
    });

    await alert.present();
  }


  deleteBank(index: number, bankId: any){
    const formData = new FormData();
    formData.append('user_token', this.authService.currentUserValue.token);
    formData.append('id', bankId);
    this.api.post_request(DELETE_BANK_ACCOUNT, formData).subscribe(
      (res: any) => {
        if(res.status==='Success'){
          console.log(bankId,'  ',index);
          this.bankAccount.splice(index, 1);
          console.log(res);
        }else{
          console.log(res.message);
        }
        },
      (err: any) => {
        console.log('this is error: ',err);
      });
  }
  navigate(){
    this.router.navigateBack('tabs/tabs/tab6');
  }
}
