import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PushNotificationService} from "../service/push-notification.service";
import { ProductComponent } from './product/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [PushNotificationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
