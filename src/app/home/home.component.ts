import { Component, OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ToastrService } from 'ngx-toastr';
declare let $;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  permit: any;
sale  = '1';
  constructor(protected localStorage: LocalStorage,public toastr: ToastrService,private server: DataService,private cookieService: CookieService,private nav:Router) { }
  list =[];
  states=[];
  locals=[];
  ngOnInit() { 
   
    /* this.server.getPermit().subscribe(
     (res)=>{if(res.code == 1){this.permit = res.message}
       if(this.permit != 1){
          console.log('inaccecible');
       }
    }
   )  */
 /*
    Carousel
*/
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
   
 
    
    let md ={
      key : 'me'
    }

    this.server.SendToPhp(md).subscribe(
      (res)=>{console.log(res)
        if(res.code == 1){
          this.list = res.message;
          console.log(this.list);
        }
      },
      ()=>{},
      ()=>{},
    )

  }

type(){
  this.toastr.success('Hello world!', 'Toastr fun!');
}


search(x:NgForm){
  console.log(x.value);
  let pay={
    sale : x.value.sale,
    search: x.value.search,
  }
  this.localStorage.setItem('F_r_o_n_t_s_e_a_r_c_h',pay).subscribe(
    (res)=>{
      if(res == true){
        $('#te').click();
        this.nav.navigate(['logdes']);
      }
    }
  )  
}
 
}
