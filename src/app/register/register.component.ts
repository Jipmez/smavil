import { Component, OnInit,ViewContainerRef  } from '@angular/core';
import { FormsModule } from '@angular/Forms';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';


declare var $
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public toastr: ToastrService,private server : DataService,private cookieService: CookieService,private route: Router,protected localStorage: LocalStorage,vcr: ViewContainerRef) { }

  ngOnInit() {
    $(".loader").fadeOut(); 
    $("#preloder").delay(400).fadeOut("slow");
  }


  signUp(x:NgForm){
    var nameRe = /^[A-Z \'.-]{2,40}$/i;
    var emailRe =  /^.+@.+\..{2,4}$/;

    if(x.value.email.match(emailRe) && x.value.username.match(nameRe)){
      if(x.value.password === x.value.cpass){
          var password = x.value.password
      }else{
      return   this.toastr.error('Password not in Sync');
      }

    let comingUser = [x.value.name, x.value.username,x.value.email,password,x.value.usertype];
    let p = 0 ;
    let count = 0; 

    while (p<comingUser.length) {
      if(comingUser.length[p]<1){
      return  this.toastr.warning('All spaces are requiered');
      }else{
        count ++
      }
      p++
    }

    if(count == comingUser.length){
      let msg = {
        name :x.value.name,
        lastname: x.value.lastname,
        username:x.value.username,
        email:x.value.email,
        password:x.value.password,
        usertype:x.value.usertype,
        key:'register'
      }

      this.server.SendToPhp(msg).subscribe(
        (res)=>{
          if(res.code ==1){
            this.toastr.success('Account Created');
            this.route.navigate(['login']);
          }else if(res.code == 2){
            this.toastr.warning('Error');
          }
        },
        ()=>{},
        ()=>{}
      )
    }

  }else{
    return  this.toastr.warning('Name error');
  }

}
}
