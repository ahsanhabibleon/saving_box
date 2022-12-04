import { GET_PROFILE_USER, LOGIN, LOGIN_REQUEST } from './../../endpoint/endpoint';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';
import { AlertController, NavController, Platform } from '@ionic/angular';
//import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio/ngx';
import { NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  facelogin ='0';
  loginForm: FormGroup;
  device_type: string = 'android';
  constructor(
    public apiService: ApiService,
    public platform: Platform,
    public router: NavController,
    public authservice: AuthService,
    public faio: FingerprintAIO,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loginformInit();
    if (this.platform.is('ios')) {
      this.device_type = 'ios';
    }
    console.log(this.facelogin);
  }

  loginformInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }
  submitForm() {
    if (this.loginForm.valid) {
      const formData = new FormData();
        formData.append('email', this.loginForm.controls.email.value);
        formData.append('password', this.loginForm.controls.password.value);
        // formData.append('player_id', localStorage.getItem('player_id'));
        // formData.append('faceLogin', this.facelogin);
        this.authservice.login(formData)
        .subscribe((res: any) => {
          if(res.error){
            if(res.flag=='inactive'){
              const navigationExtra: NavigationExtras = {
                queryParams:{
                  email: this.loginForm.controls.email.value,
                  page: 1,
                  password: this.loginForm.controls.password.value
                }
              };
              this.router.navigateForward('otp', navigationExtra);
            }
          }else{
            localStorage.setItem('accessToken', res?.info?.token)
            this.getUserProfile();
          }
          // if (res) {
          //   console.log(res.data);
          //   if (res) {
          //     //console.log(res.data);
          //     //console.log(res.message);
          //     localStorage.setItem('password', this.loginForm.controls.password.value);
          //     localStorage.setItem('email', this.loginForm.controls.email.value);
          //     localStorage.setItem('otp_status',res.data.otp_status);
          //     localStorage.setItem('payment_status',res.data.payment_status);
          //     localStorage.setItem('profile_status',res.data.profile_status);
          //     this.authservice.currentUserSubject.next(res.data);
          //     console.log(res.data);
          //     if (res.data.otp_status === '0') {
          //       this.router.navigateForward('otp');
          //     }
          //     else if (res.data.payment_status === '0') {
          //       this.getUserProfile();
          //       this.router.navigateForward('payment-method');
          //     }
          //     else if (res.data.profile_status === '0') {
          //       this.router.navigateForward('create-profile');
          //     } else {
          //       this.getUserProfile();
          //       this.router.navigateRoot('tabs/tabs/tab1');
          //     }
          //   }
          //   localStorage.setItem('accessToken', this.authservice.currentUserValue.token);
          // }
        });
    }
  }
  getUserProfile(){
    // const formdata = new FormData();
    // formdata.append('user_token', this.authservice.currentUserValue.token);
    this.authservice
                .profileData()
                .subscribe((ress: any) => {
                  console.log("ress.info.payment_status");
                  console.log(ress.info.payment_status);
                  this.authservice.currentUserSubject.next(ress?.info);
                  localStorage.setItem('firstName', ress.info.first_name);
                  localStorage.setItem('lastName', ress.info.last_name);
                  localStorage.setItem('face_login', ress.info.faceLogin);
                  localStorage.setItem('imageUrl', ress?.info?.image_base_url);
                  localStorage.setItem('userdata', JSON.stringify(ress?.info));
                  // localStorage.setItem('user_id', this.authservice.currentUserValue.user_id);
                  localStorage.setItem('user_id', this.authservice.currentUserValue.user_id);
                  localStorage.setItem('password', this.loginForm.value.email);
                  localStorage.setItem('email', this.loginForm.value.password);
                  localStorage.setItem('payment_status',ress.info.payment_status);
                  localStorage.setItem('profile_status',ress.info.status);
                  localStorage.setItem('accessToken', this.authservice.currentUserValue.token);
                  this.router.navigateRoot('tabs/tabs/tab1');
                });
  }

  faceLogin(){
    if(
        localStorage.getItem('password') &&
        localStorage.getItem('email')  &&
        localStorage.getItem('face_login') == '1'){
        this.faceId();
    }
    else{
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Please Confirm',
      mode:'ios',
      message: 'Login once with email and password Or login and activate face login in app settings',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  faceId(){
    this.faio.show({
       title: 'FACE ID',
       disableBackup:true,  //Only for Android(optional)
       //fallbackButtonTitle: 'Use Pin', //Only for iOS
       //description: 'Please authenticate' //Only for iOS
    })
    .then((result: any)=> {
      console.log(result);
      this.getUserProfile();
      this.router.navigateRoot('tabs/tabs/tab1');
    })
    .catch((err: any)=>{
      console.log('error: ',err);
    });
  }
  signup() {
    this.router.navigateForward('signup');
  }
  forgetPassword(){
    this.router.navigateForward('forget-password');
  }
}
