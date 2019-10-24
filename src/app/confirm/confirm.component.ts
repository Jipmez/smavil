import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';

declare var $;
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  package: any;
  listing: any;
  boosts: any;
  featured: any;
  duration: any;
  months: any;
  txref: any;
  cookieValue: string;
  ref: any;
  method: any;
  plan: any;

  constructor(private server : DataService,private cookieService: CookieService,private route: Router,protected localStorage: LocalStorage,vcr: ViewContainerRef) {}

  ngOnInit() {
    this.cookieValue = this.cookieService.get('logID');

    this.localStorage.getItem('s_t_v_con_firm').subscribe(
      (res)=>{if(res){
        console.log(res);
      this.package = res['amount'];
      this.listing =res['listing'];
      this.boosts =res['boost'];
      this.featured =res['featured'];
      this.duration = res['duration'];
      this.months = res['months'];
      this.method = res['method'];
      this.plan = res['plan'];
      this.txref = res['ref'];
      }
      },
    );
  }

  process(){
     let pay = {
       amount : this.package,
       listing : this.listing,
       boosts: this.boosts,
       featured: this.featured,
       duration : this.duration,
       months: this.months,
       method : this.method,
       plan : this.plan,
       ref : this.txref,
       id : this.cookieValue,
       key : 'payUp'
     }

     this.server.SendToPhp(pay).subscribe(
       (res)=>{console.log(res)
        if(res.code == 1){
          this.ref = res.message;
          this.route.navigate(['dashboard/cart',this.ref]);
        }
      },
       ()=>{},
       ()=>{}
     )
  }

}
