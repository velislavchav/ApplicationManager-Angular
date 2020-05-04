import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// core components
import { AppComponent } from './app.component';
// firebase
import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from '@angular/fire/auth';
// toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
// custom modules
import { UserModule } from './components/user/user.module';
import { JobsModule } from './components/jobs/jobs.module';
import { EmployerModule } from './components/employer/employer.module';
import { SharedModule } from './components/shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    EmployerModule,
    UserModule,
    JobsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), //firestore
    AngularFirestoreModule, //firestore
    AngularFireAuthModule, //firestore
    BrowserAnimationsModule, // toastr
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
