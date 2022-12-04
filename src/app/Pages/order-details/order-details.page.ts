import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  slideOptsOne = {
    initialSlide: 0,
    autoplay: true,
    loop: true,
  };
  order: any;
  title: any;
  constructor(private modal: ModalController, private route: ActivatedRoute,private navCtrl: NavController) {
    this.route.queryParams.subscribe((prams)=>{
      this.order = JSON.parse(prams.order);
      console.log(this.order);
    });
   }

  ngOnInit() {
  }
  pop(){
    this.navCtrl.pop();
  }
  rateProduct(){}
  contactVendor(id: any,title: any){
    // let sellerName = '';
    // if(this.order.vendor.business_registration_name!==null){
    //   sellerName = this.order.vendor.business_registration_name;
    // }
    // else{
    //   sellerName = this.order.vendor.first_name + ' ' + this.order.vendor.last_name;
    // }
    const navigationExtra: NavigationExtras={
      queryParams:{
        orderId: id.toString(),
        command: 'vendor',
        title
      }
    };
    this.navCtrl.navigateForward('shop-chat-room', navigationExtra);
  }
}
