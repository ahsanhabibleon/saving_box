import { ActivatedRoute } from '@angular/router';
import { STATIC_VIEW } from './../../endpoint/endpoint';
import { AuthService } from './../../Service/auth.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-box-analytics',
  templateUrl: './box-analytics.page.html',
  styleUrls: ['./box-analytics.page.scss'],
})
export class BoxAnalyticsPage implements OnInit {
  id: string;
  gaugeType = 'full';
  gaugeLabel = 'Savings Box';
  gaugeAppendText = '';
  gaugePrependText = '$';
  backgroundcolor = 'rgb(255,0,0)';
  data: any;
  min: number;
  max: number;
  gaugeValue: number;
  groupuser: any = [];
  constructor(
    public apiservice: ApiService,
    public authservice: AuthService,
    public route: ActivatedRoute
  ) {
    // this.id = this.route.snapshot.paramMap.get('cycleid');
    // this.getcycleData(this.id);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(prams=>{
      this.max = prams.max;
      this.gaugeValue = prams.gaugeValue;
      this.groupuser = JSON.parse(prams.groupuser);
    });
  }
  // getcycleData(id: any) {
  //   let formData = new FormData();
  //   formData.append('user_token', this.authservice.currentUserValue.token);
  //   formData.append('cycle_id', id);
  //   this.apiservice
  //     .post_request(STATIC_VIEW, formData)
  //     .subscribe((res: any) => {
  //       console.log(res);
  //       this.max = res.data.total_amount;
  //       this.gaugeValue = res.data.total_paid;
  //       this.groupuser = res.data.user;
  //     });
  // }

  getPercenage(totalPaid: any, totalAmount: any) {
    let percentage;
    if(totalAmount == 0){
      percentage = 0;
    }
    else{
      percentage = (parseFloat(totalPaid) / parseFloat(totalAmount)) * 100;
    }
    return percentage;
  }
}
