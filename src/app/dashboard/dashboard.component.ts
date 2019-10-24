import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, NavigationEnd } from '@angular/router';
declare var $;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  permit: any;
 currentUrl: string;
  constructor(private server: DataService,private nav:Router) { 
    nav.events.subscribe((_: NavigationEnd)=> this.currentUrl = _.url)
  }
pix ;
  ngOnInit() {
    this.server.getPermit().subscribe((res)=>{if(res.code == 1){ this.permit = res.message; if(res.message == 1){this.nav.navigate([''])}}}) 
    this.server.CheckLogin();
    $(".loader").fadeOut(); 
    $("#preloder").delay(400).fadeOut("slow");
    this.server.getUpro(1).subscribe(
      (res)=>{console.log(res)
       if(res.code ==1){
         if(res.message[0]['ProPix'] == ''){
          this.server.currentMessage.subscribe(message => this.pix = message);
         }else{
          this.server.currentMessage.subscribe(message => this.pix = res.message[0]['pix']);
         }
       }
      },
    )

  }


  toggle(){
    $(".sidenav").toggleClass("active");
  }

  toggleme(){

    $(".sidenav").toggleClass("toggle");
    $(".our-nav").toggleClass("expandnav");
    $(".sidenav").toggleClass("active");
    $(".main-content").toggleClass("togglemain")
  }
}
