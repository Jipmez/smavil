import { Component, OnInit,ViewContainerRef  } from '@angular/core';
import { FormsModule } from '@angular/Forms';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
declare let $;
@Component({
  selector: 'app-roomate-blog',
  templateUrl: './roomate-blog.component.html',
  styleUrls: ['./roomate-blog.component.scss']
})
export class RoomateBlogComponent implements OnInit {
  blog: [];
  old: any;

  constructor(private server : DataService,private cookieService: CookieService,private route: Router,protected localStorage: LocalStorage,vcr: ViewContainerRef) { }

  ngOnInit() {
    $(".loader").fadeOut(); 
    $("#preloder").delay(400).fadeOut("slow");

    let pay = {
      key : 'roomblog',
    }

    this.server.SendToPhp(pay).subscribe(
      (res)=>{console.log(res)
        if(res.code == 1){
          this.blog = res.blogs;
          this.old= res.olderposts;
        }
      },
      ()=>{},
      ()=>{},
    )
  }

}
