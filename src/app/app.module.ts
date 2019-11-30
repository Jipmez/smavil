import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { HttpModule } from "@angular/http";
import { NgProgressModule } from 'ngx-progressbar';
import { DataService } from './data.service';
import { AngularRaveModule } from 'angular-rave';
import { ToastrModule } from 'ngx-toastr';
import { RatingModule } from 'ng-starrating';
import { CookieService } from "ngx-cookie-service";
import { Angular4PaystackModule } from 'angular4-paystack';

import { EditorModule } from '@tinymce/tinymce-angular';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {NgxLocalStorageModule} from 'ngx-localstorage';
import { AgmCoreModule } from '@agm/core';




import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LogdesComponent } from './logdes/logdes.component';
import { NavComponent } from './nav/nav.component';
import { NgxPaginationModule } from "ngx-pagination";
import { SinglelistComponent } from './singlelist/singlelist.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DcontentComponent } from './dcontent/dcontent.component';
import { AddComponent } from './add/add.component';
import { AddpicComponent } from './addpic/addpic.component';
import { PackagesComponent } from './packages/packages.component';
import { PlansComponent } from './plans/plans.component';
import { CartComponent } from './cart/cart.component';
import { PropertiesComponent } from './properties/properties.component';
import { RoomiesComponent } from './roomies/roomies.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowseComponent } from './browse/browse.component';
import { UserpComponent } from './userp/userp.component';
import { RoommatesComponent } from './roommates/roommates.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { DashComponent } from './dash/dash.component';
import { ContentComponent } from './content/content.component';
import { AgentprofileComponent } from './agentprofile/agentprofile.component';
import { AdminSigninComponent } from './admin-signin/admin-signin.component';
import { AdmindashComponent } from './admindash/admindash.component';
import { AdcontentComponent } from './adcontent/adcontent.component';
import { BlogComponent } from './blog/blog.component';
import { BlogsViewComponent } from './blogs-view/blogs-view.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { BlogSingleComponent } from './blog-single/blog-single.component';
import { PropertyBlogComponent } from './property-blog/property-blog.component';
import { RoomateBlogComponent } from './roomate-blog/roomate-blog.component';
import { RoomhomeComponent } from './roomhome/roomhome.component';
import { MessageComponent } from './message/message.component';
import { ChatComponent } from './chat/chat.component';
import { ChatmsgComponent } from './chatmsg/chatmsg.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ContactComponent } from './contact/contact.component';
import { SellComponent } from './sell/sell.component';
import { OffersComponent } from './offers/offers.component';
import { AgentListComponent } from './agent-list/agent-list.component';
import { QuestionsComponent } from './questions/questions.component';
import { MatchesComponent } from './matches/matches.component';
import { VipComponent } from './vip/vip.component';
import { VConfirmComponent } from './v-confirm/v-confirm.component';
import { VerifyComponent } from './verify/verify.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { AdminPropComponent } from './admin-prop/admin-prop.component';
import { AdminRoomComponent } from './admin-room/admin-room.component';
import { PropViewComponent } from './prop-view/prop-view.component';
import { StudentsComponent } from './students/students.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


