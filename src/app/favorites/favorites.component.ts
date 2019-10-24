import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  list: any;

  constructor(private route: ActivatedRoute,private server: DataService,private cookieService: CookieService,private nav:Router) { }
cookieValue : string;
  ngOnInit() {
    this.cookieValue = this.cookieService.get("logID")
    let pay = {
      id: this.cookieValue,
      key : 'getFav'
    }
    this.server.SendToPhp(pay).subscribe(
      (res)=>{console.log(res)
        if(res.code == 1){
          this.list =res.favorite
        }
      },
    )
  }

}
