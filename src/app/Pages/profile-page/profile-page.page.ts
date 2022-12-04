import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
//import { LoadChildrenCallback } from '@angular/router';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
import { USER_PROFILE } from 'src/app/endpoint/endpoint';
import { ApiService } from 'src/app/Service/api.service';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.page.html',
  styleUrls: ['./profile-page.page.scss'],
})
export class ProfilePagePage implements OnInit {
  id: any='';
  name: any='';
  data: any=[];
  loading: any='';
  userData: any='';
  newdata = { nickname:'' };
  userCheck: boolean;
  command = 'private';
  chatid = null;
  gender ='';
  playerId: any =[];
  constructor(
    public api: ApiService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public route: ActivatedRoute,
    public authService: AuthService,
    public loadingController: LoadingController,) {}
  ngOnInit(){
    // this.id = this.navParams.get('id');
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('user id', ' ',this.id);
    this.getData();
    this.userData =JSON.parse(localStorage.getItem('userData'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
   async getData(){
      const fd = new FormData();
      fd.append('user_token', this.authService.currentUserValue.token);
      fd.append('user_id',this.id);
      await this.api.post_request(USER_PROFILE, fd).subscribe((res: any) => {
        // this.loading.dismiss();
        if (res.status == 'Success') {
          this.userCheck = this.authService.currentUserValue.user_id == res.data.user_id ? true : false;
          this.data = res.data;
          this.playerId.push(this.data.player_id);
          this.gender = this.data.gender.charAt(0).toUpperCase() + this.data.gender.slice(1);
          console.log(this.data);
        } else {
          console.log('No Profile Found');
        }
      },err=>{
        console.log(err);
      });
    }
    goTo(id: any, name: any){
      const navigationExtras: NavigationExtras = {
        queryParams:{
          id,
          command: this.command,
          chatId: this.chatid,
          title: name,
          playerId: JSON.stringify(this.playerId)
        }
      };
      console.log(id);
      this.navCtrl.navigateForward('chatroom', navigationExtras);
      //this.app.getRootNav().push(AddRoomPage, {'friendid': this.data.user_id,'name':this.data.name,'image':this.data.profile_image});
        // this.navCtrl.setRoot(AddRoomPage, {'friendid': this.data.user_id, 'image':this.data.profile_image});
    }

}
