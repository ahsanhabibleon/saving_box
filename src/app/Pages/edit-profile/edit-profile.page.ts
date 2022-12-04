import { EDIT_PROFILE_CONFIRM, GET_PROFILE_USER } from './../../endpoint/endpoint';
import { countryCode, paisCode } from './../../Service/Countrycode';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/Service/api.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AuthService } from 'src/app/Service/auth.service';
import * as moment from 'moment';
import { Country, State, City }  from 'country-state-city';
declare let google: any;
declare let $: any;
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  public profileForm: FormGroup;
  loading: any;
  userData: any = [];
  autocompleteItems;
  autocomplete;
  countries: any;
  latitude = 0;
  longitude = 0;
  geo: any;
  code = '1';
  paisCode=paisCode;
  countryCode: any;
  imageUpload: any = '';
  profile_status: any = '';
  imagestatus: any = 0;
  events: any;
  service = new google.maps.places.AutocompleteService();
  image: string;
  states: any;
  cities: any;
  countrycode: any;
  stateCode: any;
  selectedCity: any;
  firstDate;
  constructor(
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    public zone: NgZone,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public api: ApiService,
    public authservice: AuthService,
  ) {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      dob: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      zip_code: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      profile_image: [''],
      address:['', Validators.compose([Validators.required])],
      address2: ['', Validators.compose([Validators.required])],
      ssn: ['', Validators.compose([Validators.required])]
    });
    this.autocompleteItems = [];
    this.autocomplete = {
      query: '',
    };
  }
  getFirst(){
    if(this.firstDate == undefined){return;}
    return new Date(this.firstDate);
  }
  ionViewWillEnter(){
    this.getuserProfile();
    this.populateState('US');
   }
   async populateState(countrycode: any){
    this.states = await State.getStatesOfCountry(countrycode);
    console.log(this.states);
    this.countryCode = countrycode;
   }
   populateCity(statecode: any){
    this.cities = City.getCitiesOfState(this.countryCode,statecode);
    console.log(this.countryCode, ' ', statecode);
    this.cities['name'] = this.selectedCity;
    console.log(this.cities);
   }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ProfileDetailsPage');
  // }
  ngOnInit() {
    this.countries = Country.getAllCountries();
    console.log(this.countries);
    // this.getuserProfile();
    // let getdate = this.userData.date_of_birth;
    // let newDate = moment(getdate).format('MMMM-DD-YYYY');
    //const stringvalue = newDate. format('YYYY-MM-DD');
    // debugger
    // $('.accordion__answer:first').show();
    // $('.accordion__question:first').addClass('expanded');
    // setTimeout(() => {
    //   $('#signin-mobileno').intlTelInput({
    //     hiddenInput: "phone-no",
    //     initialCountry: "gb",
    //     utilsScript: "assets/js/utils.js"
    //   });
    // }, 200);
    // this.profileForm.patchValue({
    //   name: this.userData.name,
    //   email: this.userData.email,
    //   gender: this.userData.gender,
    //   dob:  new Date(newDate).toISOString(),
    //   address: this.userData.location,
    //   phone: this.userData.mobile,
    //   country: this.userData.country,
    //   city: this.userData.city,
    //   postalcode: this.userData.postalcode,
    //   state: this.userData.state,
    //   profile_image:this.userData.profile_image
    // });
    console.log(this.profileForm.controls.date_of_birth);
    if (this.userData.dial_code) {
      this.code = this.userData.dial_code;
    }
  }
  dismiss() {
    this.autocomplete = [];
    // this.viewCtrl.dismiss();
  }


 getuserProfile()
  {
    const fd = new FormData();
    // fd.append('user_token', this.authservice.currentUserValue.token);
    this.authservice.profileData().subscribe((res: any)=>{
      if(!res.error){
        this.userData = res.info;
        this.stateCode = res.info.state;
        this.selectedCity = res.info.city;
        console.log(this.userData);
        this.profileForm.patchValue(this.userData);
      }
    });
  }

  editProfileData(){
    // var phone = document.getElementById("profile-mobileno");
    // var country = $(phone).intlTelInput("getSelectedCountryData").dialCode;
    //this.loading = this.loadingController.create({ content: "Please wait..." });
    //this.loading.present();
    const dateOfBirth = this.profileForm.value.dob;
    const fd = new FormData();
    fd.append('name', this.profileForm.value.name);
    fd.append('user_token', this.authservice.currentUserValue.token);
    fd.append('email', this.profileForm.value.email);
    fd.append('dial_code', this.profileForm.value.dial_code);
    fd.append('mobile', this.profileForm.value.mobile);
    fd.append('gender', this.profileForm.value.gender);
    fd.append('date_of_birth', this.profileForm.value.date_of_birth);
    fd.append('location', this.profileForm.value.location);
    fd.append('profile_image', this.imageUpload);
    fd.append('image_status', this.imagestatus);
    fd.append('country', this.profileForm.value.country);
    fd.append('postal_code', this.profileForm.value.postal_code);
    fd.append('city', this.profileForm.value.city);
    fd.append('state', this.profileForm.value.state);
    console.log(this.imageUpload);
    console.log(this.imagestatus);
    this.api.post_request(EDIT_PROFILE_CONFIRM, fd).subscribe(
      (res: any) => {
        // this.loading.dismiss();
        //this.componentProvider.presentToast(res.message);
        if (res.status == 'Success') {
          // this.userData = JSON.parse(localStorage.getItem("registeredData"));
          // this.userProfile();
          // this.signinForm.reset();
          this.imagestatus = 0;
          this.authservice.currentUserSubject.next(res.data);
          console.log(this.authservice.currentUserSubject);
          //this.events.publish('user:created', Date.now());
          this.navCtrl.navigateForward(['tabs/tabs/tab5']);
        } else {
        }
      },
      (err) => {
        // this.loading.dismiss();
        console.log(err);
      }
    );
  }

  pop(){
    this.navCtrl.navigateBack('tabs/tabs/tab5')
  }

  openCamera(sourceType) {
    const options: CameraOptions = {
      quality: 30,
      sourceType: sourceType,
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
          console.log(this.imageUpload);
          this.userData.profile_image = this.imageUpload;
      },
      (err) => {
        // Handle error
        alert(JSON.stringify(err));
      }
    );
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


  openDoc()
  {
    this.navCtrl.navigateForward('upload-doc');
  }

  chooseItem(item: any) {
    console.log(item);
    this.geo = item;
  }
  geoCode(address: any) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      this.latitude = results[0].geometry.location.lat();
      this.longitude = results[0].geometry.location.lng();
      this.autocompleteItems = [];
      this.profileForm.controls.address.setValue(address);
      this.loading.dismiss();
    });
  }
  updateSearch() {
    console.log('enter');
    console.log(this.profileForm.value.address);
    if (this.profileForm.value.address == '') {
      this.autocompleteItems = [];
      return;
    }

    const me = this;
    this.service.getPlacePredictions(
      {
        input: this.profileForm.value.address,
      },
      (predictions, status) => {
        me.autocompleteItems = [];
        console.log(predictions);
        me.zone.run(() => {
          if (predictions != null) {
            predictions.forEach((prediction) => {
              me.autocompleteItems.push(prediction.description);
            });
            // this.autocomplete.query= predictions[0].description;
            console.log(me.autocompleteItems);
          }
        });
      }
    );
  }
}
  // goBack() {
  //   // this.navCtrl.push(MyProfilePage);
  //   // this.navCtrl.goBack('/pageA');
  //   // this.navCtrl.popTo(MyProfilePage);
  // }

  // userProfile() {
  //   // this.userData = JSON.parse(localStorage.getItem("userData"));
  //   console.log(this.userData);
  //   let fd = new FormData();
  //   fd.append("user_token", this.userData.token),
  //     this.api.post("view_profile.php", fd).subscribe(
  //       (res: any) => {
  //         console.log(res);
  //         if (res.status == "Success") {
  //           localStorage.setItem("userData", JSON.stringify(res.data));
  //           this.userData = JSON.parse(localStorage.getItem("userData"));
  //           if (
  //             this.userData.profile_image != "undefined" &&
  //             this.userData.profile_image
  //           ) {
  //             this.imageUpload = this.userData.profile_image;
  //           } else {
  //             this.imageUpload = "";
  //           }
  //         } else {
  //         }
  //       },
  //       (err) => {}
  //     );
  // }

  //   this.geoCode(this.geo); //convert Address to lat and long
  //   geoCode(address: any) {
  //   this.loading = this.loadingController.create({
  //     content: "Logging in ,please wait...",
  //   });
  //   this.loading.present();
  //   let geocoder = new google.maps.Geocoder();
  //   geocoder.geocode({ address: address }, (results, status) => {
  //     this.latitude = results[0].geometry.location.lat();
  //     this.longitude = results[0].geometry.location.lng();
  //     this.autocompleteItems = [];
  //     this.profileForm.controls.address.setValue(address);
  //     this.loading.dismiss();
  //   });
  // }

