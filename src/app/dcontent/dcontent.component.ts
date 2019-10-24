import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
declare let $;
@Component({
  selector: 'app-dcontent',
  templateUrl: './dcontent.component.html',
  styleUrls: ['./dcontent.component.scss']
})
export class DcontentComponent implements OnInit {
  cookieValue: string;
  permit: number;
  profile: any;
  
  constructor(private server: DataService,private cookieService: CookieService,private nav:Router) { }

  ngOnInit() {
    this.server.getPermit().subscribe(
      (res)=>{if(res.code == 1){this.permit = res.message}}) 
      
    this.cookieValue = this.cookieService.get('logID');

    this.server.getUpro(1).subscribe(
      (res)=>{ console.log(res);
        this.profile = res.message[0]
        console.log(this.profile);
      }
    )
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
    }},
    ()=>{},
    ()=>{}
      )
  }
}
