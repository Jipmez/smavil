import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
declare let $;

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent implements OnInit {

  constructor(private server: DataService) { }
agent = [];
  ngOnInit() {
  }


  find(x:NgForm){
    console.log(x.value);
    let pay ={
      name : x.value.name,
      city: x.value.city,
      key : "agentfind"
    }
    this.server.SendToPhp(pay).subscribe(
      (res)=>{
        if(res.code == 1){
          this.agent = res.agent;
          $('#noresult').css("display","none");
        }
      }
    )
  }
}
