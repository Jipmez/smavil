import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
declare let $;
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  hash: string;
  email: string;
  confirm: any;

  constructor(private route: ActivatedRoute,private server: DataService,private cookieService: CookieService,private nav:Router) { }
  ngOnInit() {
    $(".loader").fadeOut(); 
    $("#preloder").delay(400).fadeOut("slow");
    this.email = this.route.snapshot.paramMap.get('id')
    this.hash = this.route.snapshot.paramMap.get('ed');
    if(this.hash.length === 64){
      let me ={
        email :  this.email,
        hash : this.hash,
        key : 'verify'
      }
      this.server.SendToPhp(me).subscribe(
        (res)=>{
        this.confirm =res.code;
        }
      )

    }
  
  }

}
