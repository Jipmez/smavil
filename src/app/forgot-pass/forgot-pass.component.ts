import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { NgProgress } from 'ngx-progressbar';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
declare let $;
@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent implements OnInit {

  constructor(public ngProgress: NgProgress,private server : DataService,private cookieService: CookieService,private route: Router,protected localStorage: LocalStorage) { }
  ngOnInit() {
    $(".loader").fadeOut(); 
    $("#preloder").delay(400).fadeOut("slow");
  }


  forgotPass(x:NgForm){
    var emailRe =  /^.+@.+\..{2,4}$/;
   if(x.value.email.match(emailRe)){
      let forgot={
        email : x.value.email,
        key:'forgot',
      }
      this.server.SendToPhp(forgot).subscribe(
        (res)=>{
          
        }
      )
   }
  }
}
