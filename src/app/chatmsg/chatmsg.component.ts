import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatmsg',
  templateUrl: './chatmsg.component.html',
  styleUrls: ['./chatmsg.component.scss']
})
export class ChatmsgComponent implements OnInit {
  cookieValue: string;
  id: string;
  msg: any;
  user: any;
  reciver: any;

  constructor(private route: ActivatedRoute,private server: DataService,private cookieService: CookieService,private nav:Router) { }
  ngOnInit() {
    this.server.getID().subscribe(
      (res)=>{console.log(res)
       if(res.code == 1){
          this.user = res.message
       }
      },
      ()=>{},
      ()=>{},
    )
    this.cookieValue = this.cookieService.get('logID')
    this.id = this.route.snapshot.paramMap.get('id');

    let gtIDmsg = {
      id  : this.cookieValue,
      chat_id : this.id,
      key : 'gtIDmsg'
    }
    this.server.SendToPhp(gtIDmsg).subscribe(
      (res)=>{console.log(res)
        if(res.code ==1){
          this.msg = res.msg;
          this.reciver = res.reciever;
        }
      },
    )

   
  }

  
  reply(x:NgForm){
    let msg= {
      message: x.value.message,
      send_to : this.reciver,
      id : this.cookieValue,
      key : 'intMsg'
    }
  this.server.SendToPhp(msg).subscribe(
    (res)=>{console.log(res)
      if(res.code == 1 || res.code == 2){
        this.nav.navigateByUrl('/',{skipLocationChange: true}).then(()=>
        this.nav.navigate(['dash/messages/mssg',this.id]));
      }
    }
  )
  }
}
