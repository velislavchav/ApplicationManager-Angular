import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

// core components
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/core/navigation/navigation.component';
import { HomeComponent } from './components/core/home/home.component';
// import { LoaderComponent } from './components/core/loader/loader.component';

// firebase
import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from '@angular/fire/auth';

// toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NotFoundComponent } from './components/core/not-found/not-found.component';

// custom modules
import { UserModule } from './components/user/user.module';
import { JobsModule } from './components/jobs/jobs.module';
import { EmployerModule } from './components/employer/employer.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    // LoaderComponent,
    NotFoundComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
