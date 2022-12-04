import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
// import { OrderDetailComponent } from 'src/app/Components/order-detail/order-detail.component';

@Component({
  selector: 'app-shopping-history',
  templateUrl: './shopping-history.page.html',
  styleUrls: ['./shopping-history.page.scss'],
})
export class ShoppingHistoryPage implements OnInit {
  data: any;
  token: string;
  product: any;
  order: any;
  constructor(private modal: ModalController, private http: HttpClient, private navCtrl: NavController) { }

  ngOnInit() {
    this.token = localStorage.getItem('accessToken');
    this.getShoppingHistory();
  }
  getShoppingHistory(){
    const formData = new FormData();
    formData.append('token', this.token);
    this.http.get('https://thesavingsbox.com/api/chat-server/public/api/order-history').subscribe((res: any)=>{
      if(res.status == 200){
        this.data = res.data.orders;
        console.log(this.data);
      }
    });
  }
  getOrderDetails(id: any){
    this.http.get(`https://thesavingsbox.com/api/chat-server/public/api/order-detail/${id}`).subscribe((res: any)=>{
      if(res.status == 200){
        this.order = res.data.order;
        const navigationExtra: NavigationExtras ={
          queryParams:{
            order: JSON.stringify(this.order[0])
          }
        };
        console.log(this.order);
        this.navCtrl.navigateForward('order-details', navigationExtra);
      }
    });
  }
  // async orderDetails(order: any){
  //   console.log(order);
  //   const modal = await this.modal.create({
  //     component: OrderDetailComponent,
  //     backdropDismiss: true,
  //     componentProps: {data: order},
  //     keyboardClose: true,
  //     showBackdrop: true,
  //     swipeToClose: false,
  //     id: 'orderDeail',

  //     });
  //      modal.present();
  //      await modal.onDidDismiss().then((res) =>{
  //      });
  // }
}
