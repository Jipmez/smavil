import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import { LocalStorage } from '@ngx-pwa/local-storage';
declare var $;

@Component({
  selector: 'app-admin-signin',
  templateUrl: './admin-signin.component.html',
  styleUrls: ['./admin-signin.component.scss']
})
export class AdminSigninComponent implements OnInit {

  constructor(private route: ActivatedRoute,private server: DataService,private cookieService: CookieService,private nav:Router,protected localStorage: LocalStorage /* private localstorage : LocalStorageService */) { }

  ngOnInit() {

  }

  adsign(x:NgForm){
   console.log(x.value);
   let md = {
      name : x.value.username,
      pass : x.value.password,
      key: 'adSign'
   }

   this.server.SendToPhp(md).subscribe(
     (res)=>{console.log(res)
      if(res.code == 1){
        let bag=res.message;
        this.cookieService.set('adminID',bag);
        this.nav.navigate(['admin']);
        
      }
    },
     ()=>{},
     ()=>{},
   )
  }

}
