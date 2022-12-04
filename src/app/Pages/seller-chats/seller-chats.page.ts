import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-seller-chats',
  templateUrl: './seller-chats.page.html',
  styleUrls: ['./seller-chats.page.scss'],
})
export class SellerChatsPage implements OnInit {

  imageUrl: any;
  userId: any;
  chats: any = [];
  chatId: any;
  title: any;
  users: any =[];
  sortedChats: any=[];
  // recieverId: any;
  constructor(private navCtrl: NavController
 ) {
  }
ngOnInit() {

}

//
  ionViewWillEnter(){
    console.log('triggered willenter');
    this.getChats();
  }
  getChats(){
  }
  navigate(chatId: any,title: any,command: any,users: any){
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
  pop(){
    this.navCtrl.pop();
  }
}
