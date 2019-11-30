import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import { LocalStorage } from '@ngx-pwa/local-storage';

declare let $;

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {
cookieValue ;
  id: string;
  title: any;
  date: any;
  tags: any;
  author: any;
  content: any;
  imageUrl: string ;
  fileToUpload: File = null;
  formD: FormData;
  permit: any;
  constructor(private route: ActivatedRoute,private server: DataService,private cookieService: CookieService,private nav:Router,protected localStorage: LocalStorage /* private localstorage : LocalStorageService */) { }

  ngOnInit() {
    this.server.getPermitA().subscribe(
      (res)=>{this.permit = res.message
        if(this.permit != (1 || 4)){
          this.nav.navigate(["admin"]);
        }
      }
    )
    this.cookieValue = this.cookieService.get('adminID');
    this.id = this.route.snapshot.paramMap.get('id');

    let pay = {
      blogid : this.id,
      id : this.cookieValue,
      key : 'author',
    }
    this.server.SendToPhp(pay).subscribe(
      (res)=>{console.log(res)
        if(res.code == 1){
          this.date =res.date;
          this.title = res.message[0].title;
          this.tags = res.message[0].tags;
          this.content = res.message[0].content;
          this.author =res.message[0].author;

        }
      },
      ()=>{},
      ()=>{},
      
    )

  }

  Addblog(x:NgForm){
    
  let payload= {
      title : x.value.title,
      category : x.value.category,
      tags : x.value.tags,
      content : x.value.content,
      posted : x.value.posted,
      id : this.cookieValue,
      blogid  : this.id,
      key : 'postblog',

    }
    console.log(payload)

    this.server.SendToPhp(payload).subscribe(
      (res)=>{console.log(res)},
      ()=>{},
      ()=>{},
    )
  }

  handlePic(file: FileList){
    console.log(file);
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  
    }

    
  sub(){
    this.formD = new FormData();
     this.formD.append("image",this.fileToUpload,this.fileToUpload.name);
     this.formD.append('key','blogpix');
     this.formD.append('blogid',this.id);
 
 
    this.server.SendToPhp(this.formD).subscribe(
      (res)=>{console.log(res)},
      ()=>{},
      ()=>{},
    )
 
  


   }
}


