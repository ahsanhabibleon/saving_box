import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { AlertController, MenuController, ModalController, NavController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ProductInfoModel } from 'src/app/Components/product-info/product-info-model';
import { WALLET } from 'src/app/endpoint/endpoint';
import { ApiService } from 'src/app/Service/api.service';
import { AuthService } from 'src/app/Service/auth.service';
import { DataService } from 'src/app/Service/data.service';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { NgZone } from '@angular/core';
import { ListenModalComponent } from 'src/app/Components/listen-modal/listen-modal.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slideOptsOne = {
    initialSlide: 0,
    autoplay: true,
    loop: true,
  };
  searchItem: any='';
  productList$: Observable<ProductInfoModel[]>;
  productList: any;
  categoryList: any;
  walletCash: any;
  match: string;
  isRecording=false;
  baseUrl: any='https://thesavingsbox.com/adminnew/images/products/category/';
  constructor(
    private menu: MenuController,
    private router: NavController,
    private http: HttpClient,
    private apiservice: ApiService,
    private auth: AuthService,
    private speechRecognition: SpeechRecognition,
    private ngZone: NgZone,
    private plt: Platform,
    private modal: ModalController,
    private cdref: ChangeDetectorRef
    ) {
    this.getCategoryList();
  }
  ionViewWillEnter(){
    this.searchItem = '';
    this.getProductList();
  }
  getCategoryList(){
    this.http.get('https://thesavingsbox.com/api/chat-server/public/api/get-categories').subscribe((res: any)=>{
      if(res.status == 200){
        this.categoryList = res.data.categories;
        console.log(this.categoryList);
      }
    });
  }
  getProductList(){
    this.http.get('https://thesavingsbox.com/api/chat-server/public/api/get-products').subscribe((res: any)=>{
      if(res.status == 200){
        console.log(res);
        this.productList = res.data.products;
      }
    });
  }
  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.getProductList();
      event.target.complete();
    }, 1000);
  }
  openCategory(item: any){
    const categoryId = item.id;
    console.log(item);
    this.http.get(`https://thesavingsbox.com/api/chat-server/public/api/category-products/${categoryId}`).subscribe((res: any)=>{
      if(res.status == 200){
        this.productList = res.data.products;
        console.log(res);
      }
    });
  }
  openMenu(){
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  toCart(){
    this.router.navigateForward('shopping-cart');
  }
  toHistory(){
    this.router.navigateForward('shopping-history');
  }
  search(item: any){
    this.isRecording=false;
    this.cdref.detectChanges()
    const navigationExtra: NavigationExtras={
      queryParams:{
        title: this.searchItem
      }
    };
    console.log(item);
    this.router.navigateForward(`searched-product`,navigationExtra);
  }
  requestCheck(){
  }
  startListen(){
    this.speechRecognition.hasPermission()
    .then((hasPermission: boolean) => {
    if(!hasPermission){
      this.speechRecognition.requestPermission()
      .then(
          () => console.log('Granted'),
          () => console.log('Denied')
      );
    }else{
      this.isRecording = true
      this.cdref.detectChanges()
      const options = {
        showPopup: false,
      };
      this.speechRecognition.startListening(options)
      .subscribe(
        (matches: string[]) => {
          this.ngZone.run(()=>{
            console.log(matches);
            this.searchItem = matches[0];
            this.search(this.searchItem);
          });
        },
        (onerror) => {
          console.log('error:', onerror);
        },
      );
      // this.isRecording=true;
    }
  });
  }
  getCategoryProducts(){
  }
//   isIos(){
//     return this.plt.is('ios');
//   }
//  async presentListenAlert(){
//   const modal = await this.modal.create({
//     component: ListenModalComponent,
//     cssClass: 'listenModal'
//   });
//   modal.present();
//   await modal.onDidDismiss().then((res) =>{
//     this.search(this.searchItem);
//    });
//   }

//   isAndroid(){
//     return this.plt.is('android');
//   }
  openChats(){
    this.router.navigateForward('shop-chat-page');
  }
  pop(){
    this.router.navigateRoot('tabs/tabs/tab1');
  }
}
