import {
  TOOGLE_STATUS,
  GET_PROFILE_USER,
  UPDATE_PROFILE_BUTTON,
} from './../../endpoint/endpoint';
import { AddCardComponent } from './../../add-card/add-card.component';
import {
  ModalController,
  NavController,
  PopoverController,
  AlertController,
} from '@ionic/angular';
import { AuthService } from './../../Service/auth.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import * as moment from 'moment';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  userData: any = [];
  dobStatus: boolean;
  emailStatus: boolean;
  genderStatus: boolean;
  mobileStatus: boolean;
  faceLoginStatus: boolean;
  moment = moment;
  gender = '';
  imageUrl: any = localStorage.getItem('imageUrl')
  constructor(
    public authservice: AuthService,
    public navctrl: NavController,
    public modal: ModalController,
    public apiservice: ApiService,
    public popctrl: AlertController
  ) {
    console.log('setting');
  }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.getUserProfile();
  }
  editprofile() {
    this.navctrl.navigateRoot('edit-profile');
  }

  async addedPayment() {
    this.navctrl.navigateForward('added-payments');
    // let modal = await this.modal.create({
    //   component: AddCardComponent,
    // });
    // modal.present();
  }
  changepassword() {
    const navigationExtra: NavigationExtras ={
      queryParams:{
        email: this.authservice.currentUserValue.email
      }
    };
    this.navctrl.navigateForward('change-password', navigationExtra);
  }
  openPrivacy() {
    this.navctrl.navigateForward('privacy-policy');
  }
  getUserProfile() {
    const formData = new FormData();
    // formData.append('user_token', this.authservice.currentUserValue.token);
    this.authservice
      .profileData()
      .subscribe((res: any) => {
        if (!res.error) {
          this.userData = res.info;
          this.authservice.currentUserSubject.next(this.userData);
          //this.gender = this.userData.gender.charAt(0).toUpperCase() + this.userData.gender.slice(1);
          if (this.userData.date_of_birth_status === '1') {
            this.dobStatus = true;
          }
          if (this.userData.email_status === '1') {
            this.emailStatus = true;
          }
          if (this.userData.gender_status === '1') {
            this.genderStatus = true;
          }
          if (this.userData.mobile_status === '1') {
            this.mobileStatus = true;
          }
          if (this.userData.faceLogin === '1') {
            this.faceLoginStatus = true;
          }
        }
      });
  }

  updateStatus(type: any, status: any) {
    let newstatus;
    if (!status) {
      newstatus = 0;
    } else {
      newstatus = 1;
    }
    const fd = new FormData();
    fd.append('user_token', this.authservice.currentUserValue.token);
    fd.append('update_type', type);
    fd.append('status', newstatus);
    localStorage.setItem('face_login', newstatus);
    this.apiservice
      .post_r(UPDATE_PROFILE_BUTTON, fd)
      .subscribe((res: any) => {
        if (res.status === 'Success') {
          // console.log(res);
          // console.log(res.message);
          // console.log(type,' ', status,' ',newstatus);
        }
      });
  }
  async logout() {
    localStorage.removeItem('accessToken');
    // localStorage.removeItem('cureentuser');
    // localStorage.removeItem('player_id');
    localStorage.clear();
    // this.authservice.currentUserSubject.next(null);
    this.navctrl.navigateRoot('login');
  }

  async support() {
    const pop = await this.popctrl.create({
      header: 'Contact us at',
      message: 'help@thesavingsbox.com',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
        },
      ],
      mode: 'ios',
    });
    pop.present();
  }

  // support(){
  //   help@thesavingsbox.com
  // }
}
