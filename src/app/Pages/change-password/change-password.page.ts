import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';
import { ApiService } from 'src/app/Service/api.service';
import { CHANGE_PASSWORD } from 'src/app/endpoint/endpoint';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  changeppassword: FormGroup;
  passwordCheck: boolean = false;
  emailId: any;
  constructor(public formBuilder: FormBuilder,
    private auth: AuthService,
    private api: ApiService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: NavController) {
      this.route.queryParams.subscribe(prams=>{
        this.emailId = prams.email;
        console.log('email from prams', this.emailId);
      });
    this.changeppassword = this.formBuilder.group({
      oldpassword: [ "",Validators.compose([ Validators.required,])],
      password:[ "",Validators.compose([ Validators.required,])],
      confirmpassword:[ "",Validators.compose([ Validators.required,])],

    });
  }

  ngOnInit() {
  }
  vrifyConfirmpassword() {
    if (this.changeppassword.value.confirmpassword != "") {
      console.log(
        this.changeppassword.value.password,
        this.changeppassword.value.confirmpassword
      );
      if (
        this.changeppassword.value.password == this.changeppassword.value.confirmpassword
      ) {
        this.passwordCheck = false;
      } else {
        this.passwordCheck = true;
      }
    }
  }
  changePassword()
  {
    const fd=new FormData();
    // fd.append('email',this.emailId);
    fd.append('current_password',this.changeppassword.value.oldpassword);
    fd.append('new_password',this.changeppassword.value.password);
    this.auth.resetPassword(fd).subscribe((res: any) =>{
      if(!res.error){
        this.changeppassword.reset();
        localStorage.removeItem('accessToken');
        // localStorage.removeItem('cureentuser');
        localStorage.removeItem('player_id');
        this.auth.currentUserSubject.next(null);
        this.navCtrl.navigateRoot('login');
      }
    }, err=>{
      console.log(err);
    });
  }
  pop(){
    this.router.pop()
  }
}
