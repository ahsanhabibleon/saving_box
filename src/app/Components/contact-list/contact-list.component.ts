import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AuthService } from './../../Service/auth.service';
import { GET_MEMBER_LIST } from './../../endpoint/endpoint';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  contactlist: any;
  membersData: any =[];
  suggestData: any = [];
  selectedData: any=[];
  arrayData: any = [];
  slice: number= 50;
  fileterdata: any=[];
  showFilter: boolean = false;
  constructor(
    public navparams: NavParams,
    public apiservice: ApiService,
    public authservice: AuthService,
    public plt: Platform,
    public modalCtrl: ModalController,
    public socailSharing: SocialSharing
  ) {
  }
  doInfinite(infiniteScroll) {

    setTimeout(() => {
      infiniteScroll.target.complete();
      this.slice += 5;
    }, 500);

  }
  ngOnInit() {
    this.authservice.loaderSubject.next(false);
    this.getData();
    this.sortingData();
  }
  sortingData(){
    this.suggestData = this.navparams.get('contact');
    if (this.plt.is('android')) {
      this.suggestData.sort((a, b) => {
        if (a.newname != null && b.newname != null) {
          const nameA = a.newname.toUpperCase(); // ignore upper and lowercase
          const nameB = b.newname.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        }
      }
      );
    }
    if (this.plt.is('ios')) {
      this.suggestData.sort((a, b) => {
        if (a._objectInstance.name.formatted < b._objectInstance.name.formatted) {
          return -1;
        }
        if (a._objectInstance.name.formatted > b._objectInstance.name.formatted) {
          return 1;
        }
        return 0;
      });
    }
  }
  filterTechnologies(param: any): void
  {
     const val: string 	= param.target.value;
     // DON'T filter the technologies IF the supplied input is an empty string
     if (val && val.trim() !== '' && val.length > 2)
     {

        this.showFilter = true;
        this.fileterdata = this.suggestData.filter((item) =>
        {
          if(item.newname!=null)
          {
            return item.newname.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
          }
          else{
            return item.objectInstance?.name?.formatted.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
          }
        });
      }
      else{
        this.showFilter=false;
      }
  }
  close()
  {
    this.modalCtrl.dismiss(this.selectedData,'contactselected','contact');
  }
  getData() {
    const fd = new FormData();
    fd.append('user_token', this.authservice.currentUserValue.token);
    fd.append('phone', JSON.stringify(this.navparams.get('data')));
    this.apiservice.post_request(GET_MEMBER_LIST, fd).subscribe((res: any) => {
      this.membersData = res.data;
      const checkdata = res.data;
      if (checkdata.length > 0) {
        checkdata.forEach((element) => {
          this.membersData.forEach((ele, key) => {
            if (element.user_id == ele.user_id) {
              // turn it to true hs has chage it
              this.membersData[key].selected = false;
              // uncomment this code also
              // this.selectedData.push(this.membersData[key]);
            }
          });
        });
      }
      else {
      }
    });
  }

  sendsuggestion(data) {
    const shareMessage ='\nYou have been invited to join a Savings Box! Click here to download!\n\n';
    const message = shareMessage + 'https://appurl.io/2hIXEZS8_' + '\n' +'Thanks for your interest in our App!';
    const phone = data.number;
    this.socailSharing
      .shareViaSMS(message, phone)
      .then(() => {
        // Sharing via email is possible
      })
      .catch(() => {
        // Sharing via email is not possible
      });
  }

  add(data){
    this.membersData.forEach((element, key) => {
      if(data.user_id == element.user_id){
        if(this.membersData[key]['selected']){
          if(this.membersData[key]['selected'] == true){
            this.selectedData.forEach((e ,k) => {
              if(e.user_id == this.membersData[key].user_id){
                this.selectedData.splice(k, 1);
                }
            });
           this.membersData[key]['selected'] = false;
          }else if(this.membersData[key]['selected'] == false){
            this.selectedData.push(element);
            this.membersData[key]['selected'] = true;
          }else{}
        }else{
          this.selectedData.push(element);
          this.membersData[key]['selected'] = true;
        }
      }
    });
    localStorage.setItem('members', JSON.stringify(this.selectedData));
  }
}
