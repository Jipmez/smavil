import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

declare var $;

@Component({
  selector: 'app-singlelist',
  templateUrl: './singlelist.component.html',
  styleUrls: ['./singlelist.component.scss']
})
export class SinglelistComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;
  id;
  agent: any;
  countryA: any;
  stateA: any;
  localA: any;
  pix=[];
  amen = [];
  constructor(private route: ActivatedRoute,private server: DataService,private cookieService: CookieService,private nav:Router) { }
list = []
cookieValue;
review = [];
rewT;
  ngOnInit() {
    $(".loader").delay(5000).fadeOut("slow"); 
    $("#preloder").delay(5000).fadeOut("slow");

this.cookieValue = this.cookieService.get('logID');
this.id = this.route.snapshot.paramMap.get('id');
const location = window.location.href;
console.log(location);

    let payload = {
      prop : this.id,
      key: '0o7'
    }

    let getP  = {
      propID : this.id,
      key : 'getRev'
    }

    let para = {
      propID : this.id,
      key : 'getUp'
    }

    let propix= {
      propID : this.id,
      key : 'getProP'
    }

      
    this.server.SendToPhp(para).subscribe(
      (res)=>{
        if(res.code == 1){
          this.agent =res.message[0];
        
        }
      },
      ()=>{},
      ()=>{},
    )

    this.server.SendToPhp(payload).subscribe(
      (res)=>{console.log(res)
        if(res.code == 1){
          this.list = res.message;
          console.log(this.list);
          this.countryA = res.countryA;
          this.stateA = res.stateA;
          this.localA = res.localA;
          this.amen = res.amens;
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

    this.server.SendToPhp(getP).subscribe(
      (res)=>{
        if(res.code == 1){
          this.review = res.message; 
        }
      },
      ()=>{},
      ()=>{},
    )

    this.server.SendToPhp(propix).subscribe(
      (res)=>{console.group(res)
       if(res.code == 1){
         this.pix = res.pix
       }
      }
    )
    
  }

 Rev(x:NgForm){
   if(this.server.LoggedIn() == true){
    console.log(x.value.review,x.value.displayName,x.value.reasons);
    var nameRe = /^[A-Z \'.-]{2,40}$/i;
    var emailRe =  /^.+@.+\..{2,4}$/;

     if(x.value.displayName.match(nameRe)){
        if(x.value.review.length > 15){

          let md = {
            review : x.value.review,
            name : x.value.displayName,
            reasons :x.value.reasons,
            id : this.cookieValue,
            propID : this.id,
            key : 'rev'
          }

          this.server.SendToPhp(md).subscribe(
            (res)=>{console.log(res)},
            ()=>{},
            ()=>{},
          )
        }
     }

   }else{
     alert('ifh');
   }
 }

 select(x){
  this.nav.navigate(['Agent',x])
 }

}
