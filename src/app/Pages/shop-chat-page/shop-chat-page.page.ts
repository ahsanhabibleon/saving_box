import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Service/api.service';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-shop-chat-page',
  templateUrl: './shop-chat-page.page.html',
  styleUrls: ['./shop-chat-page.page.scss'],
})
export class ShopChatPagePage implements OnInit {

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
    public http: HttpClient,
    public navCtrl: NavController
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
    const headers= new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: localStorage.getItem('accessToken')
    });
    const options = {headers};
    this.http.get(`https://thesavingsbox.com/api/chat-server/public/api/order-chats/${this.userId}/user`,options).subscribe(
      (res: any) => {
        if (res) {
          // this.recieverId = res.data.chats.reciever_user_id;
          this.chats = res.data.chats;
          console.log(this.chats);
          this.chats.forEach(ele => {
            if(ele.vendor.business_type == 'individual'){
              ele['title'] = ele.vendor.first_name + ' ' + ele.vendor.last_name;
            }
            else{
              ele['title'] = ele.vendor.business_registration_name;
            }
          });
          this.chats.sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at));
        //   this.chats.forEach((elem) => {
        //     elem['dates'] = Date.parse(elem.updated_at);
        //     if (elem.users.length == 2) {
        //       elem.users.forEach((ele) => {
        //         if (this.userId != ele.user_id) {
        //           elem['image'] =
        //             'http://thesavingsbox.com/api//' + ele.profile_image;
        //         }
        //       });
        //     } else {
        //       elem['image'] = 'assets/Imgs/groupicon.jpg';
        //     }
        //   });
        //   console.log(this.chats);
        // } else {
        //   console.log('no chats found');
        // }
        }
      },
      (err) => {
        console.log(err);
        console.log('no chats found');
      }
    );
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  navigate(chatId: any,player_id: any,title: any) {
    this.playerId.push(player_id);
    console.log(this.playerId);
    const navigationExtra: NavigationExtras = {
      queryParams: {
        chatId,
        command:'vendor',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        playerId: JSON.stringify(this.playerId),
        title
      },
    };
    console.log(chatId);
    this.router.navigateRoot(`shop-chat-room`, navigationExtra);
  }
  pop(){
    this.navCtrl.navigateBack('home');
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
