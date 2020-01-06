import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable} from 'rxjs';
import { SwUpdate } from '@angular/service-worker';
import "rxjs/Rx";
import { BehaviorSubject } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
const maxAge = 30000;
@Injectable()
export class DataService {
  promptEvent;


  constructor(private serviceBoy:HttpClient,private nav:Router,private cookieService: CookieService,private title: Title, private meta: Meta,private swUpdate: SwUpdate) { 
    swUpdate.available.subscribe(event => {
      if (true) {
        window.location.reload();
      }
    });
  
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
    });
  }

  cache = new Map();

  private messageSource = new BehaviorSubject('https://res.cloudinary.com/dauqcz0i6/image/upload/v1569775976/51125300_1569775931.jpg.jpg');
  currentMessage = this.messageSource.asObservable();
  path:string='http://localhost/lodges/api.php';

  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  SendToPhp(x){
    if(x['cache']){
      if(x['cache']  == 'cache'){
        const cached = this.cache.get(x['key']);
        console.log(cached);
        if(!cached){

         const key = x['key'];
         const entry  = [key, this.SendToPhpReturn(x).subscribe((res)=>{res}), Date.now];
         this.cache.set(key,entry);
        console.log(this.cache);
         const expired = Date.now() - maxAge;
         this.cache.forEach(expiredEntry => {
           if (expiredEntry[2] < expired) {
             this.cache.delete(expiredEntry[0]);
           }
         });
         return this.serviceBoy.post(this.path,x);
        }else if(cached){
         const isExpired = cached[2] < (Date.now() - maxAge);
         console.log(cached[1]);
          const expired = isExpired ? 'expired ' : ''; return cached[1];
        }
     }
    }else{
      return this.serviceBoy.post(this.path,x)
    }
  }

  SendToPhpReturn(x){
    return this.serviceBoy.post(this.path,x)
  }


  Pay(x){
    let p:string='http://localhost/lodges/generate.php';
     return this.serviceBoy.post(p,x)
  }

  mapdetails(x){
    let p:string=`http://nominatim.openstreetmap.org/search?q=${x}&format=json&polygon=1&addressdetails=1`;
    return this.serviceBoy.get(p)
  }

  getPermit(){
    if(this.cookieService.get('logID')){
      let pem = {
        permit : this.cookieService.get('logID'),
        key : 'getpermit',
      }
      return this.serviceBoy.post(this.path,pem)
    }else{
      this.nav.navigate([""]);
    }    
  }

  getPermitA(){
    if(this.cookieService.get('adminID')){
      let pem = {
        permit : this.cookieService.get('adminID'),
        key : 'getpermitA',
      }
      return this.serviceBoy.post(this.path,pem)
    }else{
      this.nav.navigate([""]);
    }
  }

  getID(){
    if(this.cookieService.get('logID')){
      let pem = {
        permit : this.cookieService.get('logID'),
        key : 'getID',
      }
      return this.serviceBoy.post(this.path,pem)
    }else{
      this.nav.navigate([""]);
    }   
  }

  getUpro(x){
    if(x == (1) || x == (2)){
      if(this.cookieService.get('logID')){
        let pay = {
          id : this.cookieService.get('logID'),
          user : x,
          key : "getUpro"
        }
      return this.serviceBoy.post(this.path,pay)
      }else{
        this.nav.navigate([""]);
      }
    }else if(x == 3){
      if(this.cookieService.get('adminID')){
        let pay = {
          id : this.cookieService.get('adminID'),
          user : x,
          key : "getUpro"
        }
      return this.serviceBoy.post(this.path,pay)
      }else{
        this.nav.navigate([""]);
      }
    }
   
  }

  CheckLogin(){
   if(this.cookieService.get('logID')){
     return true
   }else{
     this.nav.navigate([""]);
   }
  }

  LoggedIn(){
   if(this.cookieService.get('logID')){
     return true
   }else{
     return false
   }
  }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  getState(){
    let pem = {
      key : 'getState',
    }
    return this.serviceBoy.post(this.path,pem)
  }

  getLocals(x){
    let pem = {
      state_id : x,
      key : 'getLocal',
    }
    return this.serviceBoy.post(this.path,pem)
  }

  getProp(){
    let pem = {
      key : 'getProtype',
    }
    return this.serviceBoy.post(this.path,pem)
  }

  getSubprop(x){
    let pem = {
      sub_id :x,
      key : 'getSubtype',
    }
    return this.serviceBoy.post(this.path,pem)
  }
}

