import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
@Component({
  selector: 'app-shop-dashboard',
  templateUrl: './shop-dashboard.page.html',
  styleUrls: ['./shop-dashboard.page.scss'],
})
export class ShopDashboardPage implements OnInit {
  constructor(
    private speechRecognition: SpeechRecognition,
    public navctrl: NavController
  ) {}

  ngOnInit() {}

  speechRecoganized() {
    this.speechRecognition.requestPermission().then(
      () =>
        this.speechRecognition.startListening().subscribe(
          (matches: string[]) => alert(JSON.stringify(matches)),
          (onerror) => console.log('error:', onerror)
        ),
      () => console.log('Denied')
    );
  }

  openProduct() {
    this.navctrl.navigateForward('product-details');
  }
}
