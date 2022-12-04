import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { NgZone } from '@angular/core';
@Component({
  selector: 'app-searched-product',
  templateUrl: './searched-product.page.html',
  styleUrls: ['./searched-product.page.scss'],
})
export class SearchedProductPage implements OnInit {
  data: any;
  categoryList: any;
  title='';
  resultCheck: boolean;
  isRecording=false;
  constructor(private http: HttpClient,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private speechRecognition: SpeechRecognition,
    private ngZone: NgZone,
    private cdref: ChangeDetectorRef) {
    this.route.queryParams.subscribe(prams=>{
      this.title = prams.title;
      console.log(prams);
      console.log(this.title);
      this.searchProduct(this.title);
      prams.title ='';
    });
   }
   ionViewWillEnter(){
   }
  ngOnInit() {
  }
  backToHome(){
    this.navCtrl.navigateBack('home');
  }
  productDetail(data: any)
  {
    const navigationExtra: NavigationExtras={
      queryParams:{
        product: JSON.stringify(data)
      }
    };
    console.log(data);
    this.navCtrl.navigateForward(`product-details`,navigationExtra);
  }
  searchProduct(item: any){
    console.log(item);
    this.http.get(`https://thesavingsbox.com/api/chat-server/public/api/get-products/${item}`).subscribe((res: any)=>{
      if(res.status == 200){
        this.data = res.data.products;
        console.log(this.data);
        if(this.data.length!==0){
          this.resultCheck=true;
          console.log(this.resultCheck);
        }
        else{
          this.resultCheck=false;
          console.log(this.resultCheck);
        }
      }
    });
  }
  search(item: any){
    this.isRecording=false;
    this.cdref.detectChanges()
    console.log(item);
    this.http.get(`https://thesavingsbox.com/api/chat-server/public/api/get-products/${item}`).subscribe((res: any)=>{
      if(res.status == 200){
        this.data = res.data.products;
        console.log(this.data);
        if(this.data.length!==0){
          this.resultCheck=true;
          console.log(this.resultCheck);
        }
        else{
          this.resultCheck=false;
          console.log(this.resultCheck);
        }
      }
    });
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
      this.isRecording=true;
      const options = {
        showPopup: false,
      };
      this.speechRecognition.startListening(options)
     .subscribe(
        (matches: string[]) => {
          this.ngZone.run(()=>{
            this.isRecording=false;
            this.cdref.detectChanges()
            this.title = matches[0];
            this.search(this.title);
          });
        },
        (onerror) => console.log('error:', onerror)
      );
    }
  });
  }
  toCart(){
    this.navCtrl.navigateForward('shopping-cart');
  }
  toHistory(){
    this.navCtrl.navigateForward('shopping-history');
  }
}
