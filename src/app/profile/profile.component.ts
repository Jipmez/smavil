import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/Forms';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  cookieValue: string;
  profile=[];
  clean: any;
  work: number;
  bed: number;
  smoke: number;
  drinks: number;
  drugs: number;
  private: number;
  social: number;
  cook: number;
  amen= [];
  pro = [];

  constructor(private server: DataService,private cookieService: CookieService,) { }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('logID');

    let pay = {
      id : this.cookieValue,
      key:'grtrP'
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

}
