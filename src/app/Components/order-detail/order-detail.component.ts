import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  slideOptsOne = {
    initialSlide: 0,
    autoplay: true,
    loop: true,
  };
  order: any ;
  title: any;
  constructor(private modal: ModalController, private navprams: NavParams,private navCtrl: NavController) {
    this.order = this.navprams.get('data');
    this.order = this.order;
   }
  ionViewWillEnter(){
  }
  ngOnInit() {
  }
  close(){
    this.modal.dismiss();
  }
  rateProduct(){}
  contactVendor(){
    this.navCtrl.navigateForward('chat-page');
  }
}
