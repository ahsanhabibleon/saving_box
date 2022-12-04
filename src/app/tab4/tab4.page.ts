import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ApiService } from '../Service/api.service';
import { AuthService } from '../Service/auth.service';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  imageUrl: any;
  userId: any;
  chats: any = [];
  chatId: any;
  title: any;
  users: any = [];
  sortedChats: any = [];
  playerId: any = [];
  // recieverId: any;
  private subscription: Subscription;
  constructor(
    public alert: AlertController,
    private router: NavController,
    private api: ApiService,
    public auth: AuthService,
    public http: HttpClient
  ) {}
  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
  }

  //
  ionViewWillEnter() {
    console.log('triggered willenter');
    this.getChats();
  }
  getChats() {
    this.api.get_chats(this.userId).subscribe(
      (res: any) => {
        if (res.status) {
          // this.recieverId = res.data.chats.reciever_user_id;
          this.chats = res.data.chats;
          console.log(this.chats);
          this.chats.forEach((elem) => {
            elem['dates'] = Date.parse(elem.updated_at);
            if (elem.users.length == 2) {
              elem.users.forEach((ele) => {
                if (this.userId != ele.user_id) {
                  elem['image'] =
                    'http://thesavingsbox.com/api//' + ele.profile_image;
                }
              });
            } else {
              elem['image'] = 'assets/Imgs/groupicon.jpg';
            }
          });
          this.chats.sort((a, b) => b.dates - a.dates);
          console.log(this.chats);
        } else {
          console.log('no chats found');
        }
      },
      (err) => {
        console.log(err);
        console.log('no chats found');
      }
    );
  }
  navigate(chatId: any, title: any, command: any, users: any) {
    //localStorage.setItem('chatid', chatId);
    // console.log(recieverId,' ', chatId);
    let recevId;
    if (command == 'private' && users.length == 2) {
      users.forEach((ele) => {
        if (ele.user_id != this.userId) {
          recevId = ele.user_id;
          this.playerId.push(ele.player_id);
        }
      });
    }
    if (command == 'group' && users.length > 2) {
      users.forEach((ele) => {
        if (ele.user_id != this.userId) {
          if (ele.player_id != null && this.playerId.includes(ele.player_id) === false) {
              this.playerId.push(ele.player_id);
          }
        }
      });
    }
    console.log(this.playerId);
    const navigationExtra: NavigationExtras = {
      queryParams: {
        chatId,
        title,
        command,
        id: recevId,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        playerId: JSON.stringify(this.playerId),
      },
    };
    console.log(chatId);
    this.router.navigateRoot(`chatroom`, navigationExtra);
  }

  // deleteChat(index: any,id: any){
  //   const chatId = {
  //     chat_id: id,
  //   };
  //   this.http.post('https://thesavingsbox.com/api/chat-server/public/api/delete-chat', chatId).subscribe((res: any)=>{
  //     if(res){
  //       this.chats.splice(index, 1);
  //       console.log(this.chats);
  //     }
  //   },err => {
  //     console.log(err);
  //   }
  //   );
  // }
  // async presentAlertConfirm(index: any,id: any) {
  //   const alert = await this.alert.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Please Confirm',
  //     mode: 'ios',
  //     message: '<strong>Are you sure you want to delete this Notification?</strong>',
  //     buttons: [
  //       {
  //         text: 'No',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           console.log('no worked');
  //         }
  //       }, {
  //         text: 'Yes',
  //         handler: () => {
  //           console.log(index,' ', id, 'Yes worked');
  //           this.deleteChat(index, id);
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.getChats();
      event.target.complete();
    }, 1000);
  }
}
