import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { FORGET_PASSWORD } from 'src/app/endpoint/endpoint';
import { ApiService } from 'src/app/Service/api.service';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  forgetform: FormGroup;
  loading: any;
    constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public formBuilder: FormBuilder,
      public api: ApiService,
      private auth: AuthService) {
      this.forgetform = this.formBuilder.group({
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
          ]),
        ],
      });
    }
    ngOnInit(){}
    ionViewDidLoad() {
    }
    forgetPassword(){
      const fd=new FormData();
      const email = this.forgetform.controls.email.value;
      fd.append('email',email);
      this.auth.forgotPassword(fd).subscribe((res: any)=>{
      console.log(res);
      if(!res.error){
        this.forgetform.reset();
        this.navCtrl.pop();
        const navigationExtra: NavigationExtras = {
          queryParams:{
            email
          }
        };
        // this.navCtrl.navigateForward('change-password', navigationExtra);
      }else{
        console.log('error');
      }
    });
    }
    goTo(){
      this.navCtrl.pop();
    }
    pop(){
      this.navCtrl.pop();
    }
}
