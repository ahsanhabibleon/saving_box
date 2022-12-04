import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { NEW_FORGOT_PASSWORD, NEW_LOGIN, NEW_RESET_PASSWORD, NEW_SIGNUP, OTP_RESEND, OTP_VERIFIY, PROFILE_VIEW, VERIFY_OTP } from '../endpoint/endpoint';
import { User } from '../Modal/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentTokenSubject = new BehaviorSubject<string>(null);
  public loaderSubject = new BehaviorSubject(true);
  public currentUserSubject = new BehaviorSubject<User>(null);
  public currentUser: Observable<User>;
  baseURL = 'https://thesavingsbox.com/';
  authenticationState = new BehaviorSubject(false);

  public authenticated: BehaviorSubject<boolean> = new BehaviorSubject(false); // starting app default as unauthorised

  public currentToken: Observable<string>;
  constructor(
    public http: HttpClient,
    public platform: Platform,
    public menuCtrl: MenuController
  ) {
      this.checkToken();
  }
  public getAuthentication(): Observable<boolean> {
    return this.authenticated.asObservable();
  }
  async checkToken() {
    const accesstoken = localStorage.getItem('accessToken');
    return await this.authenticated.next(accesstoken ? true : false);
  }
  header(){
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: localStorage.getItem('accessToken')
    });
    return {headers};
  }

  isAuthenticated() {
    return this.authenticated.getValue();
  }

  async getToken() {
    return await localStorage.getItem('accessToken');
  }
  public get currentTokenValue(): string {
    return this.currentTokenSubject.value;
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  setState(): any {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse((localStorage.getItem('userdata')))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  updateuser(data) {
    this.currentUserSubject.next(data);
  }

  signup(payload: any): Observable<any>{
    return this.http.post(this.baseURL+NEW_SIGNUP, payload);
  }

  login(payload: any): Observable<any>{
    return this.http.post(this.baseURL+NEW_LOGIN, payload);
  }

  resendOTP(payload: any): Observable<any>{
    return this.http.post(this.baseURL+OTP_RESEND, payload);
  }

  verifyOTP(payload: any): Observable<any>{
    return this.http.post(this.baseURL+VERIFY_OTP, payload);
  }

  profileData(): Observable<any>{
    return this.http.get(this.baseURL+PROFILE_VIEW, this.header());
  }

  resetPassword(payload): Observable<any>{
    return this.http.post(this.baseURL+NEW_RESET_PASSWORD, payload, this.header());
  }

  forgotPassword(payload): Observable<any>{
    return this.http.post(this.baseURL+NEW_FORGOT_PASSWORD, payload);
  }

}
