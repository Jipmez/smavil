import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import { LocalStorage } from '@ngx-pwa/local-storage';

declare let $;


@Component({
  selector: 'app-blogs-view',
  templateUrl: './blogs-view.component.html',
  styleUrls: ['./blogs-view.component.scss']
})
export class BlogsViewComponent implements OnInit {
  cookieValue: string;
  permit: any;
  blog = [];

  constructor(private route: ActivatedRoute,private server: DataService,private cookieService: CookieService,private nav:Router,protected localStorage: LocalStorage /* private localstorage : LocalStorageService */) { }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('adminID');
    this.server.getPermitA().subscribe(
      (res)=>{this.permit = res.message
        console.log(this.permit);
         if(this.permit != (1 || 4)){
           this.nav.navigate(["admin"]);
         }
      }
    )

    let getblog = {
        id :  this.cookieValue,
        key :  'allblog'
    }
    this.server.SendToPhp(getblog).subscribe(
      (res)=>{
       if(res.code == 1){
         this.blog = res.message
       }
      }
    )
  }


  AddBlog(x:NgForm){
    console.log(x.value);

    let payload ={ 
      title : x.value.title,
      category : x.value.category,
      id : this.cookieValue,
      key : 'blogadd',
    }

    this.server.SendToPhp(payload).subscribe(
      (res)=>{console.log(res)
        if(res.code == 1){
          $('#te').click();
          this.nav.navigate(['admin/add_blog',res.message]);
        }
      },
      ()=>{},
      ()=>{},
    )
  }
}
