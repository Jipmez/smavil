import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
@Component({
  selector: 'app-v-confirm',
  templateUrl: './v-confirm.component.html',
  styleUrls: ['./v-confirm.component.scss']
})
export class VConfirmComponent implements OnInit {
  ref: string;
  med: any;
  cookieValue: string;

  constructor(private server : DataService,private cookieService: CookieService,private route: Router,protected localStorage: LocalStorage) {}
id;
duration;
price;
email = 'mezueJ@gmail.com';
  ngOnInit() {
    this.cookieValue = this.cookieService.get('logID');
    
    this.localStorage.getItem('v_i_p_p_a_y').subscribe(
      (res)=>{if(res){
        console.log(res);
        this.id = res['id'];
        this.duration =res['day'];
        this.price =res['amount'];
      }
      },
    );


   this.ref =  this.generateReference()
  }

  paymentCancel()
{
  console.log('me')
}

  generateReference(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 20; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

me(x){
  console.log(x);
}



process(){
  this.med.append('price',this.price);
  this.med.append('rommie_id',this.email);
  this.med.append('refrence',this.generateReference());
  this.med.append('token',this.cookieValue);
  this.med.append('duration',this.duration);
  this.med.append('plan',this.id);
  this.med.append('key','coin');
  
  this.server.Pay(this.med).subscribe(
    (res)=>{ 
    console.log(res)
      if(res.code == 1){
         
      }
  },
  )
}

}
