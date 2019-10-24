import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
declare let $;
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  question: string;
  property: string;
  answers = [];
  improve = [
    {
      id: 1,
      value: 'Association'
    },
    {
      id: 2,
      value: 'well water'
    },
    {
      id: 3,
      value: 'Solar Panel'
    },
  ];
  checkedList =[];
  renovate=[];
  Floor=[];
  feature=[];
  Applies=[];
  document=[];
  selling=[];
  home=[];

  constructor(private route: ActivatedRoute,private server: DataService,private cookieService: CookieService,private nav:Router) { }
currentTab = 0;

  ngOnInit() {
    this.question = this.route.snapshot.paramMap.get('id')
    this.property = this.route.snapshot.paramMap.get('ed');
     
   this.showTab(this.currentTab);
  }

  redirectTo(uri){
    this.nav.navigateByUrl('/',{skipLocationChange: true}).then(()=>
    this.nav.navigate([uri]));
  }

 open(x){
  this.nav.navigateByUrl('/',{skipLocationChange: true}).then(()=>
  this.nav.navigate(['offers','questions',x]));
 }

 showTab(n){
 console.log(n)
 let x = $('.tab');
 console.log(n)
x[n].style.display ="block";
if (n == 0) {
 $("#prevBtn").css("display","none");
} else {
  $("#prevBtn").css("display","inline");
}
if (n == (x.length )) {
  document.getElementById("nextBtn").style.display = "block";
} else {
  document.getElementById("nextBtn").innerHTML = "Next";
}

if(n == x.length){
 
}

  this.fixStepIndicator(n)

 }


 fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}
 nextPrev(n) {
   console.log(n);
  // This function will figure out which tab to display
  var x = $('.tab');
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !this.validateForm()) return false;
  // Hide the current tab:
  x[this.currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  this.currentTab = this.currentTab + n;
  // if you have reached the end of the form... :
  if (this.currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("prevBtn").style.display = "inline";
    document.getElementById("subForm").style.display="inline";
    return false;
  }
  // Otherwise, display the correct tab:
  this.showTab(this.currentTab);
}

 validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, j, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[this.currentTab].getElementsByTagName("input");
  j = x[this.currentTab].getElementsByTagName("select");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += "+ '' + invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
for(i = 0; i < j.length;i++){
  if(j[i].selectedIndex <= 0){
    j[i].className += " + '' + invalid";
    valid = false;
  }
}
  
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[this.currentTab].className += " finish";
  }
  return valid; // return the valid status
   }
   

   onChangeCategory(event: boolean, cat: string){ // Use appropriate model type instead of any
    if(event) {
    this.checkedList.push(cat);
    }else {
      let index = this.checkedList.indexOf(cat);
      this.checkedList.splice(index,1);
    
  }
  console.log(this.checkedList);
   }

   Renovations(event: boolean, renovate: string){
     console.log('me');
    if(event) {
      this.renovate.push(renovate);
      }else {
        let index = this.renovate.indexOf(renovate);
        this.renovate.splice(index,1);
      
    }
   }
   Flooring(event: boolean, Flooring: string){
    if(event) {
      this.Floor.push(Flooring);
      }else {
        let index = this.Floor.indexOf(Flooring);
        this.Floor.splice(index,1);
      
    }
   }

   Special(event: boolean, special: string){
    if(event) {
      this.feature.push(special);
      }else {
        let index = this.feature.indexOf(special);
        this.feature.splice(index,1);
      
    }
   }

   AppliesToYou(event : boolean, you :string){
    if(event) {
      this.Applies.push(you);
      }else {
        let index = this.Applies.indexOf(you);
        this.Applies.splice(index,1);
      
    }
   }

   Documents(event : boolean, document :string){
    if(event) {
      this.document.push(document);
      }else {
        let index = this.document.indexOf(document);
        this.document.splice(index,1);
      
    }
   }

   Sell(event : boolean, sell :string){
    if(event) {
      this.selling.push(sell);
      }else {
        let index = this.selling.indexOf(sell);
        this.selling.splice(index,1);
      
    }
   }

   BuyAhome(event :boolean, home :string){
    if(event) {
      this.home.push(home);
      }else {
        let index = this.home.indexOf(home);
        this.home.splice(index,1);
      
    }
   }


   offer(x:NgForm){
     let offer = {
       owner : x.value.owner,
       bedroom : x.value.bedroom,
       b_full : x.value.b_full,
       b_threqurtz : x.value.b_threqurtz,
       b_half : x.value.b_half,
       b_qurtz : x.value.b_qurtz,
       sqft : x.value.sqft,
       yearbuilt : x.value.yearBuilt,
       yearpurch : x.value.yearBought,
       Applies : this.checkedList,
       renovate : this.renovate,
       Flooring : this.Floor,
       special : this.feature,
       AppliesToYou : this.Applies,
       documents : this.document,
       sell : x.value.sell,
       buyhome : x.value.Buyahome,
       key : 'offers',
     }
    this.server.SendToPhp(offer).subscribe(
      (res)=>{
        if(res.code == 1){

        }
      }
    )
   }

}
