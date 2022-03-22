import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AutheticationComponent } from './pages/authetication/authetication.component';
import { AppRoutingModule } from './app-routing-modules';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HomeComponent } from './pages/home/home.component';
import { JwtHelperService, JwtModule, JwtModuleOptions, JWT_OPTIONS } from "@auth0/angular-jwt";
import { AuthGuardService } from './pages/authetication/services/auth-guard.service';
import { AuthInterceptor } from './pages/authetication/services/auth-interceptor.service';
import { MainMenuComponent } from './layout/main-menu/main-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    AutheticationComponent,
    HomeComponent,
    MainMenuComponent
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    JwtModule
  ],
  providers: [
    [
      { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
      JwtHelperService,
      AuthGuardService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
