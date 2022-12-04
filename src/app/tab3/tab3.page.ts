import { AuthService } from './../Service/auth.service';
import { ContactListComponent } from './../Components/contact-list/contact-list.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Contacts } from '@ionic-native/contacts/ngx';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import * as moment from 'moment';
import { ApiService } from '../Service/api.service';
import { CREATE_CYCLE } from '../endpoint/endpoint';
import { environment } from 'src/environments/environment';
import { OnesignalService } from '../Service/onesignal.service';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  newCycleForm: FormGroup;
  cycle_type = 'personal';
  newData: any = [];
  today = moment(new Date()).format('YYYY-MM-DD');
  newDate: any;
  contact_list: any = [];
  payment_cycle = '0';
  payment_transaction = '0';
  selectedUser: any = [];
  selectedId: any = [];
  amount: any;
  payment_status = localStorage.getItem('payment_status')
  maxdate =
    new Date().getFullYear() +
    1 +
    '-' +
    (new Date().getMonth() + 1) +
    '-' +
    new Date().getDate();
    playerIds: any=[];
  constructor(
    public formBuilder: FormBuilder,
    public contacts: Contacts,
    public modalCtrl: ModalController,
    public apiservice: ApiService,
    public authservice: AuthService,
    public navCtrl: NavController,
    public alertController: AlertController,
    public os: OnesignalService,
    private currencyPipe: CurrencyPipe
  ) {
    this.newDate = moment(this.maxdate, 'YYYY-MM-DD').toDate();
    this.newDate = moment(this.newDate).format('YYYY-MM-DD');
    console.log(this.newDate);

    this.newCycleForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      date: ['', Validators.compose([Validators.required])],
      deliver: ['', Validators.compose([Validators.required])],
      cycledur: ['', Validators.compose([Validators.required])],
      goal: ['', Validators.compose([Validators.required])],
      amount: ['', Validators.compose([Validators.required])],
      addgoal: [''],
      payment_cycle: ['0'],
      payment_transaction: ['0'],
      cycle_type: ['personal'],
    });
    // this.newCycleForm.valueChanges.subscribe(form =>{
    //   if(form.amount){
    //     this.newCycleForm.patchValue({
    //       amount: this.currencyPipe.transform(form.amount.replace(/\D/g, '').replace(/^0+/, ''), 'USD', 'symbol', '1.2-2')
    //     }, {emitEvent:false});
    //   }
    // });
  }
  ngOnInIt(): void{

  }
  ionViewWillEnter(){
    this.newCycleForm.reset();
  }
  ionViewDidEnter() {
    this.contactList();
  }
  contactList(){
       this.contacts
      ?.find(['*'], { filter: '', hasPhoneNumber: true, multiple: true })
      ?.then((data) => {
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
  async addmembers() {
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
        console.log('selectedUser: ',this.selectedUser);
        this.selectedUser.forEach((element) => {
          if(this.selectedId.includes(element.user_id) === false){
            this.selectedId.push(element.user_id);
          }
        });
        console.log(this.selectedId, 'this.selectedids');
      }
    });
  }
  amountCheck(val){
    console.log(val);
  }
  updateUSAmount(event: any) { this.amount = event.target.value; }
  createbox() {
    // this.amount = this.newCycleForm.controls.amount.value;
    console.log(this.newCycleForm);
      // eslint-disable-next-line @typescript-eslint/naming-convention
      let member_val: any;
      if (this.newCycleForm.controls.cycle_type.value == 'personal') {
        member_val = '';
      } else {
        member_val=this.selectedId.toString();
        console.log(member_val);
      }
      // eslint-disable-next-line radix
      if(parseFloat(this.newCycleForm.controls.amount.value)<=250 && parseFloat(this.newCycleForm.controls.amount.value)>=0.50){
        console.log(this.authservice.currentUser);
        const fd = new FormData();
        fd.append('user_token', localStorage.getItem('accessToken'));
        fd.append('title', this.newCycleForm.value.title);
        fd.append('start_date', this.newCycleForm.value.date);
        fd.append('delivery_every', this.newCycleForm.value.deliver);
        fd.append('cycle_duration', this.newCycleForm.value.cycledur);
        fd.append('payment_type', this.newCycleForm.controls.payment_cycle.value);
        fd.append('transaction_type', this.newCycleForm.controls.payment_transaction.value);
        fd.append('goals', this.newCycleForm.controls.goal.value);
        fd.append('amount', parseFloat(this.newCycleForm.controls.amount.value).toFixed(2).toString());
        fd.append('cycle_type', this.newCycleForm.controls.cycle_type.value);
        fd.append('members_id', member_val);
        console.log(parseFloat(this.newCycleForm.controls.amount.value).toFixed(2).toString());
        this.newCycleForm.reset();
        this.apiservice.post_request(CREATE_CYCLE,fd).subscribe((res: any)=>{
          console.log(res)
          if(res.status == 'Success'){
            console.log(res);
            this.navCtrl.navigateRoot('tabs/tabs/tab1');
          }
          this.selectedId =[];
        });
    }
    else{
      this.presentAlert();
    }
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      mode: 'ios',
      message: 'Minimum Box Amount is $0.50 & Maximum Box Amount is $250',
      buttons: ['OK']
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
  }
  // updateCurrencyField(value: string): void {
  //   const onlyNumbers = value.replace(/[^\d.-]/g, '');
  //   this.valueChange.emit(Number(onlyNumbers));
  // }
}
