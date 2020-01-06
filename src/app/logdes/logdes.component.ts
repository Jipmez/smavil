import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { NgProgress } from 'ngx-progressbar';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { CookieService } from 'ngx-cookie-service';

import { Router } from '@angular/router';
declare var $;
@Component({
  selector: 'app-logdes',
  templateUrl: './logdes.component.html',
  styleUrls: ['./logdes.component.scss']
})
export class LogdesComponent implements OnInit {
  cookieValue: string;
  p: number = 1;

  constructor(protected localStorage : LocalStorage ,public ngProgress: NgProgress,private server: DataService,private cookieService: CookieService,private nav:Router) { }
list=[];
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
              key : 'logdes'
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
          key : 'logdes'
        }
    
        this.server.SendToPhp(md).subscribe(
          (res)=>{console.log(res)
            if(res['code'] == 1){
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

  select(lists){
    this.nav.navigate(['single',lists.propertyID])
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

  installPwa(): void {
    this.server.promptEvent.prompt();
  }
  
  filter(x:NgForm){
    console.log(x.value);
    
    let param = {
      keyword: x.value.Key,
      Market: x.value.Market,
      Max: x.value.Max,
      Min: x.value.Min,
      Ref: x.value.Ref,
      state: x.value.State,
      category: x.value.category,
      status: x.value.status,
      time: x.value.time,
      locality: x.value.locality,
      bedroom: x.value.bedrooms,
      key: "proF"

    }

    this.server.SendToPhp(param).subscribe(
      (res)=>{console.log(res)
        if(res.code == 1){
         
          this.localStorage.removeItem('F_r_o_n_t_s_e_a_r_c_h').subscribe(
            (p)=>{
              if(p){
                this.list = res.message;
              }
            }
          );
        }},
      ()=>{},
      ()=>{},
    )
  }

 
  ga(x){
    console.log(x);
    let param = {
      value: x,
      key:"proV"
    }
    this.server.SendToPhp(param).subscribe(
      (res)=>{console.log(res)
        if(res.code == 1){
          this.list = res.message;

          this.localStorage.removeItem('F_r_o_n_t_s_e_a_r_c_h').subscribe(
            (p)=>{
              if(p){
                this.list = res.message;
              }
            }
          );
        }},
      ()=>{},
      ()=>{},
    )
  }


 
  }

 
  


 
  
