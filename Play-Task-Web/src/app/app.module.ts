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
import { AddGradesFormComponent } from './components/add-grades-form/add-grades-form.component';
import { GradeComponent } from './components/grade/grade.component';
import { ClassroomListComponent } from './components/classroom-list/classroom-list.component';
import { ClassroomComponent } from './components/classroom/classroom.component';
import { AddClassroomsFormComponent } from './components/add-classrooms-form/add-classrooms-form.component';
import { AddSubjectFormComponent } from './components/add-subject-form/add-subject-form.component';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { TopicComponent } from './components/topic/topic.component';
import { TopicPageComponent } from './topic-page/topic-page.component';
import { TopicListComponent } from './components/topic-list/topic-list.component';
import { SubtopicComponent } from './components/subtopic/subtopic.component';
import { AddTopicFormComponent } from './components/add-topic-form/add-topic-form.component';
import { SubtopicPageComponent } from './subtopic-page/subtopic-page.component';
import { AddSubtopicFormComponent } from './components/add-subtopic-form/add-subtopic-form.component';
import { SubtopicDataComponent } from './components/subtopic-data/subtopic-data.component';
import { SubtopicInstructionsComponent } from './components/subtopic-instructions/subtopic-instructions.component';
import { EditSubtopicInstructionsComponent } from './components/edit-subtopic-instructions/edit-subtopic-instructions.component';
import { AdminsPageComponent } from './admins-page/admins-page.component';
import { TeachersPageComponent } from './teachers-page/teachers-page.component';
import { StudentsPageComponent } from './students-page/students-page.component';
import { AdminListComponent } from './components/admin-list/admin-list.component';
import { AdminComponent } from './components/admin/admin.component';
import { TeachersListComponent } from './components/teachers-list/teachers-list.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentComponent } from './components/student/student.component';
import { AddTeacherFormComponent } from './components/add-teacher-form/add-teacher-form.component';
import { AddStudentFormComponent } from './components/add-student-form/add-student-form.component';
import { EditUserClassroomsComponent } from './components/edit-user-classrooms/edit-user-classrooms.component';
import { EditUserSubjectsComponent } from './components/edit-user-subjects/edit-user-subjects.component';

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
    AddGradesFormComponent,
    GradeComponent,
    ClassroomListComponent,
    ClassroomComponent,
    AddClassroomsFormComponent,
    AddSubjectFormComponent,
    SubjectListComponent,
    TopicComponent,
    TopicPageComponent,
    TopicListComponent,
    SubtopicComponent,
    AddTopicFormComponent,
    SubtopicPageComponent,
    AddSubtopicFormComponent,
    SubtopicDataComponent,
    SubtopicInstructionsComponent,
    EditSubtopicInstructionsComponent,
    AdminsPageComponent,
    TeachersPageComponent,
    StudentsPageComponent,
    AdminListComponent,
    AdminComponent,
    TeachersListComponent,
    TeacherComponent,
    StudentListComponent,
    StudentComponent,
    AddTeacherFormComponent,
    AddStudentFormComponent,
    EditUserClassroomsComponent,
    EditUserSubjectsComponent,
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
