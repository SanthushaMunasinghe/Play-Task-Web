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
import { NavbarUserComponent } from './components/navbar-user/navbar-user.component';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { GradesPageComponent } from './grades-page/grades-page.component';
import { ClassroomsPageComponent } from './classrooms-page/classrooms-page.component';
import { SubjectsPageComponent } from './subjects-page/subjects-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { InstitutionPageComponent } from './institution-page/institution-page.component';
import { GradesListComponent } from './components/grades-list/grades-list.component';

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
    NavbarUserComponent,
    DashboardCardComponent,
    GradesPageComponent,
    ClassroomsPageComponent,
    SubjectsPageComponent,
    UsersPageComponent,
    InstitutionPageComponent,
    GradesListComponent,
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