const route:Routes = [
    {path:"",component:NavComponent,children:[
    {path:"",component:HomeComponent},
    {path:"register",component:RegisterComponent},
    {path:"login",component:LoginComponent},
    {path:"logdes",component:LogdesComponent},
    {path:"students",component:StudentsComponent},
    {path:'Agent/:id',component:AgentprofileComponent},
    {path:"adsignIn",component:AdminSigninComponent},
    {path:"blog",component:PropertyBlogComponent},
    {path:"blog_single",component:BlogSingleComponent},
    {path:"sell",component:SellComponent},
    {path:"offers/:id/:ed",component:QuestionsComponent},
    {path:"Offers",component:OffersComponent},
    {path:"Agent_list",component:AgentListComponent},
    {path:"single/:id",component:SinglelistComponent},
    {path:"contact/:id/:ed",component:ContactComponent},
    {path:"verify/:id/:ed",component:VerifyComponent},
    {path:"forgot_pass",component:ForgotPassComponent},
    {path:"reset_pass/:id",component:ResetPassComponent},
  ]},
 

  {path:'roommates',component:RoommatesComponent,children:[
    {path:"",component:RoomhomeComponent},
    {path:"blog",component:RoomateBlogComponent},
    {path:"view/:id",component:BlogComponent},
  ]},
  
  
  {path:'dashboard',component:DashboardComponent,children:[
    {path:"",component:DcontentComponent},
    {path:"dcontent",component:DcontentComponent},
    {path:"packages",component:PackagesComponent},
    {path:"plans",component:PlansComponent},
    {path:"favour",component:FavoritesComponent},
    {path:'add/:id',component:AddComponent},
    {path:'addpic',component:AddpicComponent},
    {path:"properties",component:PropertiesComponent},
    {path:'cart/:id',component:CartComponent},
    {path:'confirm',component:ConfirmComponent},
    {path:'userp',component:UserpComponent},
  ]},

  {path:'dash',component:DashComponent,children:[
     {path:"",component:ContentComponent},
     {path:"content",component:ContentComponent},
     {path:'profile',component:ProfileComponent},
     {path:'profile_view/:id',component:ProfileViewComponent},
     {path:'browse',component:BrowseComponent},
     {path:'roomies',component:RoomiesComponent},
     {path:'messages',component:MessageComponent,children:[
       {path:'',component:ChatComponent},
       {path:'mssg/:id',component:ChatmsgComponent}
     ]},
     {path:'matches',component:MatchesComponent},
     {path:'vip',component:VipComponent},
     {path:'vconfirm',component:VConfirmComponent},
  ]},

  {path:'admin',component:AdmindashComponent,children:[
    {path:'adcontent',component:AdcontentComponent},
    {path:"",component:AdcontentComponent},
    {path:"blog_view",component:BlogsViewComponent},
    {path:"add_blog/:id",component:AddBlogComponent},
    {path:"adprop",component:AdminPropComponent},
    {path:"adroom",component:AdminRoomComponent},
    {path:"prop_view/:id",component:PropViewComponent},
  ]}
  

 

  
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashComponent,
    LogdesComponent,
    NavComponent,
    SinglelistComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    DcontentComponent,
    AddComponent,
    AddpicComponent,
    PackagesComponent,
    PlansComponent,
    CartComponent,
    PropertiesComponent,
    ContentComponent,
    RoomiesComponent,
    ProfileComponent,
    BrowseComponent,
    UserpComponent,
    RoommatesComponent,
    ConfirmComponent,
    AgentprofileComponent,
    AdminSigninComponent,
    AdmindashComponent,
    AdcontentComponent,
    BlogComponent,
    BlogsViewComponent,
    AddBlogComponent,
    BlogSingleComponent,
    PropertyBlogComponent,
    RoomhomeComponent,
    RoomateBlogComponent,
    MessageComponent,
    ChatComponent,
    ChatmsgComponent,
    ProfileViewComponent,
    FavoritesComponent,
    ContactComponent,
    SellComponent,
    OffersComponent,
    AgentListComponent,
    QuestionsComponent,
    MatchesComponent,
    VipComponent,
    VConfirmComponent,
    VerifyComponent,
    ForgotPassComponent,
    ResetPassComponent,
    AdminPropComponent,
    AdminRoomComponent,
    PropViewComponent,
    StudentsComponent,
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RatingModule,
    ToastrModule.forRoot(),
    Angular4PaystackModule,
    AngularRaveModule,
    NgProgressModule,
    NgxLocalStorageModule.forRoot(),
    RouterModule.forRoot(route,{useHash:true}),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCPNEPp0soNp3Py2hIwLE0q3gnlQam44SU'
    }),
    EditorModule,
    AngularFontAwesomeModule,
    NgxPaginationModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  
  ],
  providers: [DataService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
