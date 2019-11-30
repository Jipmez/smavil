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
  fileToUpload: File = null;
  urls =new Array<string>();
  ref: any;
  formD: FormData;
  permit: any;
  state: any;
  local: any;
  list=[];
  pix: any;
  title: any;
  mrkstst: any;
  cat: any;
  street: any;
  bed: any;
  aff: any;
  toilet: any;
  bath: any;
  tarea: any;
  park: any;
  rmsize: any;
  video: any;
  des: any;
  subt: any;
  town: any;
  city: any;
  imageUrl: any;
  checkedList = [];

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
                
               this.list = res.message

               this.title = res.message[0]['title'];
               this.mrkstst = res.message[0]['marketS'];
               this.cat = res.message[0]['category'];
               this.subt = res.message[0]['Subtype'];
               this.town = res.message[0]['locality']
               this.city = res.message[0]['state']
               this.street = res.message[0]['street'];
               this.bed = res.message[0]['bedroom'];
               this.aff = res.message[0]['Affiliated_university'];
               this.toilet = res.message[0]['toilets'];
               this.bath = res.message[0]['bathroom'];
               this.park = res.message[0]['Parking'];
               this.tarea = res.message[0]['TotalArea'];
               this.rmsize  =res.message[0]['rmsize'];
               this.video = res.message[0]['videoL'];
               this.des = res.message[0]['Description']
               console.log(this.des)
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

  
  
// handlePic(event){
//     var $fileUpload = $("input[type='file']");
//     if (parseInt($fileUpload.get(0).files.length)>5){
//      alert("You can only upload a maximum of 5 files");
//     }else{

//       if(event.target.files.length){
//         for(let i = 0 ; i < event.target.files.length ; i++){
//           this.selectedFiles.push(<File>event.target.files[i]);
//         }
//       }
   
// this.urls = [];
// let files = event.target.files;
// if(files){
//  for(let file of files){
//    let reader = new FileReader();
//    reader.onload =(event: any) =>{
//      this.urls.push(event.target.result)
//    }
//    reader.readAsDataURL(file)
//  }
// }
// }

// }


handleFileInput(file: FileList){
  this.fileToUpload = file.item(0);
  var reader = new FileReader();
  reader.onload = (event:any) => {
    this.imageUrl = event.target.result;
  }
  reader.readAsDataURL(this.fileToUpload);

  }


  sub(){
    const fd= new FormData();
    var tel = fd.append("image",this.fileToUpload,this.fileToUpload.name);
     fd.append('key','200');
     fd.append('propID',this.ref);
     fd.append('id',this.cookieValue);
 
 
    
 
   this.server.SendToPhp(fd).subscribe(		
     (res)=>{
         if(res.code == 1){
           this.urls.push(res.message);
           this.toastr.success('Picture Upload!', 'Successful');
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


// sub(){
//   alert('p');
//   this.formD = new FormData();
//   this.formD.append('key', '200');

  
//  let p : any = 0;


//     for(let i=0 ; i < this.selectedFiles.length ; i++){
//       this.formD.append(p, this.selectedFiles[i],this.selectedFiles[i].name);

//       p++
//   }
//     this.formD.append('propID',this.ref);
//     this.formD.append('id',this.cookieValue); 
//     console.log(this.formD);
//   this.server.SendToPhp(this.formD).subscribe(
//     (res)=>{console.log(res)
//       if(res.code ==1){
//         this.toastr.success('Picture Upload!', 'Successful');
//       }else if(res.code == 2){
//         this.toastr.success('Picture Upload!', 'Could not upload picture');
//       }
//     },
//     ()=>{},
//     ()=>{},
//   )
    
// }

  
  AddP(x:NgForm){
    console.log(x.value);
    let user = { 
      publish: x.value.optradio,
      title : (x.value.title == '')?this.title : x.value.title,
      status: (x.value.marketS == '' )? this.mrkstst : x.value.marketS,
      category : (x.value.category == '')? this.cat : x.value.category,
      subtype: (x.value.subtype == '') ? this.subt : x.value.subtype,
      state: (x.value.state == '')? this.city : x.value.state,
      uni : (x.value.affiliate == '') ? this.aff : x.value.affiliate,
      locality: (x.value.Locality  == '')? this.town : x.value.city,
      street: (x.value.Street == '') ?this.street : x.value.Street,
      price: x.value.price,
      bedroom: (x.value.Bedroom == '') ? this.bed :x.value.Bedroom,
      toilets: (x.value.Toilets == '') ? this.toilet : x.value.Toilets,
      bathrooms: (x.value.Bathrooms == '') ? this.bath : x.value.Bathrooms,
      parking: (x.value.Parking == '') ? this.park : x.value.Parking,
      totalArea: (x.value.TotalArea == '') ? this.tarea : x.value.TotalArea,
      roomsize: (x.value.romsize == '') ? this.rmsize : x.value.romsize,
      video:(x.value.video == '') ? this.video : x.value.video,
      discription: (x.value.discription == '') ? this.des: x.value.discription,
      amenities : this.checkedList,
      id: this.cookieValue,
      propid : this.ref,
      key: 'user'
    }
    
  console.log(user);


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
