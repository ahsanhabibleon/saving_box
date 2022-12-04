import { AddCardComponent } from './add-card/add-card.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Stripe } from '@ionic-native/stripe/ngx';
import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { NgxPubSubModule } from '@pscoped/ngx-pub-sub';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptorService } from './Service/token-interceptor.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { InteractivePaycardModule } from 'ngx-interactive-paycard';
import { CommonModule } from '@angular/common';
import { Camera } from '@ionic-native/camera/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
//import firebase from 'firebase';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Contacts } from '@ionic-native/contacts/ngx';
import { AuthService } from './Service/auth.service';
import { WebsocketService } from './Service/web-socket.service';
import { ChatService } from './Service/chat.service';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { SharedDirectiveModule } from './directives/shared-directive.module';

import {  FaceSDK }
from '@regulaforensics/ionic-native-face-api/ngx';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
//import { SocketIoModule, SocketIoConfig, Socket } from 'ngx-socket-io';
//import { WebSocketService } from './Service/web-socket.service';
//const config: SocketIoConfig = { url: `ws://thesavingsbox.com:9091`, options: { transports: ['websocket']}};
//query: {['userId']: localStorage.getItem('user_id')}}
// const config: SocketIoConfig = { url: `ws://thesavingsbox.com:9091`, options: {} };
//firebase.initializeApp(environment.firebaseConfig);
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
@NgModule({
  declarations: [AppComponent,AddCardComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPubSubModule,
    IonicModule.forRoot(),
     AppRoutingModule,
     AngularFireModule.initializeApp(environment.firebaseConfig),
     AngularFireAuthModule,
     AngularFirestoreModule,
     CommonModule,
     InteractivePaycardModule,
     NgxMaskModule.forRoot(),
     SharedDirectiveModule
     //SocketIoModule
    ],
  providers: [
    SplashScreen,
    StatusBar,
    Stripe,
    FaceSDK,
    SocialSharing,
    SpeechRecognition,
    Camera,
    Contacts,
    NavParams,
    FingerprintAIO,
    AuthService,
    Geolocation,
    WebsocketService,
    ChatService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    OneSignal,

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
