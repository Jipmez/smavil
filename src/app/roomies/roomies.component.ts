import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/Forms';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
declare var $;
@Component({
  selector: 'app-roomies',
  templateUrl: './roomies.component.html',
  styleUrls: ['./roomies.component.scss']
})
export class RoomiesComponent implements OnInit {
  cookieValue: string;
  imageUrl: string ;
  fileToUpload: File = null;
  movein =[];
  state: [];
  local: [];
  checkedList = [];

  constructor(private server: DataService,private cookieService: CookieService,) { }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('logID');

let theMonths = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
let today = new Date() ;
let aMonth = today.getMonth();


let i;
for (i=0; i<12; i++) {

let jan312009 = new Date(); 
let one = new Date(new Date(jan312009).setMonth(jan312009.getMonth() + i));
let obj ={};
obj['date'] = theMonths[aMonth]+ "," + (one.getFullYear()).toString(); 
 this.movein.push(obj);
 aMonth++;
if (aMonth > 11) {
  aMonth = 0;
}
}

this.server.getState().subscribe(
  (res)=>{
    console.log(res);
    this.state =res.states
  }
)
 
  }


  getLocal(x){
    this.server.getLocals(x).subscribe(
      (res)=>{
        this.local = res.locals
      }
    )
  }

  Pinfo(x:NgForm){
    console.log(x.value);

    let input = [x.value.purpose,x.value.state,x.value.age,x.value.gender,x.value.education,x.value.career,x.value.hometown,x.value.relation,x.value.budget,x.value.pets];

    let payload = {
     
      state : x.value.state,
      age : x.value.age,
      gender :x.value.gender,
      education : x.value.education,
      career : x.value.career,
      hometown : x.value.hometown,
      pets : x.value.pets,
      budget : x.value.budget,
      relation : x.value.relation,
      movein : x.value.movein,
      lease : x.value.lease_duration,
      about : x.value.about,
      pstate : x.value.Pstate,
      plocal : x.value.Plocal,
      ptown : x.value.Ptown,
      id : this.cookieValue,
      key : 'Editrommie'
    }

    this.server.SendToPhp(payload).subscribe(
      (res)=>{console.log(res)
        if(res.code == 1){
        
        }
      },
      ()=>{},
      ()=>{console.log('complete') }
    )
  }


  atrInf(x:NgForm){
    console.log(x.value);

    let pay ={
      bed_time : x.value.bed_time,
      cleanliness : x.value.cleanliness,
      cooking : x.value.cooking,
      drinks : x.value.cooking,
      drugs : x.value.drugs,
      privacy : x.value.privacy,
      smokes : x.value.smokes,
      social : x.value.social,
      working_hours : x.value.working_hours,
      id : this.cookieValue,
      key : 'pInfo'
    }

    this.server.SendToPhp(pay).subscribe(
      (res)=>{console.log(res)
        if(res.code == 1){
        
        }
      },
      ()=>{},
      ()=>{}
    )
  }


  handleFileInput(file: FileList){
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  
    }

    ImageUp(){
      const fd= new FormData();
      var tel = fd.append("image",this.fileToUpload,this.fileToUpload.name);
       fd.append('key','pImage');
       fd.append('token',this.cookieValue);
   
   
      
   
     this.server.SendToPhp(fd).subscribe(		
       (res)=>{
           if(res.code ==1){
            this.server.changeMessage(res.message);
           }
       },
     )
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
  
     AdPro(x:NgForm){
       console.log(x.value, this.checkedList);
       let pay ={
         rent : x.value.rent,
         apt_type : x.value.apt_type,
         description : x.value.description,
         furnished :x.value.furnished,
         lease_duration : x.value.lease_duration,
         location :x.value.location,
         movin : x.value.movin,
         bedroom :x.value.total_bed,
         bathroom :x.value.total_bath,
         pets :x.value .pets,
         amenities :this.checkedList,
         id : this.cookieValue,
         key : 'roomie_pro'
       }
       this.server.SendToPhp(pay).subscribe(
         (res)=>{
           if(res.code == 1){
             $('#adRP').click();
           }
         }
       )
     }
}
