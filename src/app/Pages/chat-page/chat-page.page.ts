import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/Service/api.service';
import { AuthService } from 'src/app/Service/auth.service';
import { ChatService } from 'src/app/Service/chat.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.page.html',
  styleUrls: ['./chat-page.page.scss'],
})
export class ChatPagePage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  reciverid: string;
  messages: any =[];
  checkmsg: string;
  title = 'Chat';
  recieverName: string;
  senderId: string;
  incomingmsg: any = [];
  msg = '';
  chatid: any;
  message: any;
  conversation: any=[];
  userId: any;
  sellerName: any;
  constructor(
    public chat: ChatService,
    public route: ActivatedRoute,
    public api: ApiService,
    public auth: AuthService,
    private navCtrl: NavController
  ) {
    this.route.queryParams.subscribe(prams=>{
      this.sellerName = prams.seller;
    });
    this.reciverid = this.route.snapshot.paramMap.get('reciverid');
    this.chatid = localStorage.getItem('chatid');

    console.log('recieversid ', this.reciverid);
    this.senderId = this.auth.currentUserValue.user_id;
  }

  ngOnInit() {
    // this.getMessages();
    // this.chat
    //   .getMessages()
    //   .subscribe((message: string) => {
    //     this.messages.push(message);
    //     console.log(this.messages);
    //   });
  }
  getMessages(){
    this.api.get_messages(this.chatid).subscribe((res: any)=>{
      if(res.status === true){
        this.messages = res.data.messages;
      }else{
        console.log('no messages found');
      }
    },(err)=>{
      console.log(err);
    }
    );
  }
  sendMsg() {
    this.message = JSON.stringify({
      userId: localStorage.getItem('user_id'),
      msg: this.msg,
      receiverUserId: this.reciverid,
      command: 'private',
    });
    //this.chat.sendMessage(this.message);
    this.messages.push(this.message);
    this.msg='';
    console.log(this.messages);
    // console.log(this.message);
  }
  pop(){
    this.navCtrl.pop();
  }
  presentAlertConfirm(i,id){
  }
  send(){}
}
