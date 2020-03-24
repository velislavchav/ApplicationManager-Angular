import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployerRoutingModule } from './employer-routing.module';
import { CreateJobComponent } from './create-job/create-job.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [RegisterComponent, CreateJobComponent, ProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployerRoutingModule,
  ]
})
export class EmployerModule { }
