import { AlertController, NavController, Platform } from '@ionic/angular';
import { Component } from '@angular/core';
import { AuthService } from './Service/auth.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GET_PROFILE_USER } from './endpoint/endpoint';
import { ApiService } from './Service/api.service';
import { LOCATION_INITIALIZED } from '@angular/common';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { environment } from 'src/environments/environment';
import { GetMyIpService } from './Service/get-my-ip.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    public platform: Platform,
    public apiservice: ApiService,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,
    private alert: AlertController,
    private ipservice: GetMyIpService
  ) {
    this.initializeApp();
  }

  getMyIp() {
    if (!localStorage.getItem('ip')) {
      this.ipservice.getMyIp().subscribe((res: any) => {
        localStorage.setItem('ip', res?.ip);
      });
    }
  }

  initializeApp() {
    // this.getMyIp();
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.setupOneSignal();
      this.checkuserAuth();
    });
  }
  //One Signal
  setupOneSignal() {
    this.oneSignal.startInit(environment.oneAppID, environment.oneSenderID);
    this.oneSignal.getIds().then((res) => {
      localStorage.setItem('player_id', res.userId);
    });
    this.oneSignal.inFocusDisplaying(
      this.oneSignal.OSInFocusDisplayOption.Notification
    );
    this.oneSignal.handleNotificationReceived().subscribe((data) => {
      const title = data.payload.title;
      const body = data.payload.body;
      const additionalData = data.payload.additionalData;
      // if(additionalData.message == 'message'){
      //   console.log(additionalData.message);
      //   this.navCtrl.navigateForward('tabs/tabs/tab4');
      // }
      // this.showAlert(title,body,additionalData);
    });
    this.oneSignal.handleNotificationOpened().subscribe((data) => {
      const title = data.notification.payload.title;
      const body = data.notification.payload.body;
      const additionalData = data.notification.payload.additionalData;
      if (additionalData.message == 'message') {
        this.navCtrl.navigateRoot('tabs/tabs/tab4');
      }
      if (additionalData.data == 'box') {
        this.navCtrl.navigateRoot('tabs/tabs/tab2');
      }
      // this.showAlert(title,body,additionalData);
    });
    this.oneSignal.endInit();
  }
  // async showAlert(title,msg,task) {
  //   const alert = await this.alert.create({
  //     cssClass: 'my-custom-class',
  //     header: title,
  //     mode: 'ios',
  //     message: `<strong>${msg}</strong>`,
  //     buttons: [
  //       {
  //         text: `Action: ${task}`,
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           console.log('Ok Worked');
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }
  getUserProfile() {
    // let formData = new FormData();
    // formData.append('user_token',localStorage.getItem('accessToken'));
    this.authService.profileData().subscribe((res: any) => {
      if (!res.error) {
        // localStorage.setItem('user_id', res.data.user_id);
        this.authService.currentUserSubject.next(res.info);
        this.navCtrl.navigateRoot(['tabs/tabs/tab1']);
      }
    });
  }

  checkuserAuth() {
    this.authService.authenticated.subscribe((state) => {
      if (state) {
        this.getUserProfile();
      } else {
        this.navCtrl.navigateRoot('login');
      }
    });
  }
}
