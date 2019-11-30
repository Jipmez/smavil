import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { FormsModule } from '@angular/Forms';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ActivatedRoute } from '@angular/router';
declare let $;

@Component({
  selector: 'app-agentprofile',
  templateUrl: './agentprofile.component.html',
  styleUrls: ['./agentprofile.component.scss']
})
export class AgentprofileComponent implements OnInit {
  id: string;
  info: any;
  min: number;
  max: number;
  average: number;
  p : number = 1;
  pix: any;
  response: any;
  knowledge: any;
  negotiate: any;
  expertise: any;
  rev: any;
  rating: Number;
  list: [];

  constructor(private route: ActivatedRoute,private server: DataService) { }
phone = 245899895;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    

    let calc ={
    agent :  this.id,
    key:'reviewCalc',
    }

    let pay= {
      agent : this.id,
      key : 'agent'
    }


    this.server.SendToPhp(calc).subscribe(
      (res)=>{console.log(res)
        if(res.code == 1){
          this.rating = res;
         

          console.log(this.rating);
        }
      },
      ()=>{},
      ()=>{},
    )
this.server.SendToPhp(pay).subscribe(
  (res)=>{console.log(res)
  if(res.code ==1){
    this.info=res.info;
    this.rev =res.reviews;
    this.pix =res.info[0]['pix']
    this.min = res.min;
    this.max = res.max;
    this.list = res.properties;
    this.average = res.average;
  }
  },
  ()=>{},
  ()=>{}
)

  }

  Response($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
  /*   alert(`Old Value:${$event.oldValue},  */
      this.response = $event.newValue 
     /*  Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`); */
  }
  
  Knowledge($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    /*   alert(`Old Value:${$event.oldValue},  */
        this.knowledge = $event.newValue 
       /*  Checked Color: ${$event.starRating.checkedcolor}, 
        Unchecked Color: ${$event.starRating.uncheckedcolor}`); */
    }

    
  Negotiate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    /*   alert(`Old Value:${$event.oldValue},  */
        this.negotiate = $event.newValue 
       /*  Checked Color: ${$event.starRating.checkedcolor}, 
        Unchecked Color: ${$event.starRating.uncheckedcolor}`); */
    }
    
  Expertise($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    /*   alert(`Old Value:${$event.oldValue},  */
        this.expertise = $event.newValue 
       /*  Checked Color: ${$event.starRating.checkedcolor}, 
        Unchecked Color: ${$event.starRating.uncheckedcolor}`); */
    }


  Rev(x:NgForm){
    console.log(x.value);

    let value ={
      name : x.value.author_name,
      relationship : x.value.author_relationship,
      address : x.value.address,
      content : x.value.content,
      response : this.response,
      knowledge : this.knowledge,
      negotiate : this.negotiate,
      expertise : this.expertise,
      agent_id : this.id,
      key : 'agentRev'

    }
    this.server.SendToPhp(value).subscribe(
      (res)=>{console.log(res)
        if(res.code == 1){
          $('#te').click();
        }else if(res.code == 2){

        }
      },
      ()=>{},
      ()=>{},
    )
  }


  detect(){
    $('#how_do_u_know').each(function() {
      if ($(this).is(':selected'))
         alert('this option is selected');
       else
        $('.initial_hide').css("display","block");
  });
  }

  

}
