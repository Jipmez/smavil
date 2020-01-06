import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
declare let $;
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
men =45;
  cookieValue: any;
  unread: [];
  id: any;
  user: any;
constructor(private server: DataService,private cookieService: CookieService,private nav:Router) { }

  ngOnInit() {
    this.cookieValue  = this.cookieService.get('logID');
    this.server.getID().subscribe(
      (res)=>{
        if(res['code'] == 1){console.log(res)
          this.id = res['message'];
         
        }
      },
     
    )
    let getM = {
      id :  this.cookieValue,
      key : 'unread'
    }

    this.server.SendToPhp(getM).subscribe(
      (res)=>{
         if(res.code == 1){console.log(res)
           this.unread = res.unread;
           console.log(this.unread);
         }
      },
      ()=>{},
      ()=>{},
    )
  }
move(x){
  this.nav.navigateByUrl('/',{skipLocationChange: true}).then(()=>
  this.nav.navigate(['dash/messages/mssg',x]));
}
}
