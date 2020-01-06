import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-localstorage';
import { LocalStorage } from '@ngx-pwa/local-storage';
declare let $;
@Component({
  selector: 'app-adcontent',
  templateUrl: './adcontent.component.html',
  styleUrls: ['./adcontent.component.scss']
})
export class AdcontentComponent implements OnInit {
  permit: any;
  admin=[];

  constructor(public toastr: ToastrService,private route: ActivatedRoute,private server: DataService,private cookieService: CookieService,private nav:Router,protected localStorage: LocalStorage /* private localstorage : LocalStorageService */) { }

  ngOnInit() {
    this.server.getPermitA().subscribe(
      (res)=>{this.permit = res['message']}
    )

    this.server.getUpro(3).subscribe(
      (res)=>{
        this.admin = res['message'][0];
      }
    )
  }
  
  
  logout(){
    this.cookieService.delete('adminID');
  }

  Add_admin(x:NgForm){
    var nameRe = /^[A-Z \'.-]{2,40}$/i;
    var emailRe =  /^.+@.+\..{2,4}$/;

    
    if(x.value.email.match(emailRe) && x.value.username.match(nameRe)){
      if(x.value.password === x.value.cpass){
          var password = x.value.password
      }else{
      return   this.toastr.error('Password not in Sync');
      }

    let comingUser = [x.value.name, x.value.username,x.value.email,password,x.value.group];
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
        username:x.value.username,
        email:x.value.email,
        password:x.value.password,
        usertype:x.value.group,
        key:'ad_register'
      }
console.log(msg);
      this.server.SendToPhp(msg).subscribe(
        (res)=>{
          if(res.code ==1){
            this.toastr.success('Account Created');
           $('.te').click()

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

  update(x:NgForm){
    console.log(x.value);
    let upp ={
      id : this.cookieService.get('adminID'),
      cpass : x.value.cpass,
      newpass : x.value.newpass,
      key : 'updateadmin'
    }
    this.server.SendToPhp(upp).subscribe(
      (res)=>{
        if(res.code == 1){
          this.toastr.success('Updated Successfully','profile update')
        }else{
          this.toastr.error('Failed','profile update')
        }
      },
    )
    
  }


 
}
