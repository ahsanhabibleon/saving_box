import { SelectCardPage } from './../Pages/select-card/select-card.page';
import { AlertController, ModalController } from '@ionic/angular';
import {
  GET_INVITATION,
  CHANGE_INVITATION_STATUS,
  PAYMENT_NOTIFICATION_LIST,
} from './../endpoint/endpoint';
import { AuthService } from './../Service/auth.service';
import { Component } from '@angular/core';
import { ApiService } from '../Service/api.service';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  invitation: any = [];
  moment = moment;
  paymentnotification: any = [];
  constructor(
    public authservice: AuthService,
    public apiservice: ApiService,
    public alert: AlertController,
    public modalCtrl: ModalController,
    public http: HttpClient
  ) {}

  getInvitations() {
    const formData = new FormData();
    formData.append('user_token', this.authservice.currentUserValue.token);
    this.apiservice
      .post_request(GET_INVITATION, formData)
      .subscribe((res: any) => {
        console.log(res.data);
        this.invitation = res.data;
        this.paymentNotification();
      });
  }
  ionViewWillEnter() {
    this.getInvitations();
  }
  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.getInvitations();
      event.target.complete();
    }, 2000);
  }

  acceptOffer(data: any, index) {
    let formData = new FormData();
    formData.append('status', '1');
    formData.append('invitation_id', data.invitation_id);
    formData.append('user_token', this.authservice.currentUserValue.token);
    this.apiservice
      .post_request(CHANGE_INVITATION_STATUS, formData)
      .subscribe((res) => {
        if (res) {
          this.invitation[index].status = '1';
          console.log(res);
          this.paymentNotification();
        }
      });
  }
  async payPayment(data, i) {
    const alert = await this.alert.create({
      message: data.message,
      mode: 'ios',
      header: data.title,
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            let modal = await this.modalCtrl.create({
              component: SelectCardPage,
              backdropDismiss: true,
              componentProps: { data: data },
              id: 'selectcard',
              keyboardClose: false,
              mode: 'ios',
              swipeToClose: true,
              showBackdrop: true,
            });
            modal.present();
          await modal.onDidDismiss().then((res)=>{
            this.getInvitations();
          });
          },
        },
        {
          text: 'No',
          role: 'close',
        },
      ],
    });
    alert.present();
  }

  async declineOffer(data: any, index) {
    let formData = new FormData();
    formData.append('status', '0');
    formData.append('invitation_id', data.invitation_id);
    formData.append('user_token', this.authservice.currentUserValue.token);

    this.apiservice
      .post_request(CHANGE_INVITATION_STATUS, formData)
      .subscribe((res) => {
        if (res) {
          this.invitation[index].status = '1';
          console.log(res);
        }
      });
  }
  paymentNotification() {
    let formData = new FormData();
    formData.append('user_token', this.authservice.currentUserValue.token);
    this.apiservice
      .post_request(PAYMENT_NOTIFICATION_LIST, formData)
      .subscribe((res: any) => {
        this.paymentnotification = res?.data;
        this.paymentnotification?.sort((a,b)=>b.cycle_id - a.cycle_id);
        console.log(this.paymentnotification);
      });
  }

   deleteNoti(index: number,id: string){
    console.log(index, ' ', id);
    const invId = {
      invitation_id: id,
    };
    // const fd = new FormData();
    // fd.append('invitation_id', id);
    this.http.post('https://thesavingsbox.com/api/chat-server/public/api/delete-notification',invId).subscribe((res: any)=>{
      if(res){
        console.log(res);
        this.invitation.splice(index,1);
        this.paymentnotification.splice(index,1);
      }
    },
    (err) =>{
      console.log(err);
    }
    );
  }

 async presentAlertConfirm(index: number, id: string) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Please Confirm',
      mode: 'ios',
      message: '<strong>Are you sure you want to delete this Notification?</strong>',
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
            console.log(index,' ', id, 'Yes worked');
            this.deleteNoti(index, id);
          }
        }
      ]
    });
    await alert.present();
  }
}
