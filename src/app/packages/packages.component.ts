import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {
  Sub: any;
 phone = 2348068227984
  constructor(protected localStorage: LocalStorage,private route: ActivatedRoute,private server: DataService,private cookieService: CookieService,private nav:Router) { }
  cookieValue;
  ngOnInit() {
    this.cookieValue = this.cookieService.get('logID')
    let sub = {
      id : this.cookieValue,
      key :'getsub',
    }
    this.server.SendToPhp(sub).subscribe(
      (res)=>{
        if(res.code == 1){
          this.Sub =res.Subs;
        }
      },
      ()=>{},
      ()=>{},
    )
  }

}
