import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// import { SocketIoModule, SocketIoConfig, Socket } from 'ngx-socket-io';
// const config: SocketIoConfig = { url: `ws://thesavingsbox.com:9091`, options: {transports: ['websocket'] ,query: {['userId']: localStorage.getItem('user_id')}} };
import { ChatRoomPageRoutingModule } from './chat-room-routing.module';
import { ChatRoomPage } from './chat-room.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatRoomPageRoutingModule,
    // SocketIoModule.forRoot(config)
  ],
  declarations: [ChatRoomPage],
  // providers:[Socket]
})
export class ChatRoomPageModule {}
