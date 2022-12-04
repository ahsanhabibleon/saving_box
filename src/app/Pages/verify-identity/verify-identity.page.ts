import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController } from '@ionic/angular';
import { ProcessSuccessComponent } from 'src/app/Components/process-success/process-success.component';
import { process_success } from 'src/app/enum';

@Component({
  selector: 'app-verify-identity',
  templateUrl: './verify-identity.page.html',
  styleUrls: ['./verify-identity.page.scss'],
})
export class VerifyIdentityPage implements OnInit {
  imageUrl: any;
  constructor(private camera: Camera, private mdCtrl: ModalController) {}

  ngOnInit() {
    // this.openCamera()
  }

  navigate() {}
  async openModal() {
    const modal = await this.mdCtrl.create({
      component: ProcessSuccessComponent,
      backdropDismiss: true,
      componentProps: { type: process_success.BANK.toString() },
      keyboardClose: true,
      mode: 'ios',
      showBackdrop: true,
      swipeToClose: false,
      id: 'contact',
    });
    modal.present();
    modal.onDidDismiss().then((res) => {});
  }

  openCamera() {
    let image: any;
    let finalImage: string[];
    const options: CameraOptions = {
      quality: 30,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 300,
      targetHeight: 300,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: false,
      cameraDirection: 1,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        image = 'data:image/jpeg;base64,' + imageData;
        localStorage.setItem('faceToVerify', JSON.stringify(image));
        console.log(image);
      },
      (err) => {
        // Handle error
        //alert(JSON.stringify(err));
        console.log(err);
      }
    );
  }
}
