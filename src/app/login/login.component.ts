import { Component, OnInit,ViewContainerRef  } from '@angular/core';
import { FormsModule } from '@angular/Forms';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { LocalStorage } from '@ngx-pwa/local-storage';
declare var $;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public ngProgress: NgProgress,private server : DataService,private cookieService: CookieService,private route: Router,protected localStorage: LocalStorage, vcr: ViewContainerRef) { }

  ngOnInit() {
    $(".loader").fadeOut(); 
    $("#preloder").delay(400).fadeOut("slow");
  }

  Login(x:NgForm){
    console.log( x.value.username,x.value.password);

    var nameRe = /^[A-Z \'.-]{2,40}$/i;

    if(x.value.username.match(nameRe)){
    

    let comingUser = [x.value.username,x.value.password];
    let p = 0 ;
    let count = 0; 

    while (p<comingUser.length) {
      if(comingUser.length[p]<1){
        alert('pls fill the form properly');
      }else{
        count ++
      }
      p++
    }

    if(count == comingUser.length){
      let msg = {
       
        username:x.value.username,
       
        password:x.value.password,
       
        key:'login'
      }

      this.ngProgress.start();
      this.server.SendToPhp(msg).subscribe(
        (res)=>{console.log(res)
          if(res.code == 1){
            let bag=res.message;
            this.cookieService.set('logID',bag);
            this.route.navigate(['dashboard']);
            this.ngProgress.done();
          }else{
            if(res.code == 2){
              let bag=res.message;
              this.cookieService.set('logID',bag);
              this.route.navigate(['dash']);
              this.ngProgress.done();
            }
          }
        },
        ()=>{},
        ()=>{}
      )
    }

  }

}
  }


