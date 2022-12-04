/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CREATE_CUSTOMER,
  CREATE_FUNDING_SOURCE,
  LIST_FUNDING_SOURCE,
} from '../endpoint/endpoint';
import { AuthService } from 'src/app/Service/auth.service';
import { NavController } from '@ionic/angular';
import { UtilsService } from '../Service/utils.service';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  baseURL = 'https://thesavingsbox.com/api/';
  constructor(
    private http: HttpClient,
    private util: UtilsService,
    private authService: AuthService,
    private navCtrl: NavController,
    private pubsub: NgxPubSubService
  ) {}

  createCustomer(payload, token) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);
    console.log('receving this token' + token);
    console.log(this.baseURL + CREATE_CUSTOMER);
    console.log(payload);
    // eslint-disable-next-line @typescript-eslint/type-annotation-spacing
    var requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: payload,
      redirect: 'follow',
    };

    fetch(
      'https://thesavingsbox.com/api/bank/customer/create.php',
      requestOptions
    )
      .then((response) => response.json())
      .then((res: any) => {
        console.log(res);
        if (res.status === 1) {
          this.authService.currentUserSubject.next(res.data);
          //  localStorage.setItem('name', res.data.name);
          //  localStorage.setItem('face_login', res.data.faceLogin);
          //  localStorage.setItem('payment_status','1');
          localStorage.setItem('customer_id', res.customer_id);
          localStorage.setItem('faceverify', 'true');
          //  localStorage.setItem('user_id', this.authService.currentUserValue.user_id);
          //  localStorage.setItem('userData', JSON.stringify(res.data));
          // console.log(localStorage.getItem('userData'));
          // this.navCtrl.navigateRoot('tabs/tabs/tab1');
          this.navCtrl.navigateForward('verify-identity');
          this.pubsub.publishEvent('faceverify', '');
        } else {
        }
      })
      .catch((error) => console.log('error', error));
    // return this.http.post(this.baseURL+CREATE_CUSTOMER, payload,{ headers: headers });
  }
  createFundingSource(payload): Observable<any> {
    return this.http.post(this.baseURL + CREATE_FUNDING_SOURCE, payload);
  }

  listFundingSourceForUser(): Observable<any> {
    return this.http.get(this.baseURL + LIST_FUNDING_SOURCE);
  }
  createtoken(token): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.post(
      'https://thesavingsbox.com/api/bank/customer/create-token.php',
      { headers: headers }
    );
  }

  addfundingsource(payload, token) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);

    const requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: new URLSearchParams({
        customer_id: payload.customer_id,
        routingNumber: payload.routingNumber,
        accountNumber: payload.accountNumber,
        name: payload.name,
      }),
      redirect: 'follow',
    };

    fetch(
      'https://thesavingsbox.com/api/bank/fundingsource/create.php',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 1) {
          this.util.presentToast('Successfully added', 'success');
          localStorage.setItem('isallcompleted', 'true');
          this.navCtrl.navigateRoot('tabs/tabs/tab1');
        } else {
          this.util.presentToast('some error occurred.', 'danger');
        }
      })
      .catch((error) => console.log('error', error));
  }
}
