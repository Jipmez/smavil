import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
declare let $;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  id: string;
  new: string;

  constructor(private route: ActivatedRoute,private server: DataService,private cookieService: CookieService,private nav:Router) { }

  ngOnInit() {
    this.new = this.route.snapshot.paramMap.get('id')
    this.id = this.route.snapshot.paramMap.get('ed');
  /* console.log(this.id); */
  /*   $('#consumer').css("display","none") */
  /*   $('#estateP').css("display","none") */
  /*   $('.propertyM').css("display","none") */
  /*   $('.requierd').css("display","none") */
  }

  redirectTo(uri){
    this.nav.navigateByUrl('/',{skipLocationChange: true}).then(()=>
    this.nav.navigate([uri]));
    
  }

  

 open(x){
  this.nav.navigateByUrl('/',{skipLocationChange: true}).then(()=>
  this.nav.navigate(['contact','new',x]));
 }

 desk(x:NgForm){
    console.log(x.value);
    let pay = {
      request_id : this.id,
      email : x.value.email,
      subject : x.value.subject,
      description : x.value.description,
      purpose : x.value.purpose,
      listing_address : x.value.listing_address,
      email_alt : x.value.emailNul,
      property_type : x.value.property_type,
      key : 'desk'
    }
    this.server.SendToPhp(pay).subscribe((res)=>{console.log(res)})
 }
}
