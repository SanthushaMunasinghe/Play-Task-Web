import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { GradesPageComponent } from './grades-page/grades-page.component';
import { ClassroomsPageComponent } from './classrooms-page/classrooms-page.component';
import { SubjectsPageComponent } from './subjects-page/subjects-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { InstitutionPageComponent } from './institution-page/institution-page.component';
import { TopicPageComponent } from './topic-page/topic-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'reg', component: RegisterPageComponent },
  {
    path: 'dashboard/:institutionid/:adminid',
    component: DashboardPageComponent,
  },
  {
    path: 'grades/:institutionid/:adminid',
    component: GradesPageComponent,
  },
  {
    path: 'classrooms/:institutionid/:adminid',
    component: ClassroomsPageComponent,
  },
  {
    path: 'subjects/:institutionid/:adminid',
    component: SubjectsPageComponent,
  },
  {
    path: 'users/:institutionid/:adminid',
    component: UsersPageComponent,
  },
  {
    path: 'institution/:institutionid/:adminid',
    component: InstitutionPageComponent,
  },
  {
    path: 'topic/:institutionid/:adminid/:subjectid',
    component: TopicPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
