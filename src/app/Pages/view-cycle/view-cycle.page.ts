import { UtilsService } from './../../Service/utils.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
//import firebase from 'firebase';
//import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { ContactListComponent } from 'src/app/Components/contact-list/contact-list.component';
import { Contact, Contacts } from '@ionic-native/contacts/ngx';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/Service/auth.service';
import { ApiService } from 'src/app/Service/api.service';
import { EXIT_CYCLE, STATIC_VIEW } from 'src/app/endpoint/endpoint';
import { SelectCardPage } from '../select-card/select-card.page';
import { transactions } from 'src/app/constants/constants';
//import * as internal from 'stream';

@Component({
  selector: 'app-view-cycle',
  templateUrl: './view-cycle.page.html',
  styleUrls: ['./view-cycle.page.scss'],
})
export class ViewCyclePage implements OnInit {
  data: any;
  moment = moment;
  title: string;
  isPayment: number;
  contact_list: any = [];
  selectedUser: any = [];
  selectedId: any = [];
  newData: any = [];
  users: any =[];
  usersPram: any;
  group = 'group';
  currentUser: any;
  playerIds: any=[];
  groupuser: string;
  gaugeValue: any;
  max: any;
  totalContribution: any;
  removeUserData: any;
  transactions = transactions
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public utils: UtilsService,
    public contacts: Contacts,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public http: HttpClient,
    public auth: AuthService,
    public api: ApiService,
    private alert: AlertController
  ) {
    // firebase.initializeApp(environment.firebaseConfig);
    this.route.queryParams.subscribe((params) => {
      if (params && params.data) {
        this.data = JSON.parse(params.data);
        this.isPayment = parseInt(this.data.is_payment);
        this.title = this.data.title.charAt(0).toUpperCase() + this.data.title.slice(1);
      }
    });
  }
  ionViewDidEnter() {
    this.contactList();
  }
  ngOnInit() {
    this.currentUser = this.auth?.currentUserValue?.user_id;
    this.data.users.forEach(ele => {
      this.users.push(ele.user_id);
      if(ele.user_id !== this.currentUser){
        this.playerIds.push(ele.player_id);
      }
    });
    this.usersPram = JSON.stringify(this.users);
    console.log(this.usersPram);
    this.getcycleData(this.data.cycle_id);
  }
  contactList(){
    this.contacts
   .find(['*'], { filter: '', hasPhoneNumber: true, multiple: true })
   .then((data) => {
     console.log('contact list: ', data);
     data.forEach((element, key) => {
       if (element['_objectInstance'].phoneNumbers != null) {
         element['_objectInstance'].phoneNumbers.forEach((ele, index) => {
           //console.log(ele, '######');
           ele['number'] = ele.value;
           ele['name'] = element['_objectInstance'].displayName;
           ele['image'] = element['_objectInstance'].displayName;
           console.log(ele, "ele");
           this.newData.push(ele.value);
         });
         if (element['_objectInstance'].phoneNumbers != null) {
           element['number'] = element['_objectInstance'].phoneNumbers[0].value;
         } else {
           element['number'] = null;
         }
         element['newname'] = element['_objectInstance'].displayName;
         if (element['_objectInstance'].photos != null) {
           element['photo'] = element['_objectInstance'].photos[0].value;
         } else {
           element['photo'] = null;
         }
         this.contact_list.push(element);
       }
     });
     // console.log('new Data',this.newData);
     // console.log('contact_list',this.contact_list);
   }).catch((err)=>{
     //console.log(err);
   });
}
  async addMember() {
    const modal = await this.modalCtrl.create({
      component: ContactListComponent,
      backdropDismiss: true,
      componentProps: { data: this.newData, contact: this.contact_list },
      keyboardClose: true,
      mode: 'ios',
      showBackdrop: true,
      swipeToClose: false,
      id: 'contact',
    });
    modal.present();
    modal.onDidDismiss().then((res) => {
      if (res.role === 'contactselected') {
        this.selectedUser = res.data;
        this.selectedUser.forEach((element) => {
          this.selectedId.push(element.user_id);
          console.log(this.selectedId, 'this.selectedids');
        });
      }
    });
  }
  staticview() {
    const navigationExtra: NavigationExtras = {
      queryParams:{
        max: this.max,
        gaugeValue: this.gaugeValue,
        groupuser: this.groupuser
      }
    };
    this.navCtrl.navigateForward('box-analytics', navigationExtra);
    // this.router.navigateByUrl(`${this.data.cycle_id}/box-analytics`);
  }
  goToProfile(dataId){
    this.router.navigateByUrl(`/profile-page/${dataId}`);
    console.log('profilepage clicked', dataId);
  }
  createGroup(){
      const parameters = {
        title: this.title,
        command: this.group,
        user_ids: JSON.parse(this.usersPram)
      };
      this.http.post('https://thesavingsbox.com/api/chat-server/public/api/create-group', parameters).subscribe((res: any)=>{
        if(res){
          const navigationExtra: NavigationExtras ={
            queryParams:{
              command: this.group,
              chatId: res.data.chat.id,
              title: this.title,
              playerId: JSON.stringify(this.playerIds)
            }
          };
          this.navCtrl.navigateForward(`chatroom`, navigationExtra);
          console.log(res);
        }
      });
  }
  getcycleData(id: any) {
    const formData = new FormData();
    formData.append('user_token', localStorage.getItem('accessToken'));
    formData.append('cycle_id', id);
    this.api
      .post_request(STATIC_VIEW, formData)
      .subscribe((res: any) => {
        if(res.status == 'Success'){
          console.log(res);
          this.max = res.data.total_amount;
          this.gaugeValue = res.data.total_paid;
          this.groupuser = JSON.stringify(res.data.user);
        }
      });
  }

  exitBox(cycle_id, action){
    const formData = new FormData();
    formData.append('user_token', this.auth.currentUserValue.token);
    formData.append('cycle_id', cycle_id);
    formData.append('action',action);
    this.api.post_request(EXIT_CYCLE, formData).subscribe((res: any)=>{
      if(res?.code == 200){
        this.removeUserData = res?.data;
        this.payPayment(this.removeUserData)
      }

    })
  }

  goBack(){
    this.navCtrl.navigateRoot('tabs/tabs/tab1');
  }
  async payPayment(data) {
    const message = `<strong>$${data?.fees} will be deducted from your wallet if you Quit!</strong>`;
    const title = 'Want to Quit Box?';
    data['isQuit']= true;
    const alert = await this.alert.create({
      message: message,
      mode: 'ios',
      header: title,
      buttons: [
        {
          text: 'Close',
          role: 'close',
        },
        {
          text: 'Proceed',
          handler: async () => {
            this.removeUser(data)
          },
        },
      ],
    });
    alert.present();
  }

  removeUser(data){
      console.log(data)
      const formData = new FormData();
      formData.append('user_token', this.auth.currentUserValue.token);
      formData.append('cycle_id', data?.cycle_id);
      formData.append('action','remove_user');
      this.api.post_request(EXIT_CYCLE, formData).subscribe((res: any)=>{
        if(res.code == 200){
          this.router.navigate(['tabs/tabs/tab1'])
        }
      })
  }
}
