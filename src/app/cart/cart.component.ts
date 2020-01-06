import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { RaveOptions } from 'angular-rave';
import { ActivatedRoute } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cookieValue: String;
  id: String;
  msg: any;
  msgg: any;
  email:any;
  name: String;
  txref: any;
  amount: Number;
  ref : any;
  am: any;
  permit: any;
  plan: any;
  med = new FormData();
  amountTopay: any;
  addressTopay: any;
  status: any;

  constructor(protected localStorage: LocalStorage,private route: ActivatedRoute,private server: DataService,private cookieService: CookieService,private nav:Router) { }
  ngOnInit() {

    this.server.getPermit().subscribe(
      (res)=>{if(res['code'] == 1){
        this.permit = res['message']
        console.log(this.permit);
        if(this.permit != 2 || this.permit != 3 || this.permit != 4){
          console.log('inaccecible');
       }
      }
        
     }
    ) 
    

    this.cookieValue = this.cookieService.get('logID')
    this.id = this.route.snapshot.paramMap.get('id');

    let ref = {
      ref : this.id,
      id : this.cookieValue,
      key: 'ref1'
    }

    this.server.SendToPhp(ref).subscribe(
      (res)=>{console.log(res)
        if(res.code == 1){
          this.am = res.msg[0]['amount'];
          this.plan =res.msg[0]['plan']
          this.status = res.msg[0]['status']
          this.amount = Number((res.msg[0]['amount'])*100);
          this.txref = res.msg[0]['payment_id'];
          this.email = res.msgg[0]['email'];
          console.log(this.amount);
          this.name = res.msgg[0]['name'];
          this.ref = this.generateReference();

          
        }
      },
      ()=>{},
      ()=>{},
    )
  }

   paymentOptions: RaveOptions = {
    PBFPubKey :'FLWPUBK-aaf6d580ebfd505443f76a42327b2e94-X',
    customer_email: 'mailexample@mail.com',
    customer_firstname: 'Ashinze',
    customer_lastname: 'Ekene',
    custom_description: 'Payment for goods',
    amount: 1,
    customer_phone: '09026464646',
    currency: 'NGN',
    txref: this.generateReference(),

  }

  me(res) {
    console.log(res);
    if(res.status == 'success'){
      alert('success');
     
      let paid = {
        id : this.cookieValue,
        txref : res.trxref,
        payment_id : this.id,
        key :  'payed'
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
  payCoin(){
    this.med.append('amount',this.am);
    this.med.append('user_id',this.email);
    this.med.append('txref',this.txref)
    this.med.append('key','Sub');
    
    this.server.Pay(this.med).subscribe(
      (res)=>{ 
      console.log(res)
        if(res['code'] == 1){
            this.amountTopay = res['amount_btc'];
            this.addressTopay = res['address'];
        }
    },
    )
  }



  

  paymentCancel(){
    alert('me');
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
