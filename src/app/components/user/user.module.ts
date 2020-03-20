import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateJobComponent } from './create-job/create-job.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { CreateApplicationComponent } from './create-application/create-application.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [CreateApplicationComponent, CreateJobComponent, LoginComponent, ProfileComponent, RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule
  ]
})
export class UserModule { }
