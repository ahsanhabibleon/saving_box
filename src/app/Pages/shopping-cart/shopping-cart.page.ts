import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { WALLET } from 'src/app/endpoint/endpoint';
import { ApiService } from 'src/app/Service/api.service';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {
  data: any =[];
  quantity: any;
  emptyCheck: boolean;
  grandTotal=0;
  walletCash: any;
  products: any =[];
  constructor(private router: NavController,
    private http: HttpClient,
    private auth: AuthService,
    private alertController: AlertController,
    private apiservice: ApiService) {
      this.getWalletOut();
    }
ionViewWillEnter(){
  this.grandTotal=0;
  this.getCartData();
}
  ngOnInit() {
  }
  getWalletOut() {
    const formData = new FormData();
    formData.append('user_token', this.auth.currentUserValue.token);
    this.apiservice.post_request(WALLET, formData).subscribe((res: any) => {
      console.log(res);
      if (res.status == 'Success') {
        this.walletCash = res.data.wallet;
        console.log(this.walletCash);
        console.log(typeof(this.walletCash));
      } else {
        this.walletCash = 0.0;
      }
    });
  }
  getCartData(){
    let finalPrize = 0.0;
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: localStorage.getItem('accessToken')
    });
    const options = {headers};
    // const fd=new FormData();
    // fd.append('userId',this.auth.currentUserValue.user_id);
    this.http.get('https://thesavingsbox.com/api/chat-server/public/api/cart-items',options).subscribe((res: any)=>{
      if(res.data.cart_products.length != 0){
        this.emptyCheck = false;
        console.log(res);
        this.data = res.data.cart_products;
        this.data.forEach(ele => {
          finalPrize = parseFloat(ele.product.sale_price) * parseInt(ele.quantity);
          this.grandTotal = this.grandTotal + finalPrize;
        });
        console.log(this.grandTotal);
      }
      else{
        this.emptyCheck = true;
      }
    });
  }
  getValue(value: any){
    this.quantity = value;
  }
  removeItem(id: any, index: any){
    // const header =new Headers();
    // header.append('id',this.auth.currentUserValue.user_id);
    const fd =new FormData();
    fd.append('id', id);
    this.http.post('https://thesavingsbox.com/api/reet/deleteCartProduct.php',fd).subscribe((res: any)=>{
      if(res){
        this.data.splice(index, 1);
        this.grandTotal =0;
        this.getCartData();
      }
    });
  }
  async presentAlertConfirm(id: any, index: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Please Confirm',
      mode:'ios',
      message: '<strong>Are you sure you want to remove the item from the cart?</strong>',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('no worked');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log(index, id, 'Yes worked');
            this.removeItem(id, index);
          }
        }
      ]
    });

    await alert.present();
  }
  placeOrder(){
    this.data.forEach(ele => {
      const data ={
        // eslint-disable-next-line @typescript-eslint/naming-convention
        product_id: ele.productId,
        quantity: ele.quantity,
        amount: ele.price
      };
      this.products.push(data);
    });
    console.log(this.products);
    const navigationExtra: NavigationExtras = {
      queryParams:{
        cash: this.walletCash,
        amount: this.grandTotal.toFixed(2).toString(),
        products: JSON.stringify(this.products),
      }
    };
    this.router.navigateForward('add-address', navigationExtra);
  }
  toProduct(data: any,vendor: any){
    data['vendor'] = vendor;
    const navigationextras: NavigationExtras = {
      queryParams: {
        product: JSON.stringify(data)
      }
    };
    console.log(data);
    this.router.navigateForward('product-details', navigationextras);
  }
}
