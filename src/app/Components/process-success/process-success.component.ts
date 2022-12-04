import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavParams,ModalController } from '@ionic/angular';
import { process_success } from 'src/app/enum';

@Component({
  selector: 'app-process-success',
  templateUrl: './process-success.component.html',
  styleUrls: ['./process-success.component.scss'],
})
export class ProcessSuccessComponent implements OnInit {
  type = process_success;
  processType: number;
  constructor(private route: ActivatedRoute, private navparams: NavParams,private modal:ModalController) { }
  ionViewWillEnter(){

  }
  ngOnInit() {
    console.log()
    this.processType=Number(this.navparams.get('type'));
    this.processType =1;
    console.log(this.processType);
  }
  dismiss(){
    console.log("dismiss modal");
this.modal.dismiss();
  }

}
