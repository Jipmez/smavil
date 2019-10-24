import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable} from 'rxjs';
import "rxjs/Rx";
import { BehaviorSubject } from 'rxjs';
import { TemplateBindingParseResult } from '@angular/compiler';
import { Meta, Title } from '@angular/platform-browser';

@Injectable()
export class DataService {


  constructor(private serviceBoy:Http,private nav:Router,private cookieService: CookieService,private title: Title, private meta: Meta) { }

 

  private messageSource = new BehaviorSubject('https://res.cloudinary.com/dauqcz0i6/image/upload/v1569775976/51125300_1569775931.jpg.jpg');
  currentMessage = this.messageSource.asObservable();
  path:string='http://localhost/lodges/api.php';

  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  SendToPhp(x){
     return this.serviceBoy.post(this.path,x).pipe(map((res)=>{
      return  res.json();
  }))
  }
  Pay(x){
    let p:string='http://localhost/lodges/generate.php';
     return this.serviceBoy.post(p,x).pipe(map((res)=>{
      return  res.json();
  }))
}

  mapdetails(x){
    let p:string=`http://nominatim.openstreetmap.org/search?q=${x}&format=json&polygon=1&addressdetails=1`;
    return this.serviceBoy.get(p).pipe(map((res)=>{
      return res.json();
    }))
  }

  getPermit(){
    let pem = {
      permit : this.cookieService.get('logID'),
      key : 'getpermit',
    }
    return this.serviceBoy.post(this.path,pem).pipe(map((res)=>{
    
      return  res.json();
  }))
  }
  getPermitA(){
    let pem = {
      permit : this.cookieService.get('logID'),
      key : 'getpermitA',
    }
    return this.serviceBoy.post(this.path,pem).pipe(map((res)=>{
      return  res.json();
  }))
  }
  getID(){
    let pem = {
      permit : this.cookieService.get('logID'),
      key : 'getID',
    }
    return this.serviceBoy.post(this.path,pem).pipe(map((res)=>{
      return  res.json();
  }))
  }

  getUpro(x){
      let pay = {
        id : this.cookieService.get('logID'),
        user : x,
        key : "getUpro"
      }
    return this.serviceBoy.post(this.path,pay).pipe(map((res)=>{
      return res.json()
    }))

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
    return this.serviceBoy.post(this.path,pem).pipe(map((res)=>{
    
      return  res.json();
  }))
  }
  getLocals(x){
    let pem = {
      state_id : x,
      key : 'getLocal',
    }
    return this.serviceBoy.post(this.path,pem).pipe(map((res)=>{
    
      return  res.json();
  }))
  }
}

