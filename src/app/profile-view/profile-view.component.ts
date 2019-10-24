import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/Forms';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  cookieValue: string;
  id: string;
  profile: any;
  clean: number;
  bed: number;
  smoke: number;
  work: number;
  drinks: number;
  drugs: number;
  private: number;
  social: number;
  cook: number;
  active: any;
  pro=[];
  amen=[];

  constructor(private route: ActivatedRoute,private server: DataService,private cookieService: CookieService,) { }
  ngOnInit() {
    this.cookieValue = this.cookieService.get('logID');

    this.id = this.route.snapshot.paramMap.get('id');
const location = window.location.href;
console.log(location);
let glass = {
  id : this.cookieValue,
  key:'grtrP'
}

this.server.SendToPhp(glass).subscribe(
  (res)=>{console.log(res)
   if(res.code ==1){
    this.active= res.message[0]['Active'];
   }
  },
  ()=>{},
  ()=>{},
)




    let pay = {
      id : this.id,
      key:'geP'
    }
  
    this.server.SendToPhp(pay).subscribe(
      (res)=>{console.log(res)
       if(res.code ==1){
        this.profile= res.message;
            this.clean =(res.message[0]['Cleanliness']/100)* 100;
            this.work=(res.message[0]['Working_hours']/100)* 100;
            this.bed =(res.message[0]['Bed_time']/100)* 100;
            this.smoke =(res.message[0]['Smokes']/100)* 100;
            this.drinks =(res.message[0]['Drinks']/100)* 100;
            this.drugs =(res.message[0]['Drugs']/100)* 100;
            this.private = (res.message[0]['Privacy']/100)* 100;
            this.social =(res.message[0]['Social']/100)* 100;
            this.cook = (res.message[0]['Cooking']/100)* 100;
        this.pro = res.pro;
        this.amen = res.amen;       
         
       }
      },
      ()=>{},
      ()=>{},
    )

}

pay(days,name,price){
  console.log(days,name,price)
}
msg(x:NgForm,reciever){
  console.log(x.value,reciever);

  let msg= {
    message: x.value.message,
    send_to : reciever,
    id : this.cookieValue,
    key : 'intMsg'
  }
this.server.SendToPhp(msg).subscribe(
  (res)=>console.log(res)
)
}

}
