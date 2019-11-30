import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-admin-prop',
  templateUrl: './admin-prop.component.html',
  styleUrls: ['./admin-prop.component.scss']
})
export class AdminPropComponent implements OnInit {
  list: Object;

  constructor(private route: ActivatedRoute,private server: DataService,private cookieService: CookieService,private nav:Router,protected localStorage: LocalStorage /* private localstorage : LocalStorageService */) { }
  ngOnInit() {
   

    let pay = {
      key : 'getallprop',
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

}
