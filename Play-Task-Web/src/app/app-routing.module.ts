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
import { SubtopicPageComponent } from './subtopic-page/subtopic-page.component';
import { AdminsPageComponent } from './admins-page/admins-page.component';
import { TeachersPageComponent } from './teachers-page/teachers-page.component';
import { StudentsPageComponent } from './students-page/students-page.component';
import { DocsComponent } from './docs/docs.component';
import { WebDocsPageComponent } from './web-docs-page/web-docs-page.component';
import { DesktopDocsPageComponent } from './desktop-docs-page/desktop-docs-page.component';

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
  {
    path: 'subtopic/:institutionid/:adminid/:subjectid/:topicid',
    component: SubtopicPageComponent,
  },
  {
    path: 'admins/:institutionid/:adminid',
    component: AdminsPageComponent,
  },
  {
    path: 'teachers/:institutionid/:adminid',
    component: TeachersPageComponent,
  },
  {
    path: 'students/:institutionid/:adminid',
    component: StudentsPageComponent,
  },
  {
    path: 'docs',
    component: DocsComponent,
  },
  {
    path: 'webdocs',
    component: WebDocsPageComponent,
  },
  {
    path: 'desktopdocs',
    component: DesktopDocsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
