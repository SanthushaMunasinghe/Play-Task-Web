import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavbarDefaultComponent } from './components/navbar-default/navbar-default.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FooterDefaultComponent } from './components/footer-default/footer-default.component';
import { RegisterPageComponent } from './register-page/register-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavbarDefaultComponent,
    AboutPageComponent,
    LoginPageComponent,
    FooterDefaultComponent,
    RegisterPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
