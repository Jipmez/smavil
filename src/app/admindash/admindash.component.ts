import { Component, OnInit } from '@angular/core';
declare  let $;
@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.scss']
})
export class AdmindashComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(".loader").fadeOut(); 
    $("#preloder").delay(400).fadeOut("slow");
  }

}
