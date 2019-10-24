import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/Forms';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  cookieValue: any;
  list: [];
 
  constructor(private server: DataService,private cookieService: CookieService,private titleService: Title) { }

  ngOnInit() {
    this.server.updateTitle("Your Matches | Smartvil.com");
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

}
