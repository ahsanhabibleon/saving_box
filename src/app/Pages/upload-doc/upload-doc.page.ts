import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, NavController } from '@ionic/angular';
import { ADD_DOC, VIEW_DOC } from 'src/app/endpoint/endpoint';
import { ApiService } from 'src/app/Service/api.service';
import { AuthService } from 'src/app/Service/auth.service';
import { Country, State, City }  from 'country-state-city';
@Component({
  selector: 'app-upload-doc',
  templateUrl: './upload-doc.page.html',
  styleUrls: ['./upload-doc.page.scss'],
})

export class UploadDocPage implements OnInit {
  imageUpload: any='';
  loading: any='';
  userData: any='';
  expdate: any='';
  issueDate: any='';
  doctype: any='';
  country: any='';
  state: any='';
  idnumber: any='';
  imagestatus: any= 0;

  constructor(
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    public api: ApiService,
    public navCtrl: NavController,
    public authService: AuthService
  ) {}

  ngOnInit(){
    this.view();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploaddocsPage');
  }
  // goBack() {
  //   this.navCtrl.navigateForward('');
  // }
  openCamera(sourceType) {
    const options: CameraOptions = {
      quality: 30,
      sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 300,
      targetHeight: 300,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: false,
    };

    this.camera.getPicture(options).then((imageData) => {
      this.imageUpload = 'data:image/jpeg;base64,' + imageData;
      this.imagestatus = 1;
    }, (err) => {
      // Handle error
      alert(JSON.stringify(err));
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.openCamera(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.openCamera(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  upload(){
    console.log(this.issueDate+this.expdate);
  // eslint-disable-next-line max-len
  if(this.doctype !== '' && this.idnumber !=='' && this.imageUpload !=='' && this.expdate !=='' && this.issueDate !=='' && this.country !=='' && this.state !==''){
    //this.loading = this.loadingController.create({ content: "Please wait..." });
    // this.loading.present();
    const fd=new FormData();
    fd.append('user_token',this.authService.currentUserValue.token);
    fd.append('docimage',this.imageUpload);
    fd.append('idtype',this.doctype);
    fd.append('idnumber',this.idnumber);
    fd.append('image_status',this.imagestatus);
    fd.append('state',this.state);
    fd.append('country',this.country);
    fd.append('issueDate',this.issueDate);
    fd.append('expiryDate',this.expdate);
    this.api.post_request(ADD_DOC,fd).subscribe((res: any)=>{
    console.log(res);
    //this.loading.dismiss();
    //this.componentProvider.presentToast(res.message);
    if(res.status ==='Success'){
      this.imagestatus = 0;
      this.navCtrl.pop();
      //this.events.publish('doc:ceated', Date.now());
    }else{
      console.log('not successful');
    }
    },err=>{
      console.log(err);
    });
  }
  else{
    if(this.doctype === ''){
     // this.componentProvider.presentToast("Please select document type.")
    }else if(this.idnumber === ''){
      //this.componentProvider.presentToast("Please enter document number")
    }else if(this.imageUpload === ''){
      //this.componentProvider.presentToast("Please add document image")
    }
    else if(this.country === ''){
      //this.componentProvider.presentToast("Please fill country ")
    }
    else if(this.state === ''){
      //this.componentProvider.presentToast("Please fill state")
    }
    else if(this.expdate ===''){
      //this.componentProvider.presentToast("Please select Expiry date")
    }
    else if(this.issueDate === ''){
      //this.componentProvider.presentToast("Please select Issue date")
    }
   }
  }
  view(){
    //this.loading = this.loadingController.create({ content: "Please wait..." });
    //this.loading.present();
    const fd=new FormData();
    fd.append('user_token',this.authService.currentUserValue.token);
    this.api.post_request(VIEW_DOC,fd).subscribe((res: any)=>{
    console.log(res);
    //this.loading.dismiss();
    //this.componentProvider.presentToast(res.message);
    if(res.status ==='Success'){
      this.imageUpload=res.data.docimage;
      this.doctype=res.data.idtype;
      this.idnumber=res.data.idnumber;
      this.country = res.data.docCountry;
      this.state = res.data.docState;
      this.issueDate = res.data.issueDate;
      this.expdate = res.data.expiryDate;
      console.log(this.imageUpload);
    }else{
    }
    },err=>{
      console.log(err);
    });
  }
  pop(){
    this.navCtrl.pop();
  }

}
