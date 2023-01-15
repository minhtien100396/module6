import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatHeaderRow, MatHeaderRowDef, MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { NavBarComponent } from './nav-foot/nav-bar/nav-bar.component';
import { FooterComponent } from './nav-foot/footer/footer.component';
import { HomeComponent } from './home/home/home.component';
import { RegisterComponent } from './form-login/register/register.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { VideoComponent } from './profile/video/video.component';
import { FriendsComponent } from './profile/friends/friends.component';
import { FormFeildComponent } from './form-field/form-feild/form-feild.component';
import {MatSelectModule} from "@angular/material/select";
import {MatCard, MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatSlideToggle, MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    VideoComponent,
    FriendsComponent,
    FormFeildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
