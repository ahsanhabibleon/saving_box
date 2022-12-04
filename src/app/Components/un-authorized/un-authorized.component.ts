import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-un-authorized',
  templateUrl: './un-authorized.component.html',
  styleUrls: ['./un-authorized.component.scss'],
})
export class UnAuthorizedComponent implements OnInit {
  iscompleted;
  isallcompleted;
  constructor(private navCtrl: NavController) {
    this.iscompleted = false;
    this.isallcompleted = localStorage.getItem('isallcompleted');
    if(this.isallcompleted === 'true'){
         this.iscompleted = true;
    }
  }

  ngOnInit() {}

  navigate(){
    this.navCtrl.navigateForward('create-profile')
  }
}
