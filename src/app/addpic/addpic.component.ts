import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { parseCookieValue } from '@angular/common/src/cookie';

declare var $;

@Component({
  selector: 'app-addpic',
  templateUrl: './addpic.component.html',
  styleUrls: ['./addpic.component.scss']
})
export class AddpicComponent implements OnInit {

  constructor(private server: DataService,private cookieService: CookieService,private nav:Router,protected localStorage: LocalStorage) { }
  urls =new Array<string>();
  selectedFiles: File[]= [];
  formD;
  publish;
  title;
  state;
  status;
  street;
  type;
  locality;
  category;
  price;
  ref

cookieValue; 
  ngOnInit() {
    this.localStorage.getItem('property').subscribe(
      (property)=>{if(property){

         this.publish = property[0][0].publish;
         this.title = property.title;
         this.state = property.state;
         this.street = property.street;
         this.type = property.type;
         this.locality = property.locality;
         this.category =property.category;
         this.price = property['0']['0'].cost;
         this.ref = property[0][0].propertyID


        }
      },
    );

  this.cookieValue = this.cookieService.get('logID');
  
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
 
    
 let p =0;
 
      for(let i=0 ; i < this.selectedFiles.length ; i++){
        this.formD.append(p, this.selectedFiles[i],this.selectedFiles[i].name);
        p++
    }
      this.formD.append('propID',this.ref);
      this.formD.append('id',this.cookieValue);
    
    this.server.SendToPhp(this.formD).subscribe(
      (res)=>{console.log(res)},
      ()=>{},
      ()=>{},
    )
      
  }


  
  }
