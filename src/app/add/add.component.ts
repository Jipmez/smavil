import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-localstorage';
import { LocalStorage } from '@ngx-pwa/local-storage';

declare var $;



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  cookieValue: string;
  prop=[];
  selectedFiles: File[]= [];
  urls =new Array<string>();
  ref: any;
  formD: FormData;
  list =[] ;
  permit: any;
  state: any;
  local: any;

  constructor(public toastr: ToastrService,private route: ActivatedRoute,private server: DataService,private cookieService: CookieService,private nav:Router,protected localStorage: LocalStorage /* private localstorage : LocalStorageService */) { }
 
  
  ngOnInit() {
    this.server.getPermit().subscribe(
      (res)=>{if(res.code == 1){this.permit = res.message}
        if(this.permit == 3 || this.permit == 4 ){

          this.cookieValue = this.cookieService.get('logID');
          const id = this.route.snapshot.paramMap.get('id');
          this.ref = id;
      
          let prap = {
            id : this.cookieValue,
            propId : this.ref,
            key : 'med'
          }
        
          this.server.SendToPhp(prap).subscribe(
            (res)=>{console.log(res)
              if(res.code ==1){
                this.list = res.message;
                console.log(this.list);
              
              }},
            ()=>{},
            ()=>{},
                )

                this.server.getState().subscribe(
                  (res)=>{console.log(res)
                  if(res.code ==1){
                    this.state = res.states 
                  }}
                )
        }else{
          console.log('grat')
         this.nav.navigate(['dashboard'])
        }
     }
    ) 

   
  }

  
  
  handlePic(event){
    var $fileUpload = $("input[type='file']");
    if (parseInt($fileUpload.get(0).files.length)>5){
     alert("You can only upload a maximum of 5 files");
    }else{

      if(event.target.files.length){
        for(let i = 0 ; i < event.target.files.length ; i++){
          this.selectedFiles.push(<File>event.target.files[i]);
        }
      }
   
this.urls = [];
let files = event.target.files;
if(files){
 for(let file of files){
   let reader = new FileReader();
   reader.onload =(event: any) =>{
     this.urls.push(event.target.result)
   }
   reader.readAsDataURL(file)
 }
}
}

}


sub(){
  alert('p');
  this.formD = new FormData();
  this.formD.append('key', '200');

  
 let p : any = 0;


    for(let i=0 ; i < this.selectedFiles.length ; i++){
      this.formD.append(p, this.selectedFiles[i],this.selectedFiles[i].name);

      p++
  }
    this.formD.append('propID',this.ref);
    this.formD.append('id',this.cookieValue); 
    console.log(this.formD);
  this.server.SendToPhp(this.formD).subscribe(
    (res)=>{console.log(res)
      if(res.code ==1){
        this.toastr.success('Picture Upload!', 'Successful');
      }else if(res.code == 2){
        this.toastr.success('Picture Upload!', 'Could not upload picture');
      }
    },
    ()=>{},
    ()=>{},
  )
    
}



  countryList: Array<any> = [
    { name: 'Flat', cities: ['Mini-Flat', 'Self-contained(singlerooms)'] },
    { name: 'House', cities: ['Detached Bungalow','Detached Duplex','Semi-Detached Bungalow','Semi-Detached Duplex','Terraced Bungalow','Terraced Duplex'] },
    { name: 'Commercial Property', cities: ['Downers Grove'] },
    { name: 'Land', cities: ['Puebla'] },
    { name: 'Event Center/ Venue', cities: ['Beijing'] },
  ];
  cities: Array<any>;


  setVisibility(){
    
  }

  
   changeCountry(count) {
    this.cities = this.countryList.find(con => con.name == count).cities;
  } 

  
  AddP(x:NgForm){
    
    let user = { 
      publish: x.value.optradio,
      title : x.value.title,
      status: x.value.marketS,
      category : x.value.category,
      type : x.value.type,
      subtype: x.value.subtype,
      state: x.value.state,
      locality: x.value.Locality,
      street: x.value.Street,
      price: x.value.price,
      bedroom: x.value.Bedroom,
      toilets: x.value.Toilets,
      bathrooms: x.value.Bathrooms,
      parking: x.value.Parking,
      totalArea: x.value.TotalArea,
      roomsize: x.value.romsize,
      coveredArea: x.value.CoveredArea,
      furnished: x.value.furnished,
      serviced: x.value.serviced,
      service_charge: x.value.service_charge,
      service_charge_qualifier: x.value.service_charge_qualifier,
      video:x.value.video,
      discription: x.value.discription,
      id: this.cookieValue,
      propid : this.ref,
      key: 'user'
    }
    
  return   console.log(user);


    this.server.SendToPhp(user).subscribe(
      (res)=>{console.log(res)
       if(res.code ==1){
         console.log('done');
       }
      },
      ()=>{},
      ()=>{},

  )
    /* this.localStorage.setItem('property', user).subscribe(
      (user) => {
        if(user == true){
          
          this.nav.navigate(['/dashboard/addpic'])
        }
      }); */
  }

  feature(x){
    let feature = {
      propid : x,
      id :  this.cookieValue,
      key : 'feature'
    }
    this.server.SendToPhp(feature).subscribe(
      (res)=>{
        if(res.code == '1'){
          this.toastr.success('Featured', 'Successful');
        }
      }
    )
  }
  boost(x){
    let boost = {
      propid : x,
      id :  this.cookieValue,
      key : 'boost'
    }
    this.server.SendToPhp(boost).subscribe(
      (res)=>{
        if(res.code == '1'){
          this.toastr.success('Boosted', 'Successful');
        }

        if(res.code == '2'){
          this.toastr.warning('Already Featured');
        }
      }
    )
  }
  getLocal(x){
    this.server.getLocals(x).subscribe(
      (res)=>{console.log(res)
        if(res.code ==1 ){
          this.local = res.locals;
        }
      }
    )
  }

      
}
