import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { WebsocketService } from './web-socket.service';

export interface Message {
  chatId: string;
  userId: any;
  msg: string;
  receiverUserId: string;
  command: string;
}
// export interface Read {
//   command: string;
//   msgIds: [];
// }
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  CHAT_URL = `ws://thesavingsbox.com:9091/?userId=${this.auth.currentUserValue.user_id}`;
  public messages: Subject<any>;
  // public readMessage: Subject<any>;
  constructor(public wsService: WebsocketService,public auth: AuthService) {
    console.log(this.auth.currentUserValue);
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    this.messages = <Subject<any>>wsService.connect(this.CHAT_URL).pipe(map(
      (response: MessageEvent): Message => {
        const data = response.data;
        console.log(data);
        return data;
      }
    ));
   }
}


// import {Injectable} from '@angular/core';
// import {Subject} from 'rxjs';
// import { AuthService } from './auth.service';
// import { WebsocketService } from './web-socket.service';
// import {map} from 'rxjs/operators';

// export interface Message {
//   chatId: string;
//   userId: any;
//   msg: string;
//   receiverUserId: string;
//   command: string;
// }
// @Injectable({
//   providedIn: 'root'
// })
// export class ChatService {
//   public messages: Subject<any>;
//   userId: any;

//   constructor(private wsService: WebsocketService, private auth: AuthService) {
//     this.userId = auth.currentUserValue.user_id;
//   }
//   connect(){
//     // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
//     this.messages= <Subject<any>>this.wsService.connect().pipe(map(
//       (response: MessageEvent): Message => {
//         const data = response.data;
//         console.log(data);
//         return data;
//       }
//     ));
//   }
//   sendMsg(msg) {
//     this.messages.next(msg);
//     console.log(msg);
//   }
//   // connect(token) {
//   //   // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
//   //   this.messages$ = <Subject<any>>this.wsService.connect(token)
//   //     .pipe(map((response: MessageEvent): Message => response));
//   // }
// }

