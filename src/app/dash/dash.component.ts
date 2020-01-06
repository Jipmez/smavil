import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
declare let $;
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  pix: string;
  cookieValue: string;
  dash: number;
  fileToUpload: File = null;
  unread: any;
  state = [];
  local =[];
  movein =[];
  purpose : number;
  checkedList= [];
  ToUpload: File;
  pro: any;
  constructor(private server: DataService,private cookieService: CookieService,private nav:Router) { }

  
 
 

  ngOnInit() {
  this.server.getPermit().subscribe((res)=>{if(res['code'] == 1){if(res['message'] != 1){this.nav.navigate([''])}}}) 
    $(".loader").fadeOut(); 
    $("#preloder").delay(400).fadeOut("slow");
   
   if(this.server.CheckLogin()){
    this.cookieValue = this.cookieService.get('logID');
    this.server.getUpro(2).subscribe(
      (res)=>{console.log(res)
       if(res['code'] ==1){
         if(res['message'][0]['ProPix'] == ''){
          this.server.currentMessage.subscribe(message => this.pix = message);
         }else{
          this.server.currentMessage.subscribe(message => this.pix = res['message'][0]['ProPix']);
         }
       }
      },
    )
   };

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
       this.state =res['states']
     }
   )
  
    let getM = {
      id :  this.cookieValue,
      key : 'getM'
    }

    let getp = {
      id :  this.cookieValue,
      key : '600',
    }
    this.server.SendToPhp(getp).subscribe(
      (res)=>{console.log(res)
       if(res.code == 1){
          if(res.message[0].Status == 1){
            this.dash = 1;
          }else if(res.message[0].Status == 2){
            this.dash = 2;
          }
       }
      },
      ()=>{},
      ()=>{}
    )

    this.server.SendToPhp(getM).subscribe(
      (res)=>{console.log(res)
         if(res.code == 1){
           this.unread = res.unread;
         }
      },
      ()=>{},
      ()=>{},
    )
  }

  getLocal(x){
    this.server.getLocals(x).subscribe(
      (res)=>{
        this.local = res['locals']
      }
    )
  }
  Pinfo(x:NgForm){
    console.log(x.value);

    let input = [x.value.purpose,x.value.age,x.value.gender,x.value.education,x.value.career,x.value.hometown,x.value.relation,x.value.budget,x.value.pets];

    let payload = {
      purpose : x.value.purpose,
      age : x.value.age,
      gender :x.value.gender,
      education : x.value.education,
      career : x.value.career,
      hometown : x.value.hometown,
      pstate : x.value.Pstate,
      plocal : x.value.Plocal,
      ptown : x.value.Ptown,
      pets : x.value.pets,
      budget : x.value.budget,
      movein : x.value.movein,
      lease : x.value.lease_duration,
      relation : x.value.relation,
      about : x.value.about,
      id : this.cookieValue,
      key : 'rommie'
    }

    this.server.SendToPhp(payload).subscribe(
      (res)=>{console.log(res)
        if(res.code == 1){
          $('#me').click();
          this.purpose = res.purpose;
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
        if(res.code == 1 && this.purpose == 2){
          $('#adPro').click();
        }else{
          $('#adPix').click();
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
      this.pix = event.target.result;
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

     redirectTo(uri){
       this.nav.navigateByUrl('/',{skipLocationChange: true}).then(()=>
       this.nav.navigate([uri]));
       
     }

FileInput(file: FileList){
  this.ToUpload = file.item(0);
  var reader = new FileReader();
  reader.onload = (event:any) => {
    this.pro = event.target.result;
  }
  reader.readAsDataURL(this.ToUpload);

}


 Upload(){
  const fd= new FormData();
  var tel = fd.append("image",this.ToUpload,this.ToUpload.name);
    fd.append('key','proImage');
    fd.append('token',this.cookieValue);
  this.server.SendToPhp(fd).subscribe(		
    (res)=>{
        if(res['code'] ==1){
          $('#adpro').click();
        }
    },
  )
  } 


  dashboard(){
   let pay ={
    id : this.cookieValue,
    key : 'moveTodash'
   }
       this.server.SendToPhp(pay).subscribe(
          (res)=>{ if(res.code ==1){
            this.redirectTo(this.nav.url);
          }
          }
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
