import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonContent, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/Service/api.service';
import { AuthService } from 'src/app/Service/auth.service';
import { ChatService } from 'src/app/Service/chat.service';
import { OnesignalService } from 'src/app/Service/onesignal.service';

@Component({
  selector: 'app-shop-chat-room',
  templateUrl: './shop-chat-room.page.html',
  styleUrls: ['./shop-chat-room.page.scss'],
})
export class ShopChatRoomPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;
  reciverid: any;
  msg = '';
  conversation: any=[];
  chatid: any = null;
  messages: any = [];
  senderId: any;
  checkmsg= '';
  msgg;
  chats: any =[];
  users: any = [];
  groupMembers: any;
  title: any;
  parameters: any={};
  command: string;
  readMessage: any =[];
  reading: any = [];
  name: string;
  player_ids: any =[];
  orderId: any;
  constructor(
    public route: ActivatedRoute,
    public api: ApiService,
    public auth: AuthService,
    private chatService: ChatService,
    public navCtrl: NavController,
    public http: HttpClient,
    public alert: AlertController,
    public os: OnesignalService
    // public socket: Socket
    // public socket: WebsocketService
  ) {
            //this.groupMembers = JSON.parse(this.route.snapshot.paramMap.get('members'));
            this.senderId = this.auth.currentUserValue.user_id;
            // this.name = this.auth.currentUserValue.name;
            // console.log('sender id', this.senderId);
            this.route.queryParams.subscribe(prams =>{
              this.title = prams.title;
              this.command = prams.command;
              this.chatid = prams.chatId;
              this.orderId = prams.orderId;
              // this.player_ids = JSON.parse(prams.playerId);
              console.log(this.command,' ',this.orderId, ' ', this.chatid);
            });
  }
  ionViewWillEnter(){
    this.chatIdCheck();
    this.scrollToBottomSlow();
  }
  ngOnInit() {
    this.chatService.messages.subscribe((msg) => {
      this.conversation.push(JSON.parse(msg));
      this.msgg = JSON.parse(msg);
      this.command = this.msgg.command;
      this.senderId = this.msgg.userId;
      this.chatid = this.msgg.chatId;
      console.log(this.conversation);
      console.log('Response from websocket: ' + msg);
      this.scrollToBottomSlow();
    });
  }
  chatIdCheck(){
    if(this.chatid != null || this.chatid != undefined){
      this.getMessagesFromApi();
    }
    else{
      this.getMessagesFromApiOrder();
    }

  }
  scrollToBottomFast(){
    setTimeout(() => {
      this.content.scrollToBottom(50);
   },200);
  }
  scrollToBottomSlow(){
    setTimeout(() => {
      this.content.scrollToBottom(100);
   });
  }

  send() {
    if (this.msg !== '' ) {
      if(this.chatid == null || this.chatid == undefined && this.orderId != null){
        const data = {
          orderId: this.orderId,
          msg: this.msg,
          command: this.command,
          userType: 'user',
          userId: this.senderId
        };
        console.log(data);
        this.chatService.messages.next(data);
        this.scrollToBottomSlow();
        console.log('vendor chat');
        // const heading = `New Message - ${this.title} Group`;
        // const desc = `${this.name} Sent a Message`;
        // this.os.sendNotification(this.player_ids, heading, desc);
        this.orderId = null;
        this.msg='';
      }
      else{
        const data = {
          chatId: this.chatid,
          msg: this.msg,
          command: this.command,
          userType: 'user',
          userId: this.senderId
        };
        console.log(data);
        this.chatService.messages.next(data);
        this.scrollToBottomSlow();
        console.log('vendor chat');
        // const heading = `New Message - ${this.title} Group`;
        // const desc = `${this.name} Sent a Message`;
        // this.os.sendNotification(this.player_ids, heading, desc);
        this.msg='';
      }
    }
}
 getMessagesFromApi(){
      console.log(this.chatid);
      this.api.get_messages(this.chatid).subscribe((res: any)=>{
        if(res){
          this.messages = res.data.messages;
          this.messages.sort((a,b)=>a.id - b.id);
          console.log(this.messages);
          // if(this.reciverid == '' || this.reciverid == null && this.command == 'private'){
          //   this.recieverCheck();
          // }
          // this.messages.forEach(ele => {
          //   if(ele.is_read == 0){
          //     this.readMessage.push(ele.id);
          //   }
          // });
          // console.log(this.readMessage);
          // const read = {
          //   command: 'read_message',
          //   msgIds: this.readMessage
          // };
          // this.chatService.messages.next(read);
          // console.log('sent');
          // this.scrollToBottomFast();
        }else{
          this.chatid = null;
        }
        this.scrollToBottomFast();
      },(err)=>{
        console.log(err);
      }
      );
    }
    getMessagesFromApiOrder(){
      console.log(this.orderId);
      this.http.get(`https://thesavingsbox.com/api/chat-server/public/api/messages/${this.orderId}?type=order`).subscribe((res: any)=>{
        if(res){
          this.messages = res.data.messages;
          this.messages.sort((a,b)=>a.id - b.id);
          console.log(this.messages);
          this.chatid=this.messages[0].chat_id;
          console.log(this.chatid);
          // if(this.reciverid == '' || this.reciverid == null && this.command == 'private'){
          //   this.recieverCheck();
          // }
          // this.messages.forEach(ele => {
          //   if(ele.is_read == 0){
          //     this.readMessage.push(ele.id);
          //   }
          // });
          // console.log(this.readMessage);
          // const read = {
          //   command: 'read_message',
          //   msgIds: this.readMessage
          // };
          // this.chatService.messages.next(read);
          // console.log('sent');
          // this.scrollToBottomFast();
        }else{
          this.chatid = null;
        }
        this.scrollToBottomFast();
      },(err)=>{
        console.log(err);
      }
      );
    }
  // recieverCheck(){
  //   this.messages.forEach(element => {
  //     if(this.senderId != element.sent_by){
  //       this.reciverid = element.sent_by;
  //     }
  //   });
  //   console.log('reciever id not from prams ',this.reciverid);
  // }
