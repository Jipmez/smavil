import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { NgProgress } from 'ngx-progressbar';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
declare let $
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  amen = [];

  constructor(protected localStorage : LocalStorage ,public ngProgress: NgProgress,private server: DataService,private cookieService: CookieService,private nav:Router) { }
  cookieValue: string;
  p: number = 1;
  list: Object;
  ngOnInit() {
    this.cookieValue = this.cookieService.get('logID');
    $(".loader").fadeOut(); 
   
    this.localStorage.getItem('F_r_o_n_t_s_e_a_r_c_h').subscribe(
      (res)=>{if(res){
       let pay = {
         sale : res['sale'],
         search : res['search'],
         key : "frontsearch"
       }
       this.server.SendToPhp(pay).subscribe(
         (res)=>{
           if(res.code == 1){
            this.list = res.message;
           }else if(res.code == 2){
             alert('not found');
            let md ={
              key : 'students'
            }
            this.server.SendToPhp(md).subscribe(
              (res)=>{console.log(res)
                if(res.code == 1){
                  this.list = res.message;
                  
                  
                }
              },
              ()=>{},
              ()=>{},
            )
           }
         }
       )
      }else{
        let md ={
          key : 'students'
        }
    
        this.server.SendToPhp(md).subscribe(
          (res)=>{console.log(res)
            if(res.code == 1){
              this.localStorage.removeItem('F_r_o_n_t_s_e_a_r_c_h').subscribe(
                (p)=>{
                  if(p){
                    this.list = res.message;
                  }
                }
              );
            }
          },
          ()=>{},
          ()=>{},
        )
      }
      },
    );
    $("#preloder").delay(400).fadeOut("slow");
   
  }

  ga(x){
    console.log(x);
  }
  filter(x:NgForm){

  }
  university(x){
     console.log(x);
     let uni= {
       uni : x,
       key : 'filterUni'
     }
     this.server.SendToPhp(uni).subscribe(
       (res)=>{
         if(res.code == 1){
           this.list = res.message
         }
       }
     )
  }

  like(lists){
    let like = {
      prop : lists.propertyID,
      id : this.cookieValue,
      key : 'like'
    }
    this.ngProgress.start();
    this.server.SendToPhp(like).subscribe(
      (res)=>{console.log(res);
        this.ngProgress.done();
      },
      ()=>{},
      ()=>{},
    )
  }

  select(lists){
    this.nav.navigate(['single',lists.propertyID])
  }

}
