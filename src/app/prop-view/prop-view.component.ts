import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

declare let $;
@Component({
  selector: 'app-prop-view',
  templateUrl: './prop-view.component.html',
  styleUrls: ['./prop-view.component.scss']
})
export class PropViewComponent implements OnInit {
  id: string;
  list= [];
  countryA: any;
  stateA: any;
  localA: any;

  constructor(private route: ActivatedRoute,private server: DataService,private cookieService: CookieService,private nav:Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
$('#carousel-example').on('slide.bs.carousel', function (e) {
  /*
      CC 2.0 License Iatek LLC 2018 - Attribution required
  */
  var $e = $(e.relatedTarget);
  var idx = $e.index();
  var itemsPerSlide = 5;
  var totalItems = $('.carousel-item').length;

  if (idx >= totalItems-(itemsPerSlide-1)) {
      var it = itemsPerSlide - (totalItems - idx);
      for (var i=0; i<it; i++) {
          // append slides to end
          if (e.direction=="left") {
              $('.carousel-item').eq(i).appendTo('.carousel-inner');
          }
          else {
              $('.carousel-item').eq(0).appendTo('.carousel-inner');
          }
      }
  }
});

let payload = {
  prop : this.id,
  key: '0o7'
}

this.server.SendToPhp(payload).subscribe(
  (res)=>{console.log(res)
    if(res.code == 1){
      this.list = res.message[0];
      console.log(this.list);
      this.countryA = res.countryA;
      this.stateA = res.stateA;
      this.localA = res.localA;
      this.server.mapdetails(res.message[0]['locality']).subscribe(
        (res)=>{console.log(res)
          console.log(parseFloat(res[0].lat))
          console.log(parseFloat(res[0].lon))
        })
      
    }
  },
  ()=>{},
  ()=>{},
)
  }

  access(x){
    let access = {
      perm : x,
      prop : this.id,
      
      key : 'propaccess',
    }
    console.log(access);
    this.server.SendToPhp(access).subscribe(
      res => console.log(res)
    )
  }

}
