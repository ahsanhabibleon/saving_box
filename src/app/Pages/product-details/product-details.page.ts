import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { IonContent, NavController } from '@ionic/angular';
import { WALLET } from 'src/app/endpoint/endpoint';
import { ApiService } from 'src/app/Service/api.service';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  userId: string;
  data: any=[];
  quantity=1;
  walletCash: any;
  grandTotal: any;
  subtotal: any;
  products: any=[];
  categoryList: any;
  category: any;
  similarProducts: any;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private http: HttpClient,
    private apiservice: ApiService,
    private navCtrl: NavController) {
    this.route.queryParams.subscribe(prams=>{
      this.data = JSON.parse(prams.product);
    });
    this.userId = this.auth.currentUserValue.user_id;
    console.log(this.data);
   }
   ionViewWillEnter(){
    this.getCategoryList();
    this.getSimilarProducts();
   }
  ngOnInit() {
    this.getWalletOut();
  }
  pop(){
    this.navCtrl.navigateForward('home');
  }
  scrollToTop(){
    setTimeout(() => {
      this.content.scrollToTop(300);
   });
  }
  toCart(){

    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: localStorage.getItem('accessToken')
    });
    const options = {headers};
    const formData =new FormData();
    this.subtotal = this.quantity * this.data.sale_price;
    formData.append('subtotal', this.subtotal.toFixed(2).toString());
    formData.append('productId',this.data.id);
    formData.append('price', this.data.sale_price);
    formData.append('quantity', this.quantity.toString());
    formData.append('vendorId', this.data.vendor_id);
    this.http.post('https://thesavingsbox.com/api/chat-server/public/api/add-cart-item',formData,options).subscribe(res =>{
    if(res){
      console.log(res);
      this.navCtrl.navigateForward('home');
    }
    });
  }
  getWalletOut() {
    const formData = new FormData();
    formData.append('user_token', this.auth.currentUserValue.token);
    this.apiservice.post_request(WALLET, formData).subscribe((res: any) => {
      console.log(res);
      if (res.status == 'Success') {
        this.walletCash = res.data.wallet;
        console.log(this.walletCash);
      } else {
        this.walletCash = 0.0;
      }
    });
  }
  getValue(value: any){
    this.quantity =value;
  }
  toBuy(){
    const data ={
      // eslint-disable-next-line @typescript-eslint/naming-convention
      product_id: this.data.id,
      quantity: this.quantity,
      amount: this.data.sale_price
    };
    this.products.push(data);
    console.log(this.products);
    this.subtotal = this.quantity * this.data.sale_price;
    console.log(this.subtotal);
    const navigationExtra: NavigationExtras={
      queryParams:{
        cash: this.walletCash,
        amount: this.subtotal.toFixed(2).toString(),
        products: JSON.stringify(this.products)
      }
    };
    this.navCtrl.navigateForward('add-address', navigationExtra);
  }
  getCategoryList(){
    this.http.get('https://thesavingsbox.com/api/chat-server/public/api/get-categories').subscribe((res: any)=>{
      if(res.status == 200){
        this.categoryList = res.data.categories;
        this.categoryList.forEach(ele => {
          if(ele.id == this.data.category_id){
            this.category = ele.name;
          }
        });
      }
    });
  }
  getSimilarProducts(){
    this.http.get(`https://thesavingsbox.com/api/chat-server/public/api/similar-products/${this.data.title}`).subscribe((res: any)=>{
      if(res.status == 200){
        this.similarProducts = res.data.products;
        console.log(this.similarProducts);
      }
    });
  }
  details(item: any){
    console.log(item);
    this.data=item;
    this.scrollToTop();
  }
  openUrl(url: string){
    console.log(url);
    url = 'https://'+url;
    console.log(url);
    window.open(url,'_system', 'location=yes');
  }
  incrementQty(){
    if(this.quantity<10){
      this.quantity = this.quantity+1;
    }
  }
  decrementQty(){
    if(this.quantity>1){
      this.quantity = this.quantity-1;
    }
  }
}
