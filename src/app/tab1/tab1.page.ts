import { AlertController, NavController } from '@ionic/angular';
import {
  EXIT_CYCLE,
  GET_CYCLE_LIST,
  GET_PROFILE_USER,
} from './../endpoint/endpoint';
import { Component } from '@angular/core';
import { ApiService } from '../Service/api.service';
import { AuthService } from '../Service/auth.service';
import { NavigationExtras } from '@angular/router';
import * as moment from 'moment';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  cycleList: any = [];
  cycleType = 'going';
  moment = moment;
  onGoingList: any;
  completedList: any;
  payment_status = localStorage.getItem('payment_status');
  profileStatus = localStorage.getItem('profile_status');
  totalTrans: any = 0;
  imageUrl: any = localStorage.getItem('imageUrl');
  constructor(
    public apiService: ApiService,
    public authservice: AuthService,
    public navctrl: NavController,
    private oneSignal: OneSignal,
    private alert: AlertController
  ) {}
  ionViewWillEnter() {
    this.getCycle();
    console.log(this.authservice?.currentUserValue);
  }
  segmentChanged(ev) {
    console.log(ev.target.value);
  }
  getTrans(data) {
    let num = parseFloat(data).toFixed(2);
    return '$' + num;
  }
  getCycle() {
    const formData = new FormData();
    formData.append('user_token', localStorage.getItem('accessToken'));
    this.apiService.post_request(GET_CYCLE_LIST, formData).subscribe(
      (res: any) => {
        if (res.status == 'Success') {
          console.log(res);
          this.cycleList = res.data;
          this.onGoingList = this.cycleList.filter(
            (item) => item.cycle_status == 0
          );
          this.onGoingList.forEach((item: any) => {
            item['trans'] = 50 + parseFloat(item?.amount);
          });
          this.onGoingList.forEach((item: any, index: any) => {
            this.totalTrans = item.trans + this.totalTrans;
          });
          this.completedList = this.cycleList?.filter(
            (item) => item?.cycle_status == 1
          );
          // this.apiService.post_request(GET_PROFILE_USER,formData).subscribe((ress: any)=>{
          //   this.authservice.currentUserSubject.next(ress.data);
          // });
        } else {
          // localStorage.setItem('password', '');
          // localStorage.setItem('email', '');
          // this.authservice.currentUserSubject.next(null);
          // // localStorage.removeItem('accessToken');
          // this.navctrl.navigateRoot('login');
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  openshop() {
    this.navctrl.navigateForward('home');
  }

  viewCyle(item) {
    console.log(item);
    const navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(item),
      },
    };
    this.navctrl.navigateRoot('view-cycle', navigationExtras);
  }

  deleteCompleteCycle(index, cycleId) {
    const formData = new FormData();
    formData.append('user_token', this.authservice.currentUserValue.token);
    formData.append('cycle_id', cycleId);
    formData.append('action', 'remove_cycle');
    this.apiService.post_request(EXIT_CYCLE, formData).subscribe((res: any) => {
      console.log(res);
      if (res.code == 200) {
        this.completedList.splice(index, 1);
      }
    });
  }

  async presentAlertConfirm(index: number, id: any) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Please Confirm',
      mode: 'ios',
      message: '<strong>Are you sure you want to delete the Box?</strong>',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('no worked');
          },
        },
        {
          text: 'Yes',
          handler: () => {
            console.log(index, id, 'Yes worked');
            this.deleteCompleteCycle(index, id);
          },
        },
      ],
    });

    await alert.present();
  }
  navigate() {
    this.navctrl.navigateForward('tabs/tabs/tab5');
  }
}
