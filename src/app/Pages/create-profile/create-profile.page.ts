/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable max-len */
import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {
  ActionSheetController,
  AlertController,
  NavController,
} from '@ionic/angular';
import {
  EDIT_PROFILE_CONFIRM,
  GET_PROFILE_USER,
} from 'src/app/endpoint/endpoint';
import { ApiService } from 'src/app/Service/api.service';
import { AuthService } from 'src/app/Service/auth.service';
import { countryCode, paisCode } from './../../Service/Countrycode';
import { Country, State, City } from 'country-state-city';
import { BankService } from '../../Service/bank.service';
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.page.html',
  styleUrls: ['./create-profile.page.scss'],
})
export class CreateProfilePage implements OnInit {
  createProfileForm: FormGroup;
  imageUpload: any = '';
  imagestatus: any = 0;
  paisCode = paisCode;
  address: string;
  states: any;
  cities: any;
  countryCode: any;
  stateCode: any;
  selectedCity: any;
  countries: any;
  noImage: boolean = false;
  currenttoken;
  constructor(
    private camera: Camera,
    public formBuilder: FormBuilder,
    public api: ApiService,
    public authService: AuthService,
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    private bankService: BankService,
    private alert: AlertController
  ) {}
  ionViewWillEnter() {
    this.presentAlert();
    this.populateState('US');
    let token = this.authService.getToken();
    this.bankService.createtoken(token).subscribe(
      (res: any) => {
        console.log('res');
        console.log(res);
        this.currenttoken = res.access_token;
      },
      (err) => {
        console.log(err);
        //this.loading.dismiss();
      }
    );
  }
  ngOnInit() {
    this.createProfileFormInit();
  }

  async presentAlert() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      //subHeader: 'Please Confirm',
      message:
        'Please make sure to enter the details that you provided to the bank.',
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  pop() {
    this.navCtrl.navigateRoot('tabs/tabs/tab1');
  }

  async populateState(countrycode: any) {
    this.states = await State.getStatesOfCountry(countrycode);
    console.log(this.states);
    this.countryCode = countrycode;
  }

  populateCity(statecode: any) {
    this.cities = City.getCitiesOfState(this.countryCode, statecode);
    console.log(this.countryCode, ' ', statecode);
    this.cities['name'] = this.selectedCity;
    console.log(this.cities);
  }

  addAddress(city: any) {
    const address =
      this.createProfileForm.controls.city.value +
      ', ' +
      this.createProfileForm.controls.state.value +
      ', ' +
      this.createProfileForm.controls.country.value +
      ', ' +
      this.createProfileForm.controls.postalcode.value;
    this.createProfileForm.controls.address1.patchValue(address);
  }

