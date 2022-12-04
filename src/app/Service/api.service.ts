import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private customHttpClient: HttpClient;
  constructor(public http: HttpClient,public router: Router,backend: HttpBackend) {
    this.customHttpClient = new HttpClient(backend);
   }

  post_request(endpoint, data)
  {
    const url = `${environment.api_url}/${endpoint}`;
    return this.http.post(url, data);
  }
  post_r(endpoint, data)
  {
    const url = `${environment.api_url}/${endpoint}`;
    return this.http.post(url, data);
  }
  postNotification(data)
  {
    return this.customHttpClient.post('https://onesignal.com/api/v1/notifications',data);
  }
  get_chats(endpoint){
    const url = `${environment.chatUrl}/${endpoint}`;
    return this.http.get(url);
  }
  get_messages(endpoint){
    const url = `${environment.chatMessagesUrl}/${endpoint}`;
    return this.http.get(url);
  }
}
