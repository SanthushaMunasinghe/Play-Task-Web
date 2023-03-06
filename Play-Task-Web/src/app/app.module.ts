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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminRegistrationFormComponent } from './components/admin-registration-form/admin-registration-form.component';
import { InstitutionRegistrationFormComponent } from './components/institution-registration-form/institution-registration-form.component';
import { CreatePasswordComponent } from './components/create-password/create-password.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { InstitutionLoginFormComponent } from './components/institution-login-form/institution-login-form.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavbarDefaultComponent,
    AboutPageComponent,
    LoginPageComponent,
    FooterDefaultComponent,
    RegisterPageComponent,
    AdminRegistrationFormComponent,
    InstitutionRegistrationFormComponent,
    CreatePasswordComponent,
    LoginFormComponent,
    InstitutionLoginFormComponent,
    DashboardPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