  createProfileFormInit(): void {
    this.createProfileForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ]),
      ],
      address1: ['', Validators.compose([Validators.required])],
      dateOfBirth: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      postalCode: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5),
        ]),
      ],
      state: ['', Validators.compose([Validators.required])],
      ssn: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
        ]),
      ],
      ip: [localStorage.getItem('ip')],
      user_id: [localStorage.getItem('user_id')],
      profile_image: [this.imageUpload],
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.openCamera(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.openCamera(this.camera.PictureSourceType.CAMERA);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  //Open Camera to Select Image
  openCamera(sourceType: any) {
    const options: CameraOptions = {
      quality: 30,
      sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 300,
      targetHeight: 300,
      // encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: false,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        this.imageUpload = 'data:image/jpeg;base64,' + imageData;
        this.imagestatus = 1;
        console.log(imageData);
      },
      (err) => {
        // Handle error
        //alert(JSON.stringify(err));
        console.log(err);
      }
    );
  }

  openDoc() {
    this.navCtrl.navigateForward('upload-doc');
  }

  submitProfile() {
    if (JSON.parse(localStorage.getItem('profile_status')) == 1) {
      this.navCtrl.navigateForward('verify-identity');
      return;
    } else if (this.imageUpload == '' || this.imageUpload == null) {
      this.noImage = true;
      return;
    }
    // var phone = document.getElementById("profile-mobileno");
    // var country = $(phone).intlTelInput("getSelectedCountryData").dialCode;
    //this.loading = this.loadingController.create({ content: "Please wait..." });
    //this.loading.present();
    // eslint-disable-next-line max-len
    //console.log(this.authService.currentUserValue.token);
    //const address = this.createProfileForm.controls.city.value +', '+ this.createProfileForm.controls.state.value +', '+ this.createProfileForm.controls.country.value +', '+this.createProfileForm.controls.postalcode.value;
    /*
    const fd :any = new FormData();
    console.log(this.createProfileForm.controls.firstName.value);
    fd.append('firstName', this.createProfileForm.controls.firstName.value);
    fd.append('lastName', this.createProfileForm.controls.lastName.value);
    fd.append('email', this.createProfileForm.controls.email.value);
    fd.append('dateOfBirth', this.createProfileForm.controls.dateOfBirth.value);
    fd.append('profile_image', this.imageUpload);
    fd.append('postalCode',this.createProfileForm.controls.postalCode.value);
    fd.append('city', this.createProfileForm.controls.city.value);
    fd.append('state', this.createProfileForm.controls.state.value);
    fd.append('user_id', this.createProfileForm.controls.user_id.value);
    fd.append('ssn', this.createProfileForm.controls.ssn.value);
    fd.append('address1', this.createProfileForm.controls.address1.value);
    fd.append('ip', this.createProfileForm.controls.ip.value);
    fd.append('user_id', this.createProfileForm.controls.user_id.value);
*/
    let urlencoded = new URLSearchParams();
    urlencoded.append(
      'firstName',
      this.createProfileForm.controls.firstName.value
    );
    urlencoded.append(
      'lastName',
      this.createProfileForm.controls.lastName.value
    );
    urlencoded.append('email', this.createProfileForm.controls.email.value);
    urlencoded.append(
      'address1',
      this.createProfileForm.controls.address1.value
    );
    urlencoded.append('city', this.createProfileForm.controls.city.value);
    urlencoded.append('state', this.createProfileForm.controls.state.value);
    urlencoded.append(
      'postalCode',
      this.createProfileForm.controls.postalCode.value
    );
    urlencoded.append(
      'dateOfBirth',
      this.createProfileForm.controls.dateOfBirth.value
    );
    urlencoded.append('ssn', this.createProfileForm.controls.ssn.value);
    urlencoded.append('ip', this.createProfileForm.controls.ip.value);
    urlencoded.append('user_id', this.createProfileForm.controls.user_id.value);
    urlencoded.append('profile_image', this.imageUpload);
    urlencoded.append('user_id', this.createProfileForm.controls.user_id.value);

    this.bankService.createCustomer(urlencoded, this.currenttoken);
    /*
    .subscribe(
      (res: any) => {
        console.log(res);
        if (res.status === 'Success') {
          this.authService.currentUserSubject.next(res.data);
          localStorage.setItem('name', res.data.name);
          localStorage.setItem('face_login', res.data.faceLogin);
          localStorage.setItem('user_id', this.authService.currentUserValue.user_id);
          this.imagestatus = 0;
          localStorage.setItem('userData', JSON.stringify(res.data));
          console.log(localStorage.getItem('userData'));
          this.navCtrl.navigateRoot('tabs/tabs/tab1');
        } else {
        }
      },
      (err) => {
        console.log(err);
        //this.loading.dismiss();
      }
    );
    */
  }
  /*
sendcheck(){
  let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Accept", "application/json");
myHeaders.append("Authorization", "Bearer cnIqtBwTaEx74W6NvonctYJhuawAwSLCwktW126S21j74JBgLc");



var requestOptions :any = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://thesavingsbox.com/api/bank/customer/create.php", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
*/
}
