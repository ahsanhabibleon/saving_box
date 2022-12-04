import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController,AlertController, NavController } from '@ionic/angular';
import { DELETE_CARD, GET_CARD_ADDED } from 'src/app/endpoint/endpoint';
import { ApiService } from 'src/app/Service/api.service';
import { AuthService } from 'src/app/Service/auth.service';
import { AddCardComponent } from './../../add-card/add-card.component';
@Component({
  selector: 'app-added-payments',
  templateUrl: './added-payments.page.html',
  styleUrls: ['./added-payments.page.scss'],
})
export class AddedPaymentsPage implements OnInit {
  cards: any = [];
  constructor(
    public router: NavController,
    private modal: ModalController,
    private apiService: ApiService,
    private authService: AuthService,
    private alertController: AlertController
    ) { }

  ionViewDidEnter(){
    this.getCardData();
  }
  ngOnInit() {
  }

  getCardData(){
    const formData = new FormData();
    formData.append('user_token', this.authService.currentUserValue.token);
    this.apiService.post_request(GET_CARD_ADDED, formData).subscribe(
      (res: any) => {
        this.cards = res.data;
        },
      (err) => {
      });
  }

  deleteCard(index: number, cardId: any){
    const formData = new FormData();
    formData.append('user_token', this.authService.currentUserValue.token);
    formData.append('id', cardId);
    this.apiService.post_request(DELETE_CARD, formData).subscribe(
      (res: any) => {
        if(res.status ==='Success'){
          this.cards.splice(index, 1);
        }
        else{
        }
        },
      (err) => {
      });
  }

  async addPayment(){
    const modal = await this.modal.create({
    component: AddCardComponent,
    componentProps: { cards: this.cards },
    });
     modal.present();
     await modal.onDidDismiss().then((res) =>{
      this.getCardData();
     });
  }

  async presentAlertConfirm(index: number, id: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Please Confirm',
      mode: 'ios',
      message: '<strong>Are you sure you want to delete this card?</strong>',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.deleteCard(index, id);
          }
        }
      ]
    });

    await alert.present();
  }

  pop(){
    this.router.pop();
  }

}
