import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/Forms';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
declare let $ :any;
@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  cookieValue: any;
  list: [];

  constructor(private server: DataService,private cookieService: CookieService,) { }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('logID');
   
    let payLd = {
      val : this.cookieValue,
      key: 'gtR'
    }

    this.server.SendToPhp(payLd).subscribe(
      (res)=>{ 
        if(res.code ==1){
          this.list = res.message;
          console.log(this.list);
        }
      },
      ()=>{},
      ()=>{},
    )
  }
  u(x){
    console.log(x);
  }

  msg(x:NgForm,reciever){
    console.log(x.value,reciever);

  
  }

  filter(x:NgForm){
let value = x.value;


/* for (let index = 0; index < value.length; ++index) {

  if (value[index].value !== 'undefined') {
    console.log(value);
  }
value.forEach(name);
} */





     let pay ={
      cat: x.value.Cats,
      dogs : x.value.Dogs,
      Max_budget : x.value.Max_budget,
      Min_budget: x.value.Min_budget,
      age_max: x.value.age_max,
      age_min:x.value.age_min,
      gender:x.value.gender,
      mutual_connections: x.value.mutual_connections,
      no_pet : x.value.no_pets,
      pet_friendly: x.value.pet_friendly,
      purpose: x.value.purpose,
      id: this.cookieValue,
      key:'filter'

    }

    this.server.SendToPhp(pay).subscribe(
      (res)=>{ console.log(res)
        if(res.code ==1){
          this.list = res.message;
          console.log(this.list)
        }
      },
      ()=>{},
      ()=>{},
    ) 
  }
}
