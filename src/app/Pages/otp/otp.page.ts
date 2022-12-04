import { OTP_VERIFIY, RESEND_OTP } from './../../endpoint/endpoint';
import { AuthService } from './../../Service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Platform, NavController, AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/Service/api.service';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OTPPage implements OnInit {
  otpform: FormGroup;
  device_type: string='android';
  email: any;
  page: any;
  password: any;

  constructor(public formBuilder: FormBuilder,public platform: Platform,public authservice: AuthService,
    public apiservice: ApiService,public navctrl: NavController, private route: ActivatedRoute, private alert: AlertController) {
    if(this.platform.is('ios'))
    {
      this.device_type='ios';
    }
   }

  ngOnInit() {
    this.otpformInit();
    this.route.queryParams.subscribe((prams)=>{
      this.email = prams.email;
      this.page = prams.page;
      this.password = prams.password;
    });
  }
  otpformInit(): void{
    this.otpform = this.formBuilder.group({
      otp: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],
    });
  }
  resend()
  {
    let fd = new FormData();
    fd.append('email', this.email)
    this.authservice.resendOTP(fd).subscribe((res) => {
      console.log(res);
      if (res['status'] === 'Success') {
         this.otpform.reset();
         console.log(res['status']);
        // this.navCtrl.setRoot(SigninPage)
      } else {

      }
    });
  }

  async showAlert() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Congrats!',
      mode: 'ios',
      message: `Your account has been created please Log In to continue.`,
      buttons: [
        {
          text: `Ok`,
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.navctrl.navigateRoot('login');
          }
        }
      ]
    });
    await alert.present();
  }


  getUserProfile(){
    // const formdata = new FormData();
    // formdata.append('user_token', this.authservice.currentUserValue.token);
    this.authservice
                .profileData()
                .subscribe((ress: any) => {
                  this.authservice.currentUserSubject.next(ress.info);
                  localStorage.setItem('firstName', ress.info.first_ame);
                  localStorage.setItem('lastName', ress.info.last_ame);
                  localStorage.setItem('face_login', ress.info.faceLogin);
                  localStorage.setItem('imageUrl', ress?.info?.image_base_url);
                  localStorage.setItem('userdata', JSON.stringify(ress?.info))
                  // localStorage.setItem('user_id', this.authservice.currentUserValue.user_id);
                  localStorage.setItem('user_id', this.authservice.currentUserValue.user_id);
                  localStorage.setItem('password', this.password);
                  localStorage.setItem('email', this.email);
                  localStorage.setItem('payment_status',ress.info.payment_status);
                  localStorage.setItem('profile_status',ress.info.status);
                  localStorage.setItem('accessToken', this.authservice.currentUserValue.token);
                  this.navctrl.navigateRoot('tabs/tabs/tab1');
                });
  }

  verifyOtp()
  {
    let fd = new FormData();
    fd.append('otp', this.otpform.controls.otp.value);
    fd.append('email', this.email)
    this.authservice.verifyOTP(fd).subscribe((res: any) => {
      console.log(res);
      if(!res.error){
        this.authservice.currentUserSubject.next(res?.details);
        localStorage.setItem('accessToken', this.authservice.currentUserValue.token);
        this.getUserProfile();
      }
      // if (res.data.otp_status===1) {
      //     localStorage.setItem('otp_status',res.data.otp_status);
      //     this.navctrl.navigateForward('payment-method');
          // this.navCtrl.setRoot(ProfileDetailsPage, {profileStatus: this.registeredData.profile_status} )
          // this.navCtrl.setRoot(PaymentMethodPage, {profileStatus: this.registeredData.profile_status, status:'signup'} )
          // localStorage.setItem('paymentover','signup')
          // this.navCtrl.setRoot(ProfileDetailsPage, {profileStatus: this.registeredData.profile_status})
          // this.navCtrl.setRoot(PaymentMethodPage, {profileStatus: this.registeredData.profile_status})


        // this.otpform.reset();
        // this.navCtrl.setRoot(SigninPage)
      // } else {

      // }
    });
  }

}
