import { AuthService } from 'src/app/Service/auth.service';
import { GET_CARD_ADDED, CHARGE_CUSTOMER, EXIT_CYCLE } from './../../endpoint/endpoint';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-select-card',
  templateUrl: './select-card.page.html',
  styleUrls: ['./select-card.page.scss'],
})
export class SelectCardPage implements OnInit {
  notificationData: any;
  cards: any = [];
  cardData: any;


  constructor(
    public modal: ModalController,
    public navparms: NavParams,
    public apiservvice: ApiService,
    public authservice: AuthService,
    private navCtrl: NavController
  ) {
    this.notificationData = navparms.get('data');
  }

  ngOnInit() {
    this.getCards();
  }
  closeModal() {
    if(this.notificationData.isQuit){
      this.modal.dismiss('closed', 'close', 'selectcard');
    }else{
      this.modal.dismiss('', '', 'selectcard');
    }
  }
  getCards() {
    let fd = new FormData();
    fd.append('user_token', this.authservice.currentUserValue.token);
    this.apiservvice.post_request(GET_CARD_ADDED, fd).subscribe(
      (res: any) => {
        this.cards = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  procced()
  {
    if(Object.keys(this.cardData).length != 0)
    {
      let fd=new FormData();
      fd.append('card_id',this.cardData.card_id);
      fd.append('cycle_id',this.notificationData.cycle_id);
      fd.append('user_token', this.authservice.currentUserValue.token);
      this.apiservvice.post_request(CHARGE_CUSTOMER,fd).subscribe((res: any)=>{
        if(res)
        {
            this.modal.dismiss('', '', 'selectcard');
        }

      });

    }
  }
}
