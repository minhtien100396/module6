import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from "./form-login/register/register.component";
import {HomeComponent} from "./home/home/home.component";
import {ProfileComponent} from "./profile/profile/profile.component";
import {VideoComponent} from "./profile/video/video.component";
import {FriendsComponent} from "./profile/friends/friends.component";
import {FormFeildComponent} from "./form-field/form-feild/form-feild.component";


const routes: Routes = [
  {path:"register",component:RegisterComponent},
  {path:"",component:HomeComponent},
  {path:"profile",component:ProfileComponent,
  children: [
    {path:'video',component:VideoComponent},
    {path:'friends',component:FriendsComponent}
  ]},
  {path:"field",component:FormFeildComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
