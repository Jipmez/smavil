import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
declare let $;

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  cookieValue: string;
  list=[];
  no: any;
email = "mezj972@gmail.com";
amount = 100 *100;

  constructor(private server: DataService,private cookieService: CookieService,private nav:Router) { }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('logID');

    let pay = {
      key : 'kent',
      token : this.cookieValue
    }

    this.server.SendToPhp(pay).subscribe(
      (res)=>{console.log(res)
       if(res.code == 1){
         this.list = res.message;     
       }
      },
      ()=>{},
      ()=>{},
    )
  }

  paymentCancel(){
    console.log('me');
  }
  select(lists){
    console.log('me');
    this.nav.navigate(['dashboard/add',lists.propertyID])
  }

  prop(x:NgForm){
    console.log(x);
  
    let pay ={
      Address : x.value.address,
      category : x.value.category,
      type : x.value.type,
      id : this.cookieValue,
      key : 'pay'
    }
  
    this.server.SendToPhp(pay).subscribe(
      (res)=>{console.log(res)
      if(res.code ==1 ){
        $('#te').click();
        this.nav.navigate(['dashboard/add',res.propid])
      }},
      ()=>{},
      ()=>{}
        )
    }

    me(res) {
      console.log(res);
      if(res.status == 'success'){
        alert('success');
       
        let paid = {
          id : this.cookieValue,
          status : res.status,
          payment_id : this.generateReference(),
          key :  'payboosts'
        }
         this.server.SendToPhp(paid).subscribe(
          (res)=>{if(res.code == '1'){
            this.nav.navigate(['dashboard']);
          }},
          ()=>{},
          ()=>{}
        ) 
      }
  
  
    }

    generateReference(): string {
      let text = '';
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 20; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
  
      return text;
  }
}
