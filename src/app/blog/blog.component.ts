import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare let $;
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  id: string;
  blog=[];

  constructor(private route: ActivatedRoute,private server: DataService,private cookieService: CookieService,private nav:Router) { }
  ngOnInit() {
    $(".loader").fadeOut(); 
    $("#preloder").delay(400).fadeOut("slow");

    this.id = this.route.snapshot.paramMap.get('id');

    let getblog = {
      id  : this.id,
      key : 'getblog'
    }
    this.server.SendToPhp(getblog).subscribe(
      (res)=>{
        if(res.code == 1){
          this.blog = res.message;
        }
      }
    )


  }

}
