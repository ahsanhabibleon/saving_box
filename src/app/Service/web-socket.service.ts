import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';

@Injectable()
export class WebsocketService {
  private subject: Rx.Subject<MessageEvent>;
  constructor() {}
  public connect(url): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('Successfully connected: ' + url);
    }
    return this.subject;
  }

  private create(url): Rx.Subject<MessageEvent> {
    const ws = new WebSocket(url);
    const observable = new Rx.Observable((obs: Rx.Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    const observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    ws.addEventListener('error', (event) => {
      console.log('WebSocket error: ', event);
    });
    return Rx.Subject.create(observer, observable);
  }
}


// import {Injectable} from '@angular/core';
// import {io} from 'socket.io-client';
// import {Observable} from 'rxjs';
// import {Subject} from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class WebsocketService {

//   private socket;

//   constructor(public auth: AuthService) {

//   }

//   connect(): Subject<MessageEvent> {
//     const userId = this.auth.currentUserValue.user_id;
//     this.socket = io(environment.socketUrl, {
//       query: {userId},
//     });

//     // We define our observable which will observe any incoming messages
//     // from our socket.io server.
//     const observable = new Observable(obs => {
//       this.socket.on('message', (data) => {
//         console.log('Received message from Websocket Server');
//         obs.next(data);
//       });

//       return () => {
//         this.socket.disconnect();
//       };
//     });

//     // We define our Observer which will listen to messages
//     // from our other components and send messages back to our
//     // socket server whenever the `next()` method is called.
//     const observer = {
//       next: (data: Object) => {
//         this.socket.emit('message', JSON.stringify(data));
//       },
//     };

//     // we return our Rx.Subject which is a combination
//     // of both an observer and observable.
//     return Subject.create(observer, observable);
//   }
// }
