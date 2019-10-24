import { Component, OnInit,ViewContainerRef  } from '@angular/core';
import { FormsModule } from '@angular/Forms';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
declare let $;
@Component({
  selector: 'app-property-blog',
  templateUrl: './property-blog.component.html',
  styleUrls: ['./property-blog.component.scss']
})
export class PropertyBlogComponent implements OnInit {
  blog: [];
  old: any;

  constructor(private server : DataService,private cookieService: CookieService,private route: Router,protected localStorage: LocalStorage,vcr: ViewContainerRef) { }

  ngOnInit() {
    $(".loader").fadeOut(); 
    $("#preloder").delay(400).fadeOut("slow");

    let pay = {
      key : 'propblog',
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
