import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';

declare var $;
@Component({
  selector: 'app-userp',
  templateUrl: './userp.component.html',
  styleUrls: ['./userp.component.scss']
})
export class UserpComponent implements OnInit {
  cookieValue: string;
  imageUrl: string ;
  fileToUpload: File = null;

  constructor(private route: ActivatedRoute,private server: DataService,private cookieService: CookieService,private nav:Router,protected localStorage: LocalStorage /* private localstorage : LocalStorageService */) { }

  ngOnInit() {
    this.cookieValue = this.cookieService.get('logID');
  }

  AddP(x:NgForm){
    console.log(x.value);

    let param= {
      Cname: x.value.Cname,
      Street: x.value.Street,
      Locality: x.value.locality,
      Name: x.value.name,
      Phone: x.value.phone,
      State: x.value.state,
      Website: x.value.website,
      Whatsapp: x.value.whatsapp,
      Id: this.cookieValue,
      key: "userP"
    }

    this.server.SendToPhp(param).subscribe(
      (res)=>{console.log(res)},
      ()=>{},
      ()=>{}
    )
  }

  handlePic(file: FileList){
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
     fd.append('key','uPix');
     fd.append('token',this.cookieValue);
   this.server.SendToPhp(fd).subscribe(		
     (res)=>{
         if(res.code ==1){
           this.server.currentMessage.subscribe(message => this.imageUrl = res.message)
        }
     },
   )
   }
}
