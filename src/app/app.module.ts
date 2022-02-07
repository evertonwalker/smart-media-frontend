import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AutheticationComponent } from './pages/authetication/authetication.component';
import { AppRoutingModule } from './app-routing-modules';

@NgModule({
  declarations: [
    AppComponent,
    AutheticationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
