import { Component, OnInit } from '@angular/core';
import { RaveOptions } from 'angular-rave';
import { NgForm } from '@angular/forms';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';

import { DataService } from '../data.service';
declare var $;

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {

  constructor(protected localStorage: LocalStorage,private nav:Router,private server: DataService) { }
 movein =[];
  ngOnInit() {
  }

  paymentOptions: RaveOptions = {
    PBFPubKey :'FLWPUBK-e26b1697f278b06b74792ec05dfa9b33-X',
    customer_email: 'mailexample@mail.com',
    customer_firstname: 'Ashinze',
    customer_lastname: 'Ekene',
    custom_description: 'Payment for goods',
    amount: 1000,
    customer_phone: '09026464646',
    currency: 'NGN',
    txref: this.generateReference(),

  }
  


  me(response) {
    console.log(response.tx.chargeResponseCode);
    if(response.tx.chargeResponseCode == '00'){
      alert('success');
    this.localStorage.setItem('res',response).subscribe(
      (res)=>{
        if(res == true){
          $('#te').click();
          this.nav.navigate(['/dashboard/confirm']);
        }
      }
    )  
    }


  }
  
  cancelledPayment(): void {
      console.log('close');
  }
  
  generateReference(): string {
      let text = '';
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 20; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
  
      return text;
  }
  
  

  pay(x:NgForm){
    console.log(x.value)
    const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let amount = parseInt(x.value.amount);
    let listing = parseInt(x.value.listing);
    let boost  =parseInt(x.value.boosts);
    let featured = parseInt(x.value.featured);
    let duration:number =parseInt(x.value.duration);
    let method = parseInt(x.value.method);
    let plan = parseInt(x.value.plan);
     
     amount = amount * duration;
     boost = boost * duration ;
     featured = featured * duration;
     listing = listing * duration;
    let now =new Date();
    let now_formartted = now.getDate() + "-" + months[now.getMonth()] + "-" + now.getFullYear();

    let jan312009 = new Date();
     let one = new Date(new Date(jan312009).setMonth(jan312009.getMonth() + duration));
     let formatted_date = one.getDate() + "-" + months[one.getMonth()] + "-" + one.getFullYear();
    
    let joined  = now_formartted + "  " +"to"+ "  " + formatted_date;

      let cart = {
       amount : amount,
       listing : listing,
       boost : boost,
       featured : featured,
       duration : joined,
       months : duration,
       method : method,
       plan : plan,
       ref : this.generateReference()
      }
     
      this.localStorage.setItem('s_t_v_con_firm',cart).subscribe(
        (res)=>{
          if(res == true){
            $('#te').click();
            this.nav.navigate(['/dashboard/confirm']);
          }
        }
      )  
    

  /*  this.server.SendToPhp(cart).subscribe(
     (res)=>{console.log(res)},
     ()=>{},
     ()=>{},
   ) */

    
  }
  

}
