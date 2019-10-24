import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'app-vip',
  templateUrl: './vip.component.html',
  styleUrls: ['./vip.component.scss']
})
export class VipComponent implements OnInit {

  constructor(protected localStorage: LocalStorage,private nav:Router,private server: DataService) { }

  ngOnInit() {
  }

  pay(day: number,id: string,price : number){
    console.log(day,id,price);

    let vip = {
      amount : price,
      id : id,
      day :day, 
     }
    
     this.localStorage.setItem('v_i_p_p_a_y',vip).subscribe(
       (res)=>{
         if(res == true){
           this.nav.navigate(['/dash/vconfirm']);
         }
       }
     )  
  }
}
