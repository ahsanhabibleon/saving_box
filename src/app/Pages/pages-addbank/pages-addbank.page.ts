import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/Service/api.service';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ADD_BANK_ACCOUNT } from 'src/app/endpoint/endpoint';
import { AuthService } from 'src/app/Service/auth.service';
import { BankService } from '../../Service/bank.service';

// import { Stripe } from '@ionic-native/stripe';
//declare var Stripe: any;
@Component({
  selector: 'app-pages-addbank',
  templateUrl: './pages-addbank.page.html',
  styleUrls: ['./pages-addbank.page.scss'],
})
export class PagesAddbankPage implements OnInit {
  addaccount: FormGroup;
  currenttoken;
  constructor(public router: NavController,public api: ApiService,public authservice:AuthService
    ,private bankservice:BankService) {
      const token = this.authservice.getToken();
      this.bankservice.createtoken(token).subscribe(
        (res: any) => {
          console.log(res);
          this.currenttoken = res.access_token;
        },
        (err) => {
          console.log(err);
          //this.loading.dismiss();
        }
      )
    }

  ngOnInit() {
    this.addAccount();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesAddbankPage');
    this.createToken();
  }
  async createToken(){

  }

  addAccount(): void {
    this.addaccount = new FormGroup({
      name: new FormControl('', Validators.required),
      accountno: new FormControl('', Validators.required),
      routingno: new FormControl('', Validators.required)
    });
  }

  saveAccount() {
    console.log('fhdbfhdabhjabhd');

    if (this.addaccount.valid) {
const costumerid =   localStorage.getItem('customer_id');
      const obj: any={
        customer_id:costumerid,
        routingNumber:this.addaccount.controls.routingno.value,
        accountNumber:this.addaccount.controls.accountno.value,
        name:this.addaccount.controls.name.value
      };
      this.bankservice.addfundingsource(obj,this.currenttoken);
      /*
      const formData = new FormData();
        formData.append('account_name', this.addaccount.controls.name.value);
        formData.append('account_no', this.addaccount.controls.accountno.value);
        formData.append('routing_no', this.addaccount.controls.routingno.value);
        formData.append('user_token', this.authservice.currentUserValue.token);
        this.api.post_request(ADD_BANK_ACCOUNT, formData).subscribe((res: any) => {
          console.log(res);
          //this.comp.presentToast(res.message);
          this.router.pop();
        });
        */
    }
    else {
      //this.comp.presentToast('All fileds are requried');
    }
  }
}