//  chatRecieverCheck(){
//      this.api.get_chats(this.senderId).subscribe((res: any) => {
//       if(res.status){
//         console.log(this.chatid);
//         // this.recieverId = res.data.chats.reciever_user_id;
//         this.chats=res.data.chats;
//         console.log(this.chats);
//         this.chats.forEach(ele => {
//         if(ele.chat_type == 'private' && ele.users.length == 2){
//           ele.users.forEach(elem => {
//             if(this.reciverid == elem.user_id){
//               //console.log(elem.user_id, ' ', ele.id);
//               this.chatid = ele.id;
//               // this.title = elem.name;
//               console.log(this.reciverid, ' ', this.chatid);
//               }
//             });
//           }
//         });
//         console.log('chatid not from prams ', this.chatid);
//         // console.log('title not from prams ',this.title);
//         this.getMessagesFromApi();
//       }
//       else{
//         console.log('no chats found');
//       }
//     },(err)=>{
//       console.log(err);
//     }
//     );
//   }
  // deleteMessage(index: any,id: any){
  //   const messageId = {
  //     message_id: id,
  //   };
  //   this.http.post('https://thesavingsbox.com/api/chat-server/public/api/delete-message', messageId).subscribe((res: any)=>{
  //     if(res){
  //       this.messages.splice(index, 1);
  //       this.conversation.splice(index, 1);
  //       console.log('messages array',this.messages);
  //       console.log('conversations array',this.conversation);
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
  //     message: '<strong>Are you sure you want to delete this Message?</strong>',
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
  //           this.deleteMessage(index, id);
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  // getMessages() {
  //   const observable = new Observable((observer) => {
  //     this.socket.on('new-message', (data) => {
  //       console.log(data);
  //       observer.next(data);
  //     });
  //   });
  //   return observable;
  // }
  pop(){
    this.navCtrl.navigateBack('shop-chat-page');
  }


}
