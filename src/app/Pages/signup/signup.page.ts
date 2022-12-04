import { SIGN_UP } from './../../endpoint/endpoint';
import { NavController, Platform } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { AuthService } from 'src/app/Service/auth.service';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  passwordCheck: boolean = false;
  checkBoxConfirms: boolean = false;
  constructor(
    public formBuilder: FormBuilder,
    public navctrl: NavController,
    public apiservice: ApiService,
    public authservice: AuthService
  ) {}

  ngOnInit() {
    this.signupFormInit();
  }
  vrifyConfirmpassword() {
    if (this.signupForm.value.confirmpassword != '') {
      console.log(
        this.signupForm.value.password,
        this.signupForm.value.confirmpassword
      );
      if (
        this.signupForm.value.password == this.signupForm.value.confirmpassword
      ) {
        this.passwordCheck = false;
      } else {
        this.passwordCheck = true;
      }
    }
  }

  signup() {
    let fd = new FormData();
    fd.append('first_name', this.signupForm.controls.first_name.value);
    fd.append('last_name', this.signupForm.controls.last_name.value);
    fd.append('email', this.signupForm.controls.email.value);
    fd.append('password', this.signupForm.controls.password.value);
    fd.append('device_id', localStorage.getItem('player_id'))
    // fd.append('confirm_password', this.signupForm.controls.confirmpassword.value);

    this.authservice.signup(fd).subscribe(
      (res: any) => {
        // debugger
        if (res.flag == 'success' || res.flag == 'existed') {
          // this.authservice.currentUserSubject.next(res.data);
          // console.log(this.authservice.currentUserSubject);
          //localStorage.setItem('user',JSON.stringify(res.data));
          const navigationExtra: NavigationExtras = {
            queryParams:{
              email: this.signupForm.controls.email.value,
              page: 0,
              password: this.signupForm.controls.password.value
            }
          };
          this.navctrl.navigateForward('otp', navigationExtra);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  signupFormInit(): void {
    this.signupForm = this.formBuilder.group({
      first_name: ['', Validators.compose([Validators.required])],
      last_name: ['', Validators.compose([Validators.required])],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ]),
      ],
      password: ['', Validators.compose([Validators.required])],
      confirmpassword: ['', Validators.compose([Validators.required])],
      // gender:  ['', Validators.compose([Validators.required])],
    });
  }
  navigate(){
    this.navctrl.navigateForward('terms-conditions');
  }
  login() {
    this.navctrl.pop();
  }
}
