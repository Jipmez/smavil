import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { NgProgress } from 'ngx-progressbar';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare let $;
@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {
  token: string;
  visible: any;
  cookieValue: string;

  constructor(public toastr: ToastrService,private route: ActivatedRoute,public ngProgress: NgProgress,private server : DataService,private cookieService: CookieService,private nav: Router,protected localStorage: LocalStorage) { }
  ngOnInit() {
    $(".loader").fadeOut(); 
    $("#preloder").delay(400).fadeOut("slow");
    this.server.updateTitle('Reset Password');

    this.token = this.route.snapshot.paramMap.get('id')
    if(this.token.length == 64){
      let token = {
        token : this.token,
        key : 'tokenVerify'
      }
      this.server.SendToPhp(token).subscribe(
        (res)=>{
          if(res.code == 1){
            let bag=res.message;
            this.cookieService.set('logID',bag);
           this.visible = res.code
           
          }else if(res.code == 2){
            this.visible = res.code
          }
        }
      )
    }
  }
  analyze(x){
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    if(strongRegex.test(x)) {
      document.getElementById("id_pass").style.borderBottom = "2px solid green";
  } else if(mediumRegex.test(x)) {
    document.getElementById("id_pass").style.borderBottom  = "2px solid orange";
  } else {
    document.getElementById("id_pass").style.borderBottom  = "2px solid red";
  }
  }
  ChangePass(x:NgForm){
   console.log(x.value);
    if(this.server.LoggedIn()){
      this.cookieValue = this.cookieService.get('logID');

      if(x.value.Password === x.value.CPassword){
        let pass = {
          pass : x.value.Password,
          token : this.cookieValue,
          key : 'changePass'
        }
        this.server.SendToPhp(pass).subscribe(
          (res)=>{
            if(res.code == 1){
              return   this.toastr.success('Your password has been changed ');
            }
          }
        )
    }else{
      document.getElementById("id_cpass").style.borderBottom = "2px solid red";
    return   this.toastr.error('Password not in Sync');
    }
    }
  }


}
