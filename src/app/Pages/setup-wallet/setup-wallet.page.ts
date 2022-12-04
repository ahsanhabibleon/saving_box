import { Component, OnInit } from '@angular/core';
import {  NavController } from '@ionic/angular';

@Component({
  selector: 'app-setup-wallet',
  templateUrl: './setup-wallet.page.html',
  styleUrls: ['./setup-wallet.page.scss'],
})
export class SetupWalletPage implements OnInit {
  walletName: any;
  checkBoxConfirms: boolean = false;
  constructor(private navcontroller: NavController) { }

  ngOnInit() {
  }
  navigate(){
    this.navcontroller.navigateRoot('pages-addbank');
  }
}
