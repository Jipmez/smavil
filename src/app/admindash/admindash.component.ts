import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
declare  let $;
@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.scss']
})
export class AdmindashComponent implements OnInit {
  permit: any;

  constructor(private server: DataService,private cookieService: CookieService,private nav:Router) { }

  ngOnInit() {
    $(".loader").fadeOut(); 
    $("#preloder").delay(400).fadeOut("slow");
    
    this.server.getPermitA().subscribe(
      (res)=>{this.permit = res['message']}
    )
  }
  logout(){
    this.cookieService.delete('adminID');
    this.nav.navigate(['']);
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
