import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';

// firebase
import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from '@angular/fire/auth';

// toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NotFoundComponent } from './components/not-found/not-found.component';

//forms
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicationsSectionComponent } from './components/applications/applications-section/applications-section.component';
import { ApplicationCardComponent } from './components/applications/application-card/application-card.component';
import { CreateApplicationComponent } from './components/user/create-application/create-application.component';
import { CreateJobComponent } from './components/user/create-job/create-job.component';
import { JobsSectionComponent } from './components/jobs/jobs-section/jobs-section.component';
import { JobCardComponent } from './components/jobs/job-card/job-card.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    NotFoundComponent,
    ApplicationsSectionComponent,
    ApplicationCardComponent,
    CreateApplicationComponent,
    CreateJobComponent,
    JobsSectionComponent,
    JobCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), //firestore
    AngularFirestoreModule, //firestore
    AngularFireAuthModule, //firestore
    BrowserAnimationsModule, // toastr
    ToastrModule.forRoot(), // toastr
    ReactiveFormsModule, // forms
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
