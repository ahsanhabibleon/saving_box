import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGardService {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {

    if(localStorage.getItem('accessToken')){
      return true;
    }else{
      this.router.navigateByUrl('login');
      return false;
    }

    // if (
    //   localStorage.getItem('accessToken') != null &&
    //   localStorage.getItem('otp_status') != '0' &&
    //   localStorage.getItem('profile_status') != '0'
    //   // localStorage.getItem('payment_status') != '0'
    // ) {
    //   return true;
    // } else if (
    //   localStorage.getItem('accessToken') != null &&
    //   localStorage.getItem('otp_status') === '0' &&
    //   localStorage.getItem('profile_status') === '0'
    //   // localStorage.getItem('payment_status') === '0'
    // ) {
    //   this.router.navigateByUrl('otp');
    // }
    // // } else if (
    // //   localStorage.getItem('accessToken') != null &&
    // //   localStorage.getItem('otp_status') === '1' &&
    // //   localStorage.getItem('profile_status') === '0'
    // //   // localStorage.getItem('payment_status') === '0'
    // // ) {
    // //   //this.router.navigateByUrl('payment-method');}
    //  else if (
    //   localStorage.getItem('accessToken') != null &&
    //   localStorage.getItem('otp_status') === '1' &&
    //   localStorage.getItem('profile_status') === '0'
    //   // localStorage.getItem('payment_status') === '1'
    // ) {
    //   this.router.navigateByUrl('create-profile');
    // } else {
    //   return true;
    // }
  }
  // not logged in so redirect to login page with the return url
}
